import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io',
  proxy: false,
});

export default apiClient;
