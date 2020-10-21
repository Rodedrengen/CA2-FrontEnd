import { getSelectedServer } from './getSelectedServer';

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
      fetch(apiUrl + 'person/' + pid, options)
        .then(handleHttpErrors)
        .then((res) => {
          const deletePersonAlert = document.getElementById(
            'deletePersonAlert'
          );
          deletePersonAlert.removeAttribute('class');
          deletePersonAlert.classList.add('alert');
          deletePersonAlert.classList.add('alert-success');
          deletePersonAlert.innerHTML = res.msg;
        })
        .catch((err) => {
          const deletePersonAlert = document.getElementById(
            'deletePersonAlert'
          );
          deletePersonAlert.removeAttribute('class');
          deletePersonAlert.classList.add('alert');
          deletePersonAlert.classList.add('alert-danger');
          if (err.status) {
            deletePersonAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
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
