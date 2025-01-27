import { fetchJSON, renderProjects } from '../global.js';

let fetch_url;

if (location.pathname.includes('/portfolio/')) {
    fetch_url = '/portfolio/lib/projects.json';
} else {
    fetch_url = '../lib/projects.json';
}

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

const projectsTitle = document.querySelector('.projects-title');

projectsTitle.textContent = `${projects.length} Projects`;

renderProjects(projects, projectsContainer, 'h2');


