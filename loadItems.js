'use strict';

const middleColumn = document.querySelector('.middle-column');
import fetchGraphQL from '/fetchGraphQL';

const getItems = `query MyQuery {
  accordion {
    content
    title
  }
}`;

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

fetchGraphQL(getItems, 'MyQuery', {}).then(output => {
  const items = output.data.accordion;
  displayItems(items);
});

