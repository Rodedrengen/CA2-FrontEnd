import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function removeHobbyFindByPID() {
  const removeHobbyFromPersonSubmit = document.getElementById(
    'removeHobbyFromPersonSubmit'
  );
  removeHobbyFromPersonSubmit.onclick = (e) => {
    e.preventDefault();
    findByPID();
  };
}

function findByPID() {
  const PID = document.getElementById('removeHobbyFromPersonPID').value;
  const apiUrl = getSelectedServer();
  if (PID) {
    axios
      .get(apiUrl + 'person/' + PID)
      .then(function (res) {
        res = res.data;
        const removeHobbyFromPersonDiv = document.getElementById(
          'removeHobbyFromPersonDiv'
        );
        removeHobbyFromPersonDiv.removeAttribute('class');
        removeHobbyFromPersonDiv.classList.add('alert');
        removeHobbyFromPersonDiv.classList.add('alert-success');
        removeHobbyFromPersonDiv.innerHTML =
          '<b>Pid: </b>' +
          res.pid +
          '<br><b> Email: </b>' +
          res.email +
          '<br><b>First Name: </b>' +
          res.firstName +
          '<br><b>Last Name: </b>' +
          res.lastName +
          '<br><b>Street: </b>' +
          res.street +
          '<br><b>Zipcode: </b>' +
          res.zipcode +
          '<br><b>phone: </b>' +
          res.phone;

        if (res.hobbies) {
          //Show selector
          const removeHobbyFromPersonHobbyRow = document.getElementById(
            'removeHobbyFromPersonHobbyRow'
          );
          removeHobbyFromPersonHobbyRow.style.visibility = 'visible';

          //Populate selector
          const removeHobbyFromPersonHobby = document.getElementById(
            'removeHobbyFromPersonHobby'
          );
          //Setup change listener for adding city
          removeHobbyFromPersonHobby.addEventListener('change', (event) => {
            const removeHobbyFromPersonDescription = document.getElementById(
              'removeHobbyFromPersonDescription'
            );
            removeHobbyFromPersonDescription.innerHTML = `<h4>${event.target.value}</h4>`;
          });

          res.hobbies.forEach((hobby) => {
            var opt = document.createElement('option');
            opt.text = hobby.name;
            opt.value = hobby.category;
            removeHobbyFromPersonHobby.add(opt, null);
          });
          $('.my-select').selectpicker();
        }
      })
      .catch(function (error) {
        const removeHobbyFromPersonDiv = document.getElementById(
          'removeHobbyFromPersonDiv'
        );
        removeHobbyFromPersonDiv.removeAttribute('class');
        removeHobbyFromPersonDiv.classList.add('alert');
        removeHobbyFromPersonDiv.classList.add('alert-danger');
        if (
          error.response &&
          error.response.data &&
          error.response.data.status
        ) {
          removeHobbyFromPersonDiv.innerHTML =
            'Status: ' +
            error.response.data.status +
            ' Error: ' +
            error.response.data.msg;
        } else {
          removeHobbyFromPersonDiv.innerHTML = '<h2>Unknown Error</h2>';
        }
      });
  }
}

export function removeHobbyFromPerson() {
  const removeHobbyFromPersonBtn = document.getElementById(
    'removeHobbyFromPersonBtn'
  );
  removeHobbyFromPersonBtn.onclick = (e) => {
    e.preventDefault();

    const PID = document.getElementById('removeHobbyFromPersonPID').value;
    const selector = document.getElementById('removeHobbyFromPersonHobby');
    const hobbyName = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (PID && hobbyName) {
      axios
        .delete(apiUrl + 'person/' + PID + '/hobby/' + hobbyName)
        .then(function (res) {
          findByPID();
          const removeHobbyFromPersonAlert = document.getElementById(
            'removeHobbyFromPersonAlert'
          );
          removeHobbyFromPersonAlert.removeAttribute('class');
          removeHobbyFromPersonAlert.classList.add('alert');
          removeHobbyFromPersonAlert.classList.add('alert-success');

          removeHobbyFromPersonAlert.innerHTML =
            '<h4>' + res.data.msg + '</h4>';
        })
        .catch(function (error) {
          const removeHobbyFromPersonAlert = document.getElementById(
            'removeHobbyFromPersonAlert'
          );
          removeHobbyFromPersonAlert.removeAttribute('class');
          removeHobbyFromPersonAlert.classList.add('alert');
          removeHobbyFromPersonAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            removeHobbyFromPersonAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            removeHobbyFromPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}
