import { addPerson, addPersonZipCodeSelector } from './addPerson';
import { editPerson, editPersonZipCodeSelector } from './editPerson';
import { deletePerson } from './deletePerson';
import { findByPhone } from './findByPhone';
// Navigation
// To add more top level buttons in comment the out commented code below and in public/index.html
const btnEx1 = document.getElementById('btnEx1');
const btnEx2 = document.getElementById('btnEx2');
const btnEx3 = document.getElementById('btnEx3');
const btnEx4 = document.getElementById('btnEx4');
const btnEx5 = document.getElementById('btnEx5');
const btnEx6 = document.getElementById('btnEx6');
const btnEx7 = document.getElementById('btnEx7');
const btnEx8 = document.getElementById('btnEx8');
const btnEx9 = document.getElementById('btnEx9');
const sectionEx1 = document.getElementById('1');
const sectionEx2 = document.getElementById('2');
const sectionEx3 = document.getElementById('3');
const sectionEx4 = document.getElementById('4');
const sectionEx5 = document.getElementById('5');
const sectionEx6 = document.getElementById('6');
const sectionEx7 = document.getElementById('7');
const sectionEx8 = document.getElementById('8');
const sectionEx9 = document.getElementById('9');
const s1Content = sectionEx1.innerHTML;
const s2Content = sectionEx2.innerHTML;
const s3Content = sectionEx3.innerHTML;
const s4Content = sectionEx4.innerHTML;
const s5Content = sectionEx5.innerHTML;
const s6Content = sectionEx6.innerHTML;
const s7Content = sectionEx7.innerHTML;
const s8Content = sectionEx8.innerHTML;
const s9Content = sectionEx9.innerHTML;

removeContent();

btnEx1.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(1);
  addPerson();
  addPersonZipCodeSelector();
};

btnEx2.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(2);
  editPerson();
  editPersonZipCodeSelector();
};

btnEx3.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(3);
  deletePerson();
};
btnEx4.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(4);
};
btnEx5.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(5);
};
btnEx6.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(6);
  findByPhone();
};

btnEx7.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(7);
};
btnEx8.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(8);
};
btnEx9.onclick = (e) => {
  e.preventDefault();
  removeContent();
  insertContent(9);
};

function removeContent() {
  sectionEx1.innerHTML = '';
  sectionEx2.innerHTML = '';
  sectionEx3.innerHTML = '';
  sectionEx4.innerHTML = '';
  sectionEx5.innerHTML = '';
  sectionEx6.innerHTML = '';
  sectionEx7.innerHTML = '';
  sectionEx8.innerHTML = '';
  sectionEx9.innerHTML = '';
}

function insertContent(id) {
  if (id === 1) sectionEx1.innerHTML = s1Content;
  if (id === 2) sectionEx2.innerHTML = s2Content;
  if (id === 3) sectionEx3.innerHTML = s3Content;
  if (id === 4) sectionEx4.innerHTML = s4Content;
  if (id === 5) sectionEx4.innerHTML = s5Content;
  if (id === 6) sectionEx2.innerHTML = s6Content;
  if (id === 7) sectionEx3.innerHTML = s7Content;
  if (id === 8) sectionEx4.innerHTML = s8Content;
  if (id === 9) sectionEx4.innerHTML = s9Content;
}
