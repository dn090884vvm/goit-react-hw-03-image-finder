function fetchImages(searchWord, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchWord}&page=${page}&key=28022649-289628139dcfe0cc9a597312e&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`We did not find anything with ${searchWord}`)
    );
  });
}
const api = { fetchImages };

export default api;
