import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGalleryElClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const changeModalImage = `<img src=${e.target.dataset.source} alt="icon" />`;
  const instance = basicLightbox.create(changeModalImage);

  instance.show();
}
export { onGalleryElClick };