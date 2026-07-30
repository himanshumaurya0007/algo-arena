// Save Data
export const setItem = (key, value) => {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

};



// Get Data
export const getItem = (key) => {

  const data = localStorage.getItem(key);


  return data
    ? JSON.parse(data)
    : null;

};



// Remove Data
export const removeItem = (key) => {

  localStorage.removeItem(key);

};



// Clear Storage
export const clearStorage = () => {

  localStorage.clear();

};