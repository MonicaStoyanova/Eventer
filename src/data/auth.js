import setUserData from '../utils/setUserData.js';
import clearUserData from '../utils/clearUserData.js';

import { get, post } from './api.js';

export async function login(email, password) {
  const {
    _id,
    email: userEmail,
    accessToken,
  } = await post('/users/login', {
    email,
    password,
  });
  setUserData({
    email: userEmail,
    accessToken,
    _id,
  });
}

export async function register(email, password) {
  const {
    _id,
    email: userEmail,
    accessToken,
  } = await post('/users/register', {
    email,
    password,
  });
  setUserData({
    email: userEmail,
    accessToken,
    _id,
  });
}

export function logout() {
  get('/users/logout');
  clearUserData();
}
