const formApi = (array) => {
  let form = new Object();

  Object.entries(array).forEach(([key, value]) => {
    form[key] = value;
  });
  return form;
};

export { formApi };
