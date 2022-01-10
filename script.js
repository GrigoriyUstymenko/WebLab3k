'use strict';
const CIRCLE_RADIUS = 4;
const INVALID_NUMBER = /^0|-/gi;
const DEFAULT_TEXT_COLOR = 'black';

const headerText = document.querySelector('.header-text');
const smallRight = document.querySelector('div.small-right');
const smallLeft = document.querySelector('div.small-left');
const numberForm = document.querySelector('.number-form');
const inputColor = document.querySelector('#inputColor');
const middleColumn = document.querySelector('.middle-column');

const swapElements = (el1, el2) => {
  const temp = el2.innerText;
  el2.innerText = el1.innerText;
  el1.innerText = temp;
};

headerText.addEventListener(
  'click',
  swapElements.bind(null, headerText, smallRight)
);

const circleArea = radius => Math.round(Math.PI * radius ** 2);
smallLeft.append(`
  Circle radius: ${CIRCLE_RADIUS},
  calculated area: ${circleArea(CIRCLE_RADIUS)}
`);

const minimumDigit = input => {
  const digits = input.split('');
  return digits.reduce(
    (acc, d) => (d < acc ? +d : acc),
    Number.POSITIVE_INFINITY
  );
};

const numberFromSubmit = event => {
  event.preventDefault();
  const input = event.target.elements['inputNumber'].value;

  if (INVALID_NUMBER.test(input)) {
    alert('Incorrect Input!');
    return;
  }

  const minimum = minimumDigit(input);
  alert(`The minimum digit is: ${minimum}`);
  document.cookie = `minimumDigit=${minimum}`;
};

numberForm.addEventListener('submit', numberFromSubmit);

const getCookie = name => {
  const entries = document.cookie.split('; ').map(c => c.split('='));
  if (!entries.length) return undefined;
  return entries.find(e => e[0] === name)[1];
};

const clearCookies = () => {
  const entries = document.cookie.split('; ').map(c => c.split('='));
  document.cookie = entries.map(e => `${e[0]}=; Max-Age=0`).join('; ');
};

const promptCookies = () => {
  if (!document.cookie) {
    numberForm.style.display = 'block';
    return;
  }
  const keepCookies = confirm(
    `You have stored cookies: ${document.cookie}.\nDo you wish to keep them?`
  );
  if (keepCookies) {
    alert(
      `The cookies are kept for now. To change that you must reload the page`
    );
    return;
  }
  clearCookies();
  location.reload();
};

const updateColor = () => {
  smallRight.style.color =
    localStorage.getItem('smallRightColor') ?? DEFAULT_TEXT_COLOR;
};

const clearTable = () => {
  localStorage.setItem('table', JSON.stringify([]));
};

window.addEventListener('load', promptCookies);
window.addEventListener('load', updateColor);
window.addEventListener('load', clearTable);

const changeColor = event => {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  );
  smallRight.style.color = selection;
  localStorage.setItem('smallRightColor', selection);
};

inputColor.addEventListener('select', changeColor);

const appendTable = column => {
  const prevTable = column.querySelector('.inserted-table');
  if (prevTable) column.removeChild(prevTable);

  const cells = JSON.parse(localStorage.getItem('table'));
  const even = cells.length % 2;
  const table = document.createElement('table');
  table.classList.add('inserted-table');

  const tr1 = document.createElement('tr');
  const tr2 = cells.length % 2 ? tr1 : document.createElement('tr');

  cells.forEach((cell, index) => {
    const cellEl = document.createElement('td');
    cellEl.innerText = cell;
    cellEl.classList.add('inserted-cell');

    index % 2 ? tr1.appendChild(cellEl) : tr2.appendChild(cellEl);
  })

  table.append(tr1);
  if(!even) table.appendChild(tr2);

  column.appendChild(table);
  column.appendChild(table);
};

const insertCell = event => {
  event.preventDefault();
  const table = JSON.parse(localStorage.getItem('table'));
  const input = event.target.querySelector('input[type="text"]');
  table.push(input.value);
  localStorage.setItem('table', JSON.stringify(table));
  appendTable(event.target.parentElement);
};

const addTableForm = column => {
  const form = document.createElement('form');
  form.classList.add('table-form');
  form.addEventListener('submit', insertCell);

  const input = document.createElement('input');
  input.type = 'text';
  input.required = true;

  const button = document.createElement('input');
  button.type = 'submit';
  button.value = 'Insert cell';

  form.appendChild(input);
  form.appendChild(button);
  column.appendChild(form);
};

const removeTableForm = column => {
  const form = column.querySelector('.table-form');
  if (!form) return;
  column.removeChild(form);
};

document.querySelectorAll('.block-image').forEach(el => {
  el.addEventListener('mouseout', addTableForm.bind(null, el.parentElement));
  el.addEventListener(
    'mouseover',
    removeTableForm.bind(null, el.parentElement)
  );
});
