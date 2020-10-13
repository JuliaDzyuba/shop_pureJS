
const getResourse = async(url) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  };

  return await response.json();
};

// getResourse('https://jsonplaceholder.typicode.com/todos/2')
//     .then( data => console.log(data));
// getResourse('database/dataBase.json')
//     .then( data => console.log(data));

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });

  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  };

  return await response.json();
};