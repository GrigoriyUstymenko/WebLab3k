'use strict';

const insertItem = document.querySelector('.insert-item');

const sendItem = async () => {
  const entries = Array.from(insertItem.elements).map(e => [e.name, e.value]);
  const data = Object.fromEntries(entries);
  let messageText = 'Item inserted successfully!';

  try {
    const response = await fetch('/api/insertItem', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const res = await response.json();
      const errText = res.errors?.length
        ? res.errors[0].title + ': ' + res.errors[0].detail
        : 'An unknown error occurred!';
      throw new Error(errText);
    }
  } catch (responseErr) {
    messageText = responseErr.message || 'An unknown error occurred!';
  } finally {
    alert(messageText);
  }
};

insertItem.addEventListener('submit', sendItem);
