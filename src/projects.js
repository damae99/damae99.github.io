'use strict';

const categoriesContainer = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');

categoriesContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.category;
  if (filter == null) {
    return;
  }
  handleActiveCategory(e.target);
  filterProjects(filter);
});

function handleActiveCategory(target) {
  const currentActive = document.querySelector('.category--selected');
  currentActive.classList.remove('category--selected');
  target.classList.add('category--selected');
}

function filterProjects(filter) {
  projectsContainer.classList.add('animation-out');

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === project.dataset.type || filter === 'all') {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });

    projectsContainer.classList.remove('animation-out');
  }, 200);
}
