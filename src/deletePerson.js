import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function deletePerson() {
  const deletePersonSubmit = document.getElementById('deletePersonSubmit');
  deletePersonSubmit.onclick = (e) => {
    e.preventDefault();
    const pid = document.getElementById('deletePersonPID').value;
    if (pid) {
      const apiUrl = getSelectedServer();
      let options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      axios
        .delete(apiUrl + 'person/' + pid)
        .then(function (res) {
          const deletePersonAlert = document.getElementById(
            'deletePersonAlert'
          );
          deletePersonAlert.removeAttribute('class');
          deletePersonAlert.classList.add('alert');
          deletePersonAlert.classList.add('alert-success');
          deletePersonAlert.innerHTML = res.data.msg;
        })
        .catch(function (error) {
          const deletePersonAlert = document.getElementById(
            'deletePersonAlert'
          );
          deletePersonAlert.removeAttribute('class');
          deletePersonAlert.classList.add('alert');
          deletePersonAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            deletePersonAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            deletePersonAlert.innerHTML = '<h2>Unknown Error</h2>';
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
