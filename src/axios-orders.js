import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-52b1e.firebaseio.com/',
});

export default instance;
