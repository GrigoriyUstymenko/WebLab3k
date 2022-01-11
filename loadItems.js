'use strict';

const middleColumn = document.querySelector('.middle-column');

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
