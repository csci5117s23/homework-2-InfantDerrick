const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export async function getTodo(itemId, authToken){
  const res = await fetch(`${baseUrl}/todos?_id=${itemId}`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return processData(res);
}

export async function postTodo(data, authToken){
  let tagInfo = await getAllTags(data.uid, authToken);
  let tags = tagInfo.map(tag => tag.tag);
  let newTags = data.tags.filter(tag => !tags.includes(tag));
  newTags.map(async (tag) => await postTag({
    uid: data.uid,
    tag: tag
  }, authToken));
  const res = await fetch(`${baseUrl}/todos`, {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return res;
}

export async function getAllTodos(userId, authToken){
  const res = await fetch(`${baseUrl}/todos?uid=${userId}&done=false`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  
  return processData(res);
}

export async function getAllDoneTodos(userId, authToken){
  const res = await fetch(`${baseUrl}/todos?uid=${userId}&done=true`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return processData(res);
}

export async function updateTodo(data, itemId, authToken){
  console.log(data);
  const res = fetch(`${baseUrl}/updateTodo?_id=${itemId}`, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return res;
}
export async function test(){
  const res = await fetch(`${baseUrl}/test`, {
    'method': 'GET'
  });
  const data = await res.json();
  return data;
}

export async function toggleTodoDoneness(state, itemId, authToken){
  let data = (await getTodo(itemId, authToken))[0];
  data.done = !state;
  console.log(data)
  return updateTodo(data, itemId, authToken);
}

export async function getAllTags(userId, authToken){
  const res = await fetch(`${baseUrl}/tags?uid=${userId}`, {
    'method': 'GET',
    'headers': {'Authorization': 'Bearer ' + authToken}
  });
  return processData(res);
}
export async function postTag(data, authToken){
  const res = await fetch(`${baseUrl}/tags`, {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  });
  return res;
}

export async function getAllTodosBasedOnATag(userId, tag, authToken){
  const data = await getAllTodos(userId, authToken);
  return data.filter(x => x.tags.includes(tag));
}
export async function getAllDoneBasedOnATag(userId, tag, authToken){
  const data = await getAllDoneTodos(userId, authToken);
  return data.filter(x => x.tags.includes(tag));
}
export async function editTagForAll(userId, tagid, originalTag, updatedTag, authToken){
  const done = await getAllDoneBasedOnATag(userId, originalTag, authToken);
  const todo = await getAllTodosBasedOnATag(userId, originalTag, authToken);
  const all = [...done, ...todo];
  console.log(all);
  all.map(item => { 
    let newTags = item.tags.filter((tag) => tag != originalTag);
    newTags = [...newTags, updatedTag];
    return {...item, tags: newTags}
  }).map(async (item) => await updateTodo(item, item._id, authToken));
  const newObj = {
    _id: tagid,
    uid: userId,
    tag: updatedTag 
  }
  const res = fetch(`${baseUrl}/updateTag?_id=${tagid}`, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(newObj)
  });
  return res;
}
export async function deleteTagForAll(userId, tagid, originalTag, authToken){
  const done = await getAllDoneBasedOnATag(userId, originalTag, authToken);
  const todo = await getAllTodosBasedOnATag(userId, originalTag, authToken);
  const all = [...done, ...todo];
  console.log(all);
  all.map(item => { 
    let newTags = item.tags.filter((tag) => tag != originalTag);
    return {...item, tags: newTags}
  }).map(async (item) => await updateTodo(item, item._id, authToken));
  const res = fetch(`${baseUrl}/removeTag?_id=${tagid}`, {
    'method': 'PUT',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json',
    }
  });
  return res;
}
const processData = (res) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json().then(data => {
      return data;
    });
  } else {
    if(res.status === 403) return '403';
    return res.text().then(text => {
      return text;
    });
  }
}