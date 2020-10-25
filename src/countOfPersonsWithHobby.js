import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function findCountByHobby() {
  const countPersonsWithHobbySubmit = document.getElementById(
    'countPersonsWithHobbySubmit'
  );
  countPersonsWithHobbySubmit.onclick = (e) => {
    e.preventDefault();
    const selector = document.getElementById('countPersonsWithHobbySelector');
    const hobby = selector.options[selector.selectedIndex].text;
    const apiUrl = getSelectedServer();
    if (hobby) {
      axios
        .get(apiUrl + 'person/hobby/' + hobby + '/count')
        .then(function (res) {
          const countPersonsDiv = document.getElementById('countPersonsDiv');
          countPersonsDiv.innerHTML =
            'Amount of persons with hobby <b>' +
            hobby +
            '</b>: ' +
            res.data.count;
        })
        .catch(function (error) {
          const countPersonsWithHobbyAlert = document.getElementById(
            'countPersonsWithHobbyAlert'
          );
          countPersonsWithHobbyAlert.removeAttribute('class');
          countPersonsWithHobbyAlert.classList.add('alert');
          countPersonsWithHobbyAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            countPersonsWithHobbyAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            countPersonsWithHobbyAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function countPersonsWithHobbySelector() {
  const apiUrl = getSelectedServer();

  axios
    .get(apiUrl + 'hobby/all')
    .then(function (res) {
      res = res.data;
      const countPersonsWithHobbySelector = document.getElementById(
        'countPersonsWithHobbySelector'
      );
      //Setup change listener for adding hobby
      countPersonsWithHobbySelector.addEventListener('change', (event) => {
        const countPersonsWithHobbyDescription = document.getElementById(
          'countPersonsWithHobbyDescription'
        );
        countPersonsWithHobbyDescription.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.category;
        countPersonsWithHobbySelector.add(opt, null);
      });
      $('.my-select-count-persons').selectpicker();
    })
    .catch((error) => {
      const countPersonsWithHobbyAlert = document.getElementById(
        'countPersonsWithHobbyAlert'
      );
      countPersonsWithHobbyAlert.removeAttribute('class');
      countPersonsWithHobbyAlert.classList.add('alert');
      countPersonsWithHobbyAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        countPersonsWithHobbyAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        countPersonsWithHobbyAlert.innerHTML =
          '<h2>Something went wrong while fetching hobbies</h2>';
      }
    });
}
