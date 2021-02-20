import axios from 'axios';

const getQuestions = () => {
  axios.get('api/questions').then((response) => response.data);
};

export default getQuestions;
