import { getSelectedServer } from './getSelectedServer';

export function removeHobbyFindByPhone() {
  const removeHobbyFromPersonSubmit = document.getElementById(
    'removeHobbyFromPersonSubmit'
  );
  removeHobbyFromPersonSubmit.onclick = (e) => {
    e.preventDefault();
    findByPhone();
  };
}

function findByPhone() {
  const phone = document.getElementById('removeHobbyFromPersonPhone').value;
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

        if (res.hobby) {
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

          res.hobby.forEach((hobby) => {
            var opt = document.createElement('option');
            opt.text = hobby.name;
            opt.value = hobby.description;
            removeHobbyFromPersonHobby.add(opt, null);
          });
          $('.my-select').selectpicker();
        }
      })
      .catch((err) => {
        const removeHobbyFromPersonDiv = document.getElementById(
          'removeHobbyFromPersonDiv'
        );
        removeHobbyFromPersonDiv.removeAttribute('class');
        removeHobbyFromPersonDiv.classList.add('alert');
        removeHobbyFromPersonDiv.classList.add('alert-danger');
        if (err.status) {
          removeHobbyFromPersonDiv.innerHTML =
            'Status: ' + err.status + ' Error: ' + err.msg;
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

    const phone = document.getElementById('removeHobbyFromPersonPhone').value;
    const selector = document.getElementById('removeHobbyFromPersonHobby');
    const hobbyName = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (phone && hobbyName) {
      let options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(apiUrl + 'person/' + phone + '/hobby/' + hobbyName, options)
        .then(handleHttpErrors)
        .then((res) => {
          findByPhone();
          const removeHobbyFromPersonAlert = document.getElementById(
            'removeHobbyFromPersonAlert'
          );
          removeHobbyFromPersonAlert.removeAttribute('class');
          removeHobbyFromPersonAlert.classList.add('alert');
          removeHobbyFromPersonAlert.classList.add('alert-success');
          removeHobbyFromPersonAlert.innerHTML = '<h4>' + res.msg + '</h4>';
        })
        .catch((err) => {
          const removeHobbyFromPersonAlert = document.getElementById(
            'removeHobbyFromPersonAlert'
          );
          removeHobbyFromPersonAlert.removeAttribute('class');
          removeHobbyFromPersonAlert.classList.add('alert');
          removeHobbyFromPersonAlert.classList.add('alert-danger');
          if (err.status) {
            removeHobbyFromPersonAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            removeHobbyFromPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
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
