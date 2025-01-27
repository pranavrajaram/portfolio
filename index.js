import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';


let fetch_url;

if (location.pathname.includes('/portfolio/')) {
    fetch_url = '/portfolio/lib/projects.json';
} else {
    fetch_url = '../lib/projects.json';
}

const projects = await fetchJSON(fetch_url);
const latestProjects = projects.slice(0, 3);

const projectsContainer = document.querySelector('.projects');

renderProjects(latestProjects, projectsContainer, 'h2');


const githubData = await fetchGitHubData('pranavrajaram');

const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
          <dl>
            <dt>Username:</dt><dd>${githubData.login}</dd>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
  }

