function setUserData(data) {
  localStorage.setItem('user', JSON.stringify(data));
}

export default setUserData;
