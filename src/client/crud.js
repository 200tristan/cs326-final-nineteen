
export async function createUser(name, password) {
  try{
    const response = await fetch(`user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, password: password}),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function loginUser(name, password) {
  try {
    const response = await fetch(`user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, password: password}),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function readUser(name) {
  try {
    const response = await fetch(`user/read`, {
      method: 'GET',
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

export async function updateUser(name) {
  try {
    const response = await fetch(`user/update`, {
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

export async function deleteUser(name) {
  try {
    const response = await fetch(`user/delete`, {
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

export async function createImage(name, image) {
  try{
    const response = await fetch(`image/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, image: image}),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function readImage(id) {
  try {
    const response = await fetch(`image/read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateImage(id) {
  try {
    const response = await fetch(`image/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteImage(id) {
  try {
    const response = await fetch(`image/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}