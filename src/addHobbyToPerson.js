import { getSelectedServer } from './getSelectedServer';

export function addHobbyToPerson() {
  const addHobbyToPersonSubmit = document.getElementById(
    'addHobbyToPersonSubmit'
  );
  addHobbyToPersonSubmit.onclick = (e) => {
    e.preventDefault();
    const pid = document.getElementById('addHobbyToPersonPID').value;
    const selector = document.getElementById('addHobbyToPersonHobby');
    const hobby = selector.options[selector.selectedIndex].text;

    const apiUrl = getSelectedServer();
    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(apiUrl + 'person/' + pid + '/hobby/' + hobby, options)
      .then(handleHttpErrors)
      .then((res) => {
        const addHobbyToPersonAlert = document.getElementById(
          'addHobbyToPersonAlert'
        );
        addHobbyToPersonAlert.removeAttribute('class');
        addHobbyToPersonAlert.classList.add('alert');
        addHobbyToPersonAlert.classList.add('alert-success');
        addHobbyToPersonAlert.innerHTML = 'Hobby added to ' + res.email;
      })
      .catch((err) => {
        const addHobbyToPersonAlert = document.getElementById(
          'addHobbyToPersonAlert'
        );
        addHobbyToPersonAlert.removeAttribute('class');
        addHobbyToPersonAlert.classList.add('alert');
        addHobbyToPersonAlert.classList.add('alert-danger');
        if (err.status) {
          addHobbyToPersonAlert.innerHTML =
            'Status: ' + err.status + ' Error: ' + err.msg;
        } else {
          addHobbyToPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
        }
      });
  };
}

export function getHobbies() {
  const apiUrl = getSelectedServer();
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
      const addHobbyToPersonHobby = document.getElementById(
        'addHobbyToPersonHobby'
      );
      //Setup change listener for adding city
      addHobbyToPersonHobby.addEventListener('change', (event) => {
        const addHobbyToPersonDescription = document.getElementById(
          'addHobbyToPersonDescription'
        );
        addHobbyToPersonDescription.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.hobby.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.description;
        addHobbyToPersonHobby.add(opt, null);
      });
      $('.my-select').selectpicker();
    })
    .catch((err) => {
      const addHobbyToPersonAlert = document.getElementById(
        'addHobbyToPersonAlert'
      );
      addHobbyToPersonAlert.removeAttribute('class');
      addHobbyToPersonAlert.classList.add('alert');
      addHobbyToPersonAlert.classList.add('alert-danger');
      if (err.status) {
        addHobbyToPersonAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        addHobbyToPersonAlert.innerHTML =
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
