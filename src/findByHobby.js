import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function findByHobby() {
  const getPersonsWithHobbySubmit = document.getElementById(
    'getPersonsWithHobbySubmit'
  );
  getPersonsWithHobbySubmit.onclick = (e) => {
    e.preventDefault();
    const selector = document.getElementById('getPersonsWithHobbySelector');
    const hobby = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (hobby) {
      axios
        .get(apiUrl + 'person/hobby/' + hobby)
        .then(function (res) {
          res = res.data;
          const getPersonsWithHobbyTable = document.getElementById(
            'getPersonsWithHobbyTable'
          );
          getPersonsWithHobbyTable.style.visibility = 'visible';

          const getPersonsWithHobbyTableBody = document.getElementById(
            'getPersonsWithHobbyTableBody'
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
              person.hobbies
                .map(function (hobby) {
                  return hobby.name;
                })
                .join(', ');
            +'</td></tr>';
          });

          getPersonsWithHobbyTableBody.innerHTML = tableBody;
        })
        .catch(function (error) {
          const getPersonsWithHobbyAlert = document.getElementById(
            'getPersonsWithHobbyAlert'
          );
          getPersonsWithHobbyAlert.removeAttribute('class');
          getPersonsWithHobbyAlert.classList.add('alert');
          getPersonsWithHobbyAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            getPersonsWithHobbyAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            getPersonsWithHobbyAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function findByHobbySelector() {
  const apiUrl = getSelectedServer();

  axios
    .get(apiUrl + 'hobby/all')
    .then(function (res) {
      res = res.data;
      const getPersonsWithHobbySelector = document.getElementById(
        'getPersonsWithHobbySelector'
      );
      //Setup change listener for adding hobby
      getPersonsWithHobbySelector.addEventListener('change', (event) => {
        const getPersonsWithHobbyDescription = document.getElementById(
          'getPersonsWithHobbyDescription'
        );
        getPersonsWithHobbyDescription.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.category;
        getPersonsWithHobbySelector.add(opt, null);
      });
      $('.my-select-find-by-hobby').selectpicker();
    })
    .catch(function (error) {
      const getPersonsWithHobbyAlert = document.getElementById(
        'getPersonsWithHobbyAlert'
      );
      getPersonsWithHobbyAlert.removeAttribute('class');
      getPersonsWithHobbyAlert.classList.add('alert');
      getPersonsWithHobbyAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        getPersonsWithHobbyAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        getPersonsWithHobbyAlert.innerHTML =
          '<h2>Something went wrong while fetching hobbies</h2>';
      }
    });
}
