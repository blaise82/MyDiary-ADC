const popbtn = document.querySelector('.navButton');
const pop = document.querySelector('.mainMobMenu');

popbtn.addEventListener('click', () => {
  if (!pop.classList.contains('display')) {
    pop.classList.add('display');
  } else {
    (pop.classList.remove('display'));
  }
});
