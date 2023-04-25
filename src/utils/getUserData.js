function getUserData() {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

export default getUserData;
