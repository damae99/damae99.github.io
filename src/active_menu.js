'use strict';
// const headerMenu = document.querySelector('.header__menu');

// headerMenu.addEventListener('click', (e) => {
//   const currentTarget = document.querySelector('.active');
//   const target = e.target;
//   currentTarget.classList.remove('active');
//   target.classList.add('active');
// });

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonial',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`a[href="${id}"]`)
);
const visibleSections = sectionIds.map(() => false); //처음엔 모든 섹션의 visible여부를 false로. -> 그리고 콜백함수에서 정보 업데이트
let activeNavItem = navItems[0]; //활성화된 섹션의 navItem에 active클래스를 주기 위해 기본적으로 일단 첫번째 nav item을 activeNavItem로 지정해두기

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.97],
};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne; //flag변수-제일 마지막 섹션을 선택해야하는지 아닌지 확인시켜줄 변수
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`); //visibleSections변수에 담을 정보를 업데이트하기 위해 변경사항이 발생한 entry(=섹션)의 인덱스를 가져오기
    visibleSections[index] = entry.isIntersecting; // 그 entry(섹션)가 부모요소에 진입했는지 아닌지 여부를 visibleSections변수의 해당 인덱스에 업데이트
    selectLastOne =
      index === sectionIds.length - 1 &&
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95;
  });
  console.log(selectLastOne);

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  //   console.log(navItems[navIndex]);

  selectNavItem(navIndex);
}

function findFirstIntersecting(visibleSections) {
  const index = visibleSections.indexOf(true);
  return index >= 0 ? index : 0; //visibleSections에 true인 값이 없다면 -1을 반환하게 되므로 index를 0으로 지정하도록 해준것.
  //로직적으로는 보여지는 섹션이 하나는 존재할 것이므로 -1이 나오는 건 불가능하지만 --코드적으로 indexOf라는 함수는 -1을 반환할 수 있으므로 혹시나 경우를 대비해 안전하게 코딩한 것.
}

function selectNavItem(navIndex) {
  const navItem = navItems[navIndex];
  if (!navItem) return; //배열에 있는 navItem을 찾지 못했다면 함수 종료.
  //로직상으로는 navIndex가 배열의 크기보다 클 일이 없지만, 코드상으로는 함수를 호출하는 사람이 실수해서 navIndex를 배열의 크기보다 큰 걸 지정할 수도 있으므로 안전하게 위의 코드로 코딩
  activeNavItem.classList.remove('active');
  activeNavItem = navItem;
  activeNavItem.classList.add('active');
}
