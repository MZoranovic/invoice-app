const BASE_URL = '';
const library = axios.create({ baseURL: 'http://zlaja.live:3000' });

library.interceptors.request.use(
  function (config) {
    config.headers['user'] = 'maja';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

async function getInvoices(filter) {
  const { data } = await library.get('/invoices', {
    params: { filter },
  });
  return data;
}

async function getInvoice(id) {
  const { data } = await library.get(`/invoices/${id}`);
  console.log(data);
  return data;
}

async function changeStatus(id) {
  const { data } = await library.patch(`/invoices/${id}`);
  console.log(data);
  return data;
}

async function deleteInvoice(id) {
  const { data } = await library.delete(`/invoices/${id}`);
  console.log(data);
  return data;
}

async function updateInvoice(id, newData) {
  const { data } = await library.put(`/invoices/${id}`, {
    ...newData,
  });
  console.log(data);
  return data;
}

async function createInvoice(newData) {
  const { data } = await library.post('/invoices/', {
    ...newData,
  });
  console.log(data);
  return data;
}
