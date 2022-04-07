export async function createCounter(name) {
  const response = await fetch(`/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await response.json();
  return data;
}

export async function readCounter(name) {
  try {
    const response = await fetch(`/read?name=${name}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateCounter(name) {
  try {
    const response = await fetch(`/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCounter(name) {
  try {
    const response = await fetch(`/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function readAllCounters() {
  const response = await fetch(`/dump`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
