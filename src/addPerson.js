import { getSelectedServer } from './getSelectedServer';

export function addPerson() {
  const addPersonSubmit = document.getElementById('addPersonSubmit');
  addPersonSubmit.onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById('addPersonEmail').value;
    const firstName = document.getElementById('addPersonFirstName').value;
    const lastName = document.getElementById('addPersonLastName').value;
    const street = document.getElementById('addPersonStreet').value;
    const zipcode = document.getElementById('addPersonZipcode').value;
    const phone = document.getElementById('addPersonPhone').value;
    if (email && firstName && lastName && street && zipcode && phone) {
      const apiUrl = getSelectedServer();
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          street,
          zipcode: parseInt(zipcode),
          phone: parseInt(phone),
        }),
      };
      fetch(apiUrl + 'person/', options)
        .then(handleHttpErrors)
        .then((res) => {
          const addPersonAlert = document.getElementById('addPersonAlert');
          addPersonAlert.removeAttribute('class');
          addPersonAlert.classList.add('alert');
          addPersonAlert.classList.add('alert-success');
          addPersonAlert.innerHTML = 'person created with id: ' + res.pid;
        })
        .catch((err) => {
          const addPersonAlert = document.getElementById('addPersonAlert');
          addPersonAlert.removeAttribute('class');
          addPersonAlert.classList.add('alert');
          addPersonAlert.classList.add('alert-danger');
          if (err.status) {
            addPersonAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            addPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function addPersonZipCodeSelector() {
  const apiUrl = getSelectedServer();
  //initialize bootstrap-select
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(apiUrl + 'zipcodes/all', options)
    .then(handleHttpErrors)
    .then((res) => {
      const zipCodeSelector = document.getElementById('addPersonZipcode');
      //Setup change listener for adding city
      zipCodeSelector.addEventListener('change', (event) => {
        const addPersonCity = document.getElementById('addPersonCity');
        addPersonCity.innerHTML = `<h4>${event.target.value}</h4>`;
      });

      res.forEach((zip) => {
        var opt = document.createElement('option');
        opt.text = zip.zipcode;
        opt.value = zip.city;
        zipCodeSelector.add(opt, null);
      });
      $('.my-select').selectpicker();
    })
    .catch((err) => {
      const addPersonAlert = document.getElementById('addPersonAlert');
      addPersonAlert.removeAttribute('class');
      addPersonAlert.classList.add('alert');
      addPersonAlert.classList.add('alert-danger');
      if (err.status) {
        addPersonAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        addPersonAlert.innerHTML =
          '<h2>Something went wrong while fetching zip codes</h2>';
      }
    });
}

function handleHttpErrors(res) {
  if (!res.ok) {
    Promise.reject(res);
  }
  return res.json();
}
