//------------------------ Navbar link scroll animations ------------------------------------//
const projectsLink = document.querySelector('a[href="#projects"]');
const skillsLink = document.querySelector('a[href="#skills"]');
const contactLink = document.querySelector('a[href="#contact"]');
const welcomeLink = document.querySelector('a[href="#welcome-section"]');

projectsLink.addEventListener('click', (event) => {
  event.preventDefault(); 
  const projectsSection = document.querySelector('#projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });
});
skillsLink.addEventListener('click', (event) => {
  event.preventDefault(); 
  const skillsSection = document.querySelector('#skills');
  skillsSection.scrollIntoView({ behavior: 'smooth' });
});
contactLink.addEventListener('click', (event) => {
  event.preventDefault();
  const contactSection = document.querySelector('#contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});
welcomeLink.addEventListener('click', (event) => {
  event.preventDefault();
  const welcomeSection = document.querySelector('#welcome-section');
  welcomeSection.scrollIntoView({ behavior: 'smooth' });
});


//---------------------- In page link (next and back to top) scroll animations ----------------------//
const skillsBtn = document.querySelector('.skills-button');
const projectsBtn = document.querySelector('.projects-button');
const contactBtn = document.querySelector('.contact-button');
const topBtn = document.querySelector('.top-button');

skillsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const skillsSection = document.querySelector('#skills');
  skillsSection.scrollIntoView({ behavior: 'smooth' });
});
projectsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const projectsSection = document.querySelector('#projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });
});
topBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const topSection = document.querySelector('#welcome-section');
  topSection.scrollIntoView({ behavior: 'smooth' });
});

//--------------------------Flicker welcome text animation-----------------------------//
const heading = document.querySelector('#my-intro');
function getRandomLetter(string) {
  return string.charAt(Math.floor(Math.random() * string.length));
}
const flicker = document.querySelector('#flicker');
  const text = flicker.textContent;
  const letters = text.split('');
  flicker.textContent = '';

  letters.forEach((letter) => {
    const span = document.createElement('span');
    span.textContent = letter;
    flicker.appendChild(span);
  });

  function flickerText() {
    const spans = flicker.querySelectorAll('span');
    const randomIndex = Math.floor(Math.random() * spans.length);
    const randomSpan = spans[randomIndex];

    randomSpan.classList.toggle('flicker');

    setTimeout(() => {
      randomSpan.classList.toggle('flicker');
    }, Math.random() * 1000 + 500);
  }

  setInterval(flickerText, 1100);



//------------------------------dark/light mode---------------------------//
const nightModeLink = document.getElementById('night-mode');

nightModeLink.addEventListener('click', (event) => {
  event.preventDefault();
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    nightModeLink.innerHTML = '<i class="fa-regular fa-sun"></i>';
  } else {
    nightModeLink.innerHTML = '<i class="fa-regular fa-moon"></i>';
  }
});



//===========================jQuery=============================//
$(document).ready(function() {
  // Slide in navbar items from right to left
  $('#navbar').hide().fadeIn(1000);
  $('#nav-list-r').hide();
  
  $('#nav-list-l li').each(function(index) {
    $(this).hide().delay(500 * index).animate({ marginLeft: 'toggle' }, 500);
  });
  
  $('#nav-list-r').delay(500 * ($('#nav-list-l li').length + 1)).animate({ width: 'toggle' }, 500);
});



$(document).ready(function() {
  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to handle scroll event
  function handleScroll() {
    $('.animate-heading').each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('animate-show');
      } else {
        $(this).removeClass('animate-show');
      }
    });
  }

  // Trigger the handleScroll function on page load
  handleScroll();

  // Trigger the handleScroll function on scroll
  $(window).on('scroll', handleScroll);
});

$(document).ready(function() {
  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to animate the projects
  function animateProjects() {
    // Select the project items
    var projectItems = $('.project-item');

    // Loop through each project item
    projectItems.each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('project-animate');
      } else {
        $(this).removeClass('project-animate');
      }
    });
  }

  // Call the animateProjects function on scroll
  $(window).on('scroll', animateProjects);

  // Call the animateProjects function initially to check for visible projects
  animateProjects();
});





