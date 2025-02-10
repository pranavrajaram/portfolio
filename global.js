console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a")

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
//   );

// currentLink?.classList.add('current');


let pages = [
    { url: 'index.html', title: 'Home' },
    { url: 'projects/index.html', title: 'Projects' },
    { url: 'contact/index.html', title: 'Contact' },
    { url: 'resume/index.html', title: 'Resume' },
    { url: 'meta/index.html', title: 'Meta' },
    { url: 'https://github.com/pranavrajaram', title: 'GitHub' },
  ];
  
  let nav = document.createElement('nav');
  document.body.prepend(nav);

  let BASE_URL;

  if (location.pathname.includes('/portfolio/')) {
      BASE_URL = '/portfolio/';
  } else {
      BASE_URL = '/';
  }
  
  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;
  
    if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = BASE_URL + url;
  }
  
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
    }

    if (a.host !== location.host) {
      a.target = "_blank";
    }

  }

document.body.insertAdjacentHTML(
    'afterbegin',
    `
        <label class="color-scheme">
        Theme:
        <select id="theme-switcher">
          <option value="light dark">Automatic</option> <!-- Default -->
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>`
  );

let select = document.querySelector('#theme-switcher');

function setColorScheme(scheme) {

  document.documentElement.style.setProperty('color-scheme', scheme);
  select.value = scheme;

}

if ("colorScheme" in localStorage) {

  setColorScheme(localStorage.colorScheme);

}

select.addEventListener('input', function (event) {

  setColorScheme(event.target.value);
  localStorage.colorScheme = event.target.value;
  console.log('color scheme changed to', event.target.value);

});


export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    console.log(response);

    const data = await response.json();
    return data; 

  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project, containerElement, headingLevel = 'h2') {
  
  containerElement.innerHTML = '';

  project.forEach(project => {
    const article = document.createElement('article');

    article.innerHTML = `
      <h3>
        <a href="${project.link}" target="_blank">${project.title}</a>
      </h3>
      <img src="${project.image}" alt="${project.title}">
      <div class="project-details">
        <p>${project.description}</p>
        <p>Year: ${project.year}</p>
      </div>`;
    
    
    containerElement.appendChild(article);
});


}


export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);

}


