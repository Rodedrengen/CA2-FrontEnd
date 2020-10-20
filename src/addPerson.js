const apiUrl = 'https://virtserver.swaggerhub.com/pigroup/CA2/1.0.0/person';

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
      fetch(apiUrl, options)
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

function handleHttpErrors(res) {
  if (!res.ok) {
    Promise.reject(res);
  }
  return res.json();
}
