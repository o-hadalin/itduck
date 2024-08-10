import BlazeSlider from 'blaze-slider';
document.addEventListener('DOMContentLoaded', event => {
  const el = document.querySelector('.yacht-slider');
  console.log(el);
  new BlazeSlider(el, {
    all: {
      draggable: true,
      slideGap: '20px',
      slidesToShow: 1,
    },
    '(min-width: 768px)': {
      slidesToShow: 2,
      slideGap: '32px',
    },
    '(min-width: 1280px)': {
      slidesToShow: 3,
      slideGap: '25px',
    },
    '(min-width: 1440px)': {
      slideGap: '32px',
    },
  });
});
