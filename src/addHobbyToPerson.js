import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

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
    axios
      .post(apiUrl + 'person/' + pid + '/hobby/' + hobby)
      .then(function (res) {
        const addHobbyToPersonAlert = document.getElementById(
          'addHobbyToPersonAlert'
        );
        addHobbyToPersonAlert.removeAttribute('class');
        addHobbyToPersonAlert.classList.add('alert');
        addHobbyToPersonAlert.classList.add('alert-success');
        addHobbyToPersonAlert.innerHTML = 'Hobby added to ' + res.data.email;
      })
      .catch(function (error) {
        const addHobbyToPersonAlert = document.getElementById(
          'addHobbyToPersonAlert'
        );
        addHobbyToPersonAlert.removeAttribute('class');
        addHobbyToPersonAlert.classList.add('alert');
        addHobbyToPersonAlert.classList.add('alert-danger');
        if (
          error.response &&
          error.response.data &&
          error.response.data.status
        ) {
          addHobbyToPersonAlert.innerHTML =
            'Status: ' +
            error.response.data.status +
            ' Error: ' +
            error.response.data.msg;
        } else {
          addHobbyToPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
        }
      });
  };
}

export function getHobbies() {
  const apiUrl = getSelectedServer();

  axios
    .get(apiUrl + 'hobby/all')
    .then(function (res) {
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

      res.data.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.category;
        addHobbyToPersonHobby.add(opt, null);
      });
      $('.my-select').selectpicker();
    })
    .catch(function (error) {
      const addHobbyToPersonAlert = document.getElementById(
        'addHobbyToPersonAlert'
      );
      addHobbyToPersonAlert.removeAttribute('class');
      addHobbyToPersonAlert.classList.add('alert');
      addHobbyToPersonAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        addHobbyToPersonAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        addHobbyToPersonAlert.innerHTML =
          '<h2>Something went wrong while fetching hobbies</h2>';
      }
    });
}
