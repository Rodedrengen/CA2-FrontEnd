import { getSelectedServer } from './getSelectedServer';
const axios = require('axios').default;

export function editPerson() {
  const editPersonSubmit = document.getElementById('editPersonSubmit');
  editPersonSubmit.onclick = (e) => {
    e.preventDefault();
    const pid = document.getElementById('editPersonPID').value;
    const email = document.getElementById('editPersonEmail').value;
    const firstName = document.getElementById('editPersonFirstName').value;
    const lastName = document.getElementById('editPersonLastName').value;
    const street = document.getElementById('editPersonStreet').value;
    const selector = document.getElementById('editPersonZipcode');
    const zipcode = selector.options[selector.selectedIndex].text;
    const phone = document.getElementById('editPersonPhone').value;
    if (pid && email && firstName && lastName && street && zipcode && phone) {
      const apiUrl = getSelectedServer();
      axios
        .put(apiUrl + 'person/', {
          pid: parseInt(pid),
          email,
          firstName,
          lastName,
          street,
          zipcode: parseInt(zipcode),
          phone: parseInt(phone),
        })
        .then(function (res) {
          const editPersonAlert = document.getElementById('editPersonAlert');
          editPersonAlert.removeAttribute('class');
          editPersonAlert.classList.add('alert');
          editPersonAlert.classList.add('alert-success');
          editPersonAlert.innerHTML = res.data.email + ' updated';
        })
        .catch(function (error) {
          const editPersonAlert = document.getElementById('editPersonAlert');
          editPersonAlert.removeAttribute('class');
          editPersonAlert.classList.add('alert');
          editPersonAlert.classList.add('alert-danger');
          if (
            error.response &&
            error.response.data &&
            error.response.data.status
          ) {
            editPersonAlert.innerHTML =
              'Status: ' +
              error.response.data.status +
              ' Error: ' +
              error.response.data.msg;
          } else {
            editPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function editPersonZipCodeSelector() {
  const apiUrl = getSelectedServer();

  axios
    .get(apiUrl + 'zipcodes/all')
    .then(function (res) {
      const zipCodeSelector = document.getElementById('editPersonZipcode');
      //Setup change listener for adding city
      zipCodeSelector.addEventListener('change', (event) => {
        const editPersonCity = document.getElementById('editPersonCity');
        editPersonCity.innerHTML = `<h4>${event.target.value}</h4>`;
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
      const editPersonAlert = document.getElementById('editPersonAlert');
      editPersonAlert.removeAttribute('class');
      editPersonAlert.classList.add('alert');
      editPersonAlert.classList.add('alert-danger');
      if (error.response && error.response.data && error.response.data.status) {
        editPersonAlert.innerHTML =
          'Status: ' +
          error.response.data.status +
          ' Error: ' +
          error.response.data.msg;
      } else {
        editPersonAlert.innerHTML =
          '<h2>Something went wrong while fetching zip codes</h2>';
      }
    });
}
