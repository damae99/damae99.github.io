'use strict';
//Mobile view - hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const hamburgerLine = document.querySelectorAll('.hamburger__line');
const headerMenu = document.querySelector('.header__menu');
hamburger.addEventListener('click', () => {
  headerMenu.classList.toggle('open');

  hamburgerLine.forEach((li) => {
    li.classList.toggle('line__cross');
  });
});

headerMenu.addEventListener('click', () => {
  headerMenu.classList.remove('open');
  hamburgerLine.forEach((li) => {
    li.classList.remove('line__cross');
  });
});

// 페이지 스크롤 시 header색상변경
const header = document.querySelector('.header');
document.addEventListener('scroll', () => {
  if (window.scrollY > header.offsetHeight) {
    header.classList.add('header--color');
  } else {
    header.classList.remove('header--color');
  }
});

// 페이지 스크롤 시 Home섹션 투명도 처리
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 페이지 아래로 스크롤시 Arrow up 버튼 보여주기
const arrwUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrwUp.classList.add('arrow-up--visible');
  } else {
    arrwUp.classList.remove('arrow-up--visible');
  }
});
