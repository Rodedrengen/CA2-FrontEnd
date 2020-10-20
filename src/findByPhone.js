import { getSelectedServer } from './getSelectedServer';

export function findByPhone() {
  const findByPhoneSubmit = document.getElementById('findByPhoneSubmit');
  findByPhoneSubmit.onclick = (e) => {
    e.preventDefault();
    const phone = document.getElementById('findByPhonePhone').value;
    const apiUrl = getSelectedServer();
    if (phone) {
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(apiUrl + 'person/' + phone, options)
        .then(handleHttpErrors)
        .then((res) => {
          const findByPhoneAlert = document.getElementById('findByPhoneAlert');
          findByPhoneAlert.removeAttribute('class');
          findByPhoneAlert.classList.add('alert');
          findByPhoneAlert.classList.add('alert-success');
          findByPhoneAlert.innerHTML =
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
        })
        .catch((err) => {
          const addPersonAlert = document.getElementById('findByPhoneAlert');
          findByPhoneAlert.removeAttribute('class');
          findByPhoneAlert.classList.add('alert');
          findByPhoneAlert.classList.add('alert-danger');
          if (err.status) {
            findByPhoneAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            findByPhoneAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

function handleHttpErrors(res) {
  if (!res.ok) {
    Promise.reject(res);
  }
  return res.json();
}
