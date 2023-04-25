export const submitHandler = (cb) => {
  return (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = [...formData.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    cb(data);
  };
};
