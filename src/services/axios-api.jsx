import axios from 'axios';

export async function getPictures(searchWord, page) {
  const API_KEY = '28022649-289628139dcfe0cc9a597312e';
  const SEARCH_PARAMS = `?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  axios.defaults.baseURL = 'https://pixabay.com/api';

  return await axios.get(`/${SEARCH_PARAMS}`);
}
