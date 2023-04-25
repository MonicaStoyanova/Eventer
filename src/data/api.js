import getUserData from '../utils/getUserData.js';

const HOST = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const user = getUserData();
  const token = user ? user.accessToken : null;

  if (user) {
    options.headers['X-Authorization'] = token;
  }

  try {
    const response = await fetch(`${HOST}${url}`, options);

    if (response.status === 204) {
      return response;
    }

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      throw new Error(result.message);
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export const get = async (url) => await request('GET', url);
export const post = async (url, data) => await request('POST', url, data);
export const put = async (url, data) => await request('PUT', url, data);
export const del = async (url) => await request('DELETE', url);
