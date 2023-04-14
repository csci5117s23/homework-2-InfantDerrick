const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export async function getTodo(itemId, authToken){
  const response = await fetch(`${baseUrl}/todos?_id=${itemId}`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

export async function postTodo(data, authToken){
  const response = await fetch(`${baseUrl}/todos`, {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return response;
}

export async function getAllTodos(userId, authToken){
  const response = await fetch(`${baseUrl}/todos?uid=${userId}&done=false`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

export async function getAllDoneTodos(userId, authToken){
  const response = await fetch(`${baseUrl}/todos?uid=${userId}&done=true`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  const data = await response.json();
  return data;
}

export async function updateTodo(data, itemId, authToken){
  const response = fetch(`${baseUrl}/updateTodo?_id=${itemId}`, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return response;
}

export async function toggleTodoDoneness(state, itemId, authToken){
  let data = (await getTodo(itemId, authToken))[0];
  data.done = !state;
  console.log(data)
  return updateTodo(data, itemId, authToken);
}