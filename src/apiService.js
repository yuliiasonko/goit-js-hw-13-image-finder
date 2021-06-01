const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21888222-e3a45453d1a465d7a2ff7640a';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImage() {
    try {
      const responseUrl = await fetch(
        `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
      );

      const { hits: images } = await responseUrl.json();
      this.incrementPage();
      
       return images;

    }  catch (e) {
    alert( "Извините, тут ошибка");
    }
   
    }
 
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}