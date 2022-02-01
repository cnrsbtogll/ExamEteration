import client from './clinet';

const getSimpsons = q => client.get('/simpsons', q);
const getSimpsonsDetails = id => client.get(`/simpsons/${id}`);

export default {
  getSimpsons,
  getSimpsonsDetails,
};
