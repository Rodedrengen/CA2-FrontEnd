import { getSelectedServer } from './getSelectedServer';

export function findByHobby() {
  const getPersonsWithHobbySubmit = document.getElementById(
    'getPersonsWithHobbySubmit'
  );
  getPersonsWithHobbySubmit.onclick = (e) => {
    e.preventDefault();
    const hobby = document.getElementById('getPersonsWithHobbySelector').value;
    const apiUrl = getSelectedServer();
    if (hobby) {
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(apiUrl + 'person/hobby/' + hobby, options)
        .then(handleHttpErrors)
        .then((res) => {
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
              person.hobby
                .map(function (hobby) {
                  return hobby.name;
                })
                .join(', ');
            +'</td><td>' + '</td><td></tr>';
          });
          getPersonsWithHobbyTableBody.innerHTML = tableBody;
        })
        .catch((err) => {
          const getPersonsWithHobbyAlert = document.getElementById(
            'getPersonsWithHobbyAlert'
          );
          getPersonsWithHobbyAlert.removeAttribute('class');
          getPersonsWithHobbyAlert.classList.add('alert');
          getPersonsWithHobbyAlert.classList.add('alert-danger');
          if (err.status) {
            getPersonsWithHobbyAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            getPersonsWithHobbyAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function findByHobbySelector() {
  const apiUrl = getSelectedServer();
  //initialize bootstrap-select
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(apiUrl + 'hobby/all', options)
    .then(handleHttpErrors)
    .then((res) => {
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

      res.hobby.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.description;
        getPersonsWithHobbySelector.add(opt, null);
      });
      $('.my-select-find-by-hobby').selectpicker();
    })
    .catch((err) => {
      console.log(err);
      const getPersonsWithHobbyAlert = document.getElementById(
        'getPersonsWithHobbyAlert'
      );
      getPersonsWithHobbyAlert.removeAttribute('class');
      getPersonsWithHobbyAlert.classList.add('alert');
      getPersonsWithHobbyAlert.classList.add('alert-danger');
      if (err.status) {
        getPersonsWithHobbyAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        getPersonsWithHobbyAlert.innerHTML =
          '<h2>Something went wrong while fetching hobbies</h2>';
      }
    });
}

function handleHttpErrors(res) {
  if (!res.ok) {
    Promise.reject(res);
  }
  return res.json();
}
