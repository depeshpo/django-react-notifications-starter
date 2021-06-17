import axios from '../utils/axios';
import { LOGIN as LOGIN_URL } from '../constants/routes';

export const authService = {
  getUserToken,
  obtainAuthToken,
  logout,
  getUserDetail
};

function getUserToken() {
  return localStorage.getItem('token');
}

async function obtainAuthToken(loginData) {
  const response = await axios.post(`/accounts/obtain-token/`, loginData);
  localStorage.setItem('token', response.data.token);
  return response;
}

function logout() {
  localStorage.clear();
  window.location.replace(LOGIN_URL);
}

async function getUserDetail() {
  return await axios.get('accounts/user-detail/');
}
