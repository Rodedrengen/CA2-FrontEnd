import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function addPerson() {
  const addPersonSubmit = document.getElementById('addPersonSubmit');
  addPersonSubmit.onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById('addPersonEmail').value;
    const firstName = document.getElementById('addPersonFirstName').value;
    const lastName = document.getElementById('addPersonLastName').value;
    const street = document.getElementById('addPersonStreet').value;
    const selector = document.getElementById('addPersonZipcode');
    const zipcode = selector.options[selector.selectedIndex].text;
    const phone = document.getElementById('addPersonPhone').value;
    if (email && firstName && lastName && street && zipcode && phone) {
      const apiUrl = getSelectedServer();
      axios
        .post(apiUrl + 'person', {
          email,
          firstName,
          lastName,
          street,
          zipcode: parseInt(zipcode),
          phone: parseInt(phone),
        })
        .then(function (res) {
          const addPersonAlert = document.getElementById('addPersonAlert');
          addPersonAlert.removeAttribute('class');
          addPersonAlert.classList.add('alert');
          addPersonAlert.classList.add('alert-success');
          addPersonAlert.innerHTML = 'person created with id: ' + res.data.pid;
        })
        .catch(function (error) {
          const addPersonAlert = document.getElementById('addPersonAlert');
          addPersonAlert.removeAttribute('class');
          addPersonAlert.classList.add('alert');
          addPersonAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            addPersonAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            addPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function addPersonZipCodeSelector() {
  const apiUrl = getSelectedServer();

  axios
    .get(apiUrl + 'zipcodes/all')
    .then(function (res) {
      const zipCodeSelector = document.getElementById('addPersonZipcode');
      //Setup change listener for adding city
      zipCodeSelector.addEventListener('change', (event) => {
        const addPersonCity = document.getElementById('addPersonCity');
        addPersonCity.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.data.all.forEach((zip) => {
        var opt = document.createElement('option');
        opt.text = zip.zipcode;
        opt.value = zip.city;
        zipCodeSelector.add(opt, null);
      });
      $('.my-select').selectpicker();
    })
    .catch(function (error) {
      const addPersonAlert = document.getElementById('addPersonAlert');
      addPersonAlert.removeAttribute('class');
      addPersonAlert.classList.add('alert');
      addPersonAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        addPersonAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        addPersonAlert.innerHTML =
          '<h2>Something went wrong while fetching zip codes</h2>';
      }
    });
}
