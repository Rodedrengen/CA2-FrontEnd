import { getSelectedServer } from './getSelectedServer';

export function findByCity() {
  const findByCitySubmit = document.getElementById('findByCitySubmit');
  findByCitySubmit.onclick = (e) => {
    e.preventDefault();
    const selector = document.getElementById('findByCityZipcode');
    const zipcode = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (zipcode) {
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(apiUrl + 'person/city/' + zipcode, options)
        .then(handleHttpErrors)
        .then((res) => {
          const findByCityTable = document.getElementById('findByCityTable');
          findByCityTable.style.visibility = 'visible';

          const findByCityTableBody = document.getElementById(
            'findByCityTableBody'
          );

          let tableBody = '';

          res.forEach((person) => {
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
              person.hobby
                .map(function (hobby) {
                  return hobby.name;
                })
                .join(', ');
            +'</td><td>' + '</td><td></tr>';
          });
          findByCityTableBody.innerHTML = tableBody;
        })
        .catch((err) => {
          const findByCityAlert = document.getElementById('findByCityAlert');
          findByCityAlert.removeAttribute('class');
          findByCityAlert.classList.add('alert');
          findByCityAlert.classList.add('alert-danger');
          if (err.status) {
            findByCityAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
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
  fetch(apiUrl + 'zipcodes/all', options)
    .then(handleHttpErrors)
    .then((res) => {
      const findByCityZipcode = document.getElementById('findByCityZipcode');
      //Setup change listener for adding city
      findByCityZipcode.addEventListener('change', (event) => {
        const findByCityCity = document.getElementById('findByCityCity');
        findByCityCity.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.forEach((zip) => {
        var opt = document.createElement('option');
        opt.text = zip.zipcode;
        opt.value = zip.city;
        findByCityZipcode.add(opt, null);
      });
      $('.my-findByCity').selectpicker();
    })
    .catch((err) => {
      const findByCityZipAlert = document.getElementById('findByCityAlert');
      findByCityZipAlert.removeAttribute('class');
      findByCityZipAlert.classList.add('alert');
      findByCityZipAlert.classList.add('alert-danger');
      if (err.status) {
        findByCityZipAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        findByCityZipAlert.innerHTML =
          '<h2>Something went wrong while fetching zip codes</h2>';
      }
    });
}

function handleHttpErrors(res) {
  if (!res.ok) {
    Promise.reject(res);
  }
  return res.json();
}
