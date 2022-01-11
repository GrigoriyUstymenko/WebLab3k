'use strict';

const middleColumn = document.querySelector('.middle-column');

/*
const loadItems = async () => {
  try {
    const response = await fetch('/api/getItems', {
      method: 'GET'
    });
    if (!response.ok) {
      const res = await response.json();
      const errText = res.errors?.length
        ? res.errors[0].title + ': ' + res.errors[0].detail
        : 'An unknown error occurred!';
      throw new Error(errText);
    }
    middleColumn.innerText = await response.json();
  } catch (responseErr) {
    const messageText = responseErr.message || 'An unknown error occurred!';
    alert(messageText);
  }
}

window.addEventListener('load', loadItems);

 */

/*
async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch('https://web-booklist.herokuapp.com/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const showBooks = `
  query MyQuery {
    books {
      author
      description
      id
      title
    }
  }
`;

 */

/*
function fetchBooks() {
  return fetchGraphQL(showBooks, 'MyQuery', {});
}

 */

/*
let books;
fetchBooks().then(output => {
  books = output.data.books;
  //middleColumn.innerText = JSON.stringify(books);
});

 */

const text = 'Hello hello arabora dududu esse slsls aaa dkd';
const items = [
  { title: 'Item1', content: text },
  { title: 'Item2', content: text },
  { title: 'Item3', content: text },
];

const displayItems = items => {
  middleColumn.innerHTML = '';
  const itemsEl = document.createElement('div');
  itemsEl.classList.add('items');
  middleColumn.appendChild(itemsEl);
  items.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    itemEl.innerHTML = `
        <input type="radio" id="radio${index}" name="radio">
        <label class="item-title" for="radio${index}">${item.title}</label>
        <div class="item-content">
          ${item.content}
        </div>`;

    itemsEl.appendChild(itemEl);
  });
};

displayItems(items);
