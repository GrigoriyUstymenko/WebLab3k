'use strict';

const insertItem = document.querySelector('.insert-item');
import fetchGraphQL from '/fetchGraphQL';


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
};

insertItem.addEventListener('submit', sendItem);
