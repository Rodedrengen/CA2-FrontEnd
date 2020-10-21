import { getSelectedServer } from './getSelectedServer';
const apiUrl = getSelectedServer();
export function editPerson() {
  const editPersonSubmit = document.getElementById('editPersonSubmit');
  editPersonSubmit.onclick = (e) => {
    e.preventDefault();
    const pid = document.getElementById('editPersonPID').value;
    const email = document.getElementById('editPersonEmail').value;
    const firstName = document.getElementById('editPersonFirstName').value;
    const lastName = document.getElementById('editPersonLastName').value;
    const street = document.getElementById('editPersonStreet').value;
    const zipcode = document.getElementById('editPersonZipcode').value;
    const phone = document.getElementById('editPersonPhone').value;
    if (pid && email && firstName && lastName && street && zipcode && phone) {
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: parseInt(pid),
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
          const editPersonAlert = document.getElementById('editPersonAlert');
          editPersonAlert.removeAttribute('class');
          editPersonAlert.classList.add('alert');
          editPersonAlert.classList.add('alert-success');
          editPersonAlert.innerHTML = res.email + ' updated';
        })
        .catch((err) => {
          const editPersonAlert = document.getElementById('editPersonAlert');
          editPersonAlert.removeAttribute('class');
          editPersonAlert.classList.add('alert');
          editPersonAlert.classList.add('alert-danger');
          if (err.status) {
            editPersonAlert.innerHTML =
              'Status: ' + err.status + ' Error: ' + err.msg;
          } else {
            editPersonAlert.innerHTML = '<h2>Unknown Error</h2>';
          }
        });
    }
  };
}

export function editPersonZipCodeSelector() {
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
      const zipCodeSelector = document.getElementById('editPersonZipcode');
      //Setup change listener for adding city
      zipCodeSelector.addEventListener('change', (event) => {
        const editPersonCity = document.getElementById('editPersonCity');
        editPersonCity.innerHTML = `<h4>${event.target.value}</h4>`;
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
      const editPersonAlert = document.getElementById('editPersonAlert');
      editPersonAlert.removeAttribute('class');
      editPersonAlert.classList.add('alert');
      editPersonAlert.classList.add('alert-danger');
      if (err.status) {
        editPersonAlert.innerHTML =
          'Status: ' + err.status + ' Error: ' + err.msg;
      } else {
        editPersonAlert.innerHTML =
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
