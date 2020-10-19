import 'bootstrap/dist/css/bootstrap.css';
import navigation from './navigation';

// getAll
export function getAll() {
  const getAllUsersButton = document.getElementById('getAllUsersButton');
  const allUsersTableBody = document.getElementById('allUsersTableBody');
  getAllUsersButton.onclick = (e) => {
    e.preventDefault();
    fetch('http://localhost:3333/api/users/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const users = data
          .map((user) => {
            return (
              '<tr><td>' +
              user.id +
              '</td><td>' +
              user.name +
              '</td><td>' +
              user.age +
              '</td><td>' +
              user.gender +
              '</td><td>' +
              user.email +
              '</td><td>' +
              user.email +
              '</td></tr>'
            );
          })
          .join('');
        allUsersTableBody.innerHTML = users;
      });
  };
}

// getByID
export function getByID() {
  const getUserByIDButton = document.getElementById('getUserByIDButton');
  const getUserByIDTableBody = document.getElementById('getUserByIDTableBody');
  const getUserByIDInput = document.getElementById('getUserByIDInput');
  getUserByIDButton.onclick = (e) => {
    e.preventDefault();
    const promise1 = fetch(
      'http://localhost:3333/api/users/' + getUserByIDInput.value
    )
      .then(handleHttpErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        const users =
          '<tr><td>' +
          user.id +
          '</td><td>' +
          user.name +
          '</td><td>' +
          user.age +
          '</td><td>' +
          user.gender +
          '</td><td>' +
          user.email +
          '</td></tr>';
        getUserByIDTableBody.innerHTML = users;
      })
      .catch((err) => {
        const responseGetUser = document.getElementById('responseGetUser');
        if (err.status) {
          err.fullError.then(
            (e) => (responseGetUser.innerHTML = '<h2>' + e.msg + '</h2>')
          );
        } else {
          responseGetUser.innerHTML = '<h2>Network Error</h2>';
        }
      });
  };
}

// addUser
export function addUser() {
  const addUserButton = document.getElementById('addUserButton');
  addUserButton.onclick = (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const email = document.getElementById('email');
    if (name.value && age.value && gender.value && email.value) {
      let options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(age.value),
          name: name.value,
          gender: gender.value,
          email: email.value,
        }),
      };
      fetch('http://localhost:3333/api/users', options)
        .then(handleHttpErrors)
        .then((res) => {
          const responseAdd = document.getElementById('responseAdd');
          responseAdd.innerHTML = '<h2>' + res.statusText + '</h2>';
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then(
              (e) => (responseAdd.innerHTML = '<h2>' + e.msg + '</h2>')
            );
          } else {
            responseAdd.innerHTML = '<h2>Network Error</h2>';
          }
        });
    }
  };
}

// editUser
export function editUser() {
  const editUserButton = document.getElementById('editUserButton');
  editUserButton.onclick = (e) => {
    e.preventDefault();
    const id = document.getElementById('idEdit').value;
    const name = document.getElementById('nameEdit').value;
    const age = document.getElementById('ageEdit').value;
    const gender = document.getElementById('genderEdit').value;
    const email = document.getElementById('emailEdit').value;

    if (id && name && age && gender && email) {
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(age),
          name,
          gender,
          email,
        }),
      };

      const responseEdit = document.getElementById('responseEdit');
      fetch('http://localhost:3333/api/users/' + id, options)
        .then(handleHttpErrors)
        .then((res) => {
          if (res.age) {
            responseEdit.innerHTML = '<h2> User Edited</h2>';
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then(
              (e) => (responseEdit.innerHTML = '<h2>' + e.msg + '</h2>')
            );
          } else {
            responseEdit.innerHTML = '<h2>Network Error</h2>';
          }
        });
    }
  };
}

//deleteUser
export function deleteUser() {
  const deleteUserButton = document.getElementById('deleteUserButton');
  deleteUserButton.onclick = (e) => {
    e.preventDefault();
    const id = document.getElementById('idDelete');
    if (id.value) {
      let options = {
        method: 'DELETE',
      };
      const responseDelete = document.getElementById('responseDelete');
      fetch('http://localhost:3333/api/users/' + id.value, options)
        .then(handleHttpErrors)
        .then(() => {
          responseDelete.innerHTML = '<h2> User ' + id.value + ' deleted</h2>';
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then(
              (e) => (responseDelete.innerHTML = '<h2>' + e.msg + '</h2>')
            );
          } else {
            responseDelete.innerHTML = '<h2>Network Error</h2>';
          }
        });
    }
  };
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
