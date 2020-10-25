import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function findByPID() {
  const findByPIDSubmit = document.getElementById('findByPIDSubmit');
  findByPIDSubmit.onclick = (e) => {
    e.preventDefault();
    const PID = document.getElementById('findByPIDPID').value;
    const apiUrl = getSelectedServer();
    if (PID) {
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      axios
        .get(apiUrl + 'person/' + PID)
        .then(function (res) {
          res = res.data;

          const findByPIDAlert = document.getElementById('findByPIDAlert');
          findByPIDAlert.removeAttribute('class');
          findByPIDAlert.classList.add('alert');
          findByPIDAlert.classList.add('alert-success');

          let body =
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
            '<br><b>City: </b>' +
            res.city +
            '<br><b>phone: </b>' +
            res.phone;

          if (res.hobbies) {
            const hobbies = res.hobbies
              .map(function (hobby) {
                return hobby.name;
              })
              .join(', ');
            body += '<br><b>hobbies: </b>' + hobbies;
          }

          findByPIDAlert.innerHTML = body;
        })
        .catch(function (error) {
          const findByPIDAlert = document.getElementById('findByPIDAlert');
          findByPIDAlert.removeAttribute('class');
          findByPIDAlert.classList.add('alert');
          findByPIDAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            findByPIDAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            findByPIDAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}
