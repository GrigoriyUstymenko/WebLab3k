'use strict';

const insertItem = document.querySelector('.insert-item');

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch('https://web-lab3k.herokuapp.com/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const addItem = `mutation MyMutation($content: String = "", $title: String = "") {
  insert_accordion_one(object: {content: $content, title: $title}) {
    id
  }
}`;

const sendItem = async event => {
  event.preventDefault();

  const entries = Array.from(insertItem.elements).map(e => [e.name, e.value]);
  const data = Object.fromEntries(entries);
  await fetchGraphQL(addItem, 'MyMutation', {
    title: data.title,
    content: data.content,
  });

  //let messageText = 'Item inserted successfully!';

  /*
  try {
    const response = await fetch('/api/insertItem', {
      method: 'POST',
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
   */
};

insertItem.addEventListener('submit', sendItem);
