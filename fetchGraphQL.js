export default async function fetchGraphQL(operationsDoc, operationName, variables) {
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
