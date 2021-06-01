import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import cardMarkup from './templates/picture.hbs';
import ImageApiService from './apiService';
import { onGalleryElClick } from './modalW';
import LoadMoreBtn from './load';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.picture-gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryElClick);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    loadMoreBtn.disable();
    return noResults();
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  fetchCards();
}

function fetchCards() {
  loadMoreBtn.disable();
  return imageApiService.fetchImage().then(cards => {
    renderMarkup(cards);

    scrollPage();
    loadMoreBtn.enable();

    if (cards.length === 0) {
      loadMoreBtn.hide();
      noMatchesFound();
    }
  });
}

function onLoadMore() {
  fetchCards();
}

function renderMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function noResults() {
  error({
    text: 'Please enter keeword',
    delay: 2000,
  });
}

function noMatchesFound() {
  error({
    text: 'No matches found.',
    delay: 2500,
  });
}

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}