import { getSelectedServer } from './getSelectedServer';

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
      let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(apiUrl + 'person/hobby/' + hobby + '/count', options)
        .then(handleHttpErrors)
        .then((res) => {
          const countPersonsDiv = document.getElementById('countPersonsDiv');
          countPersonsDiv.innerHTML =
            'Amount of persons with hobby <b>' + hobby + '</b>: ' + res.count;
        })
        .catch((err) => {
          const countPersonsWithHobbyAlert = document.getElementById(
            'countPersonsWithHobbyAlert'
          );
          countPersonsWithHobbyAlert.removeAttribute('class');
          countPersonsWithHobbyAlert.classList.add('alert');
          countPersonsWithHobbyAlert.classList.add('alert-danger');
          if (err.status) {
            countPersonsWithHobbyAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            countPersonsWithHobbyAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function countPersonsWithHobbySelector() {
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

      res.hobby.forEach((hobby) => {
        var opt = document.createElement('option');
        opt.text = hobby.name;
        opt.value = hobby.description;
        countPersonsWithHobbySelector.add(opt, null);
      });
      $('.my-select-count-persons').selectpicker();
    })
    .catch((err) => {
      const countPersonsWithHobbyAlert = document.getElementById(
        'countPersonsWithHobbyAlert'
      );
      countPersonsWithHobbyAlert.removeAttribute('class');
      countPersonsWithHobbyAlert.classList.add('alert');
      countPersonsWithHobbyAlert.classList.add('alert-danger');
      if (err.status) {
        countPersonsWithHobbyAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        countPersonsWithHobbyAlert.innerHTML =
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
