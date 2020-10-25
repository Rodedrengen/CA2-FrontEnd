import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function findByCity() {
  const findByCitySubmit = document.getElementById('findByCitySubmit');
  findByCitySubmit.onclick = (e) => {
    e.preventDefault();
    const selector = document.getElementById('findByCityZipcode');
    const zipcode = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (zipcode) {
      axios
        .get(apiUrl + 'person/city/' + zipcode)
        .then(function (res) {
          const findByCityTable = document.getElementById('findByCityTable');
          findByCityTable.style.visibility = 'visible';

          const findByCityTableBody = document.getElementById(
            'findByCityTableBody'
          );

          let tableBody = '';

          res.data.forEach((person) => {
            tableBody +=
              '<tr><td>' +
              person.pid +
              '</td><td>' +
              person.email +
              '</td><td>' +
              person.firstName +
              '</td><td>' +
              person.lastName +
              '</td><td>' +
              person.street +
              '</td><td>' +
              person.zipcode +
              '</td><td>' +
              person.phone +
              '</td><td>' +
              person.hobbies
                .map(function (hobby) {
                  return hobby.name;
                })
                .join(', ');
            +'</td></tr>';
          });
          findByCityTableBody.innerHTML = tableBody;
        })
        .catch(function (error) {
          const findByCityAlert = document.getElementById('findByCityAlert');
          findByCityAlert.removeAttribute('class');
          findByCityAlert.classList.add('alert');
          findByCityAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            findByCityAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            findByCityAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function findByCityZipCodeSelector() {
  const apiUrl = getSelectedServer();
  //initialize bootstrap-select
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  axios
    .get(apiUrl + 'zipcodes/all')
    .then(function (res) {
      const findByCityZipcode = document.getElementById('findByCityZipcode');
      //Setup change listener for adding city
      findByCityZipcode.addEventListener('change', (event) => {
        const findByCityCity = document.getElementById('findByCityCity');
        findByCityCity.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.all.forEach((zip) => {
        var opt = document.createElement('option');
        opt.text = zip.zipcode;
        opt.value = zip.city;
        findByCityZipcode.add(opt, null);
      });
      $('.my-findByCity').selectpicker();
    })
    .catch(function (error) {
      const findByCityZipAlert = document.getElementById('findByCityAlert');
      findByCityZipAlert.removeAttribute('class');
      findByCityZipAlert.classList.add('alert');
      findByCityZipAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        findByCityZipAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        findByCityZipAlert.innerHTML =
          '<h2>Something went wrong while fetching zip codes</h2>';
      }
    });
}
