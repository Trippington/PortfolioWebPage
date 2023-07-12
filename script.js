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


//==============================Rotating inspirational quotes=============================//
var quotes = [
  "“Always remember that the future comes one day at a time.” - Dean Acheson",
  "“Success is not final, failure is not fatal: It is the courage to continue that counts.” - Winston Churchill",
  "“The only way to do great work is to love what you do.” - Steve Jobs",
  "“Believe you can and you're halfway there.” - Theodore Roosevelt",
  "“The future belongs to those who believe in the beauty of their dreams.” - Eleanor Roosevelt",
  "“Don't watch the clock; do what it does. Keep going.” - Sam Levenson",
  "“The most dangerous person is the one who listens, thinks, and observes.” - David Goggins",
  "“In the middle of every difficulty lies opportunity.” - Albert Einstein",
  "“Your time is limited, don't waste it living someone else's life.” - Steve Jobs",
  "“Success usually comes to those who are too busy to be looking for it.” - Henry David Thoreau",
  "“I have not failed. I've just found 10,000 ways that won't work.” - Thomas Edison",
  "“Don't be afraid to give up the good to go for the great.” - John D. Rockefeller",
  "“You are never too old to set another goal or to dream a new dream.” - C.S. Lewis",
  "“The secret of getting ahead is getting started.” - Mark Twain",
  "“The journey of a thousand miles begins with a single step.” - Lao Tzu"
];

function rotateQuotes() {
  var contactP = document.getElementById("contact-p");
  var timer = document.getElementById("timer");
  var currentQuoteIndex = 0;
  var rotationDuration = 5500;

  // Randomize the order of the quotes
  var randomizedQuotes = shuffleArray(quotes);

  // Initial fade-in effect
  contactP.style.opacity = 1;

  setInterval(function() {
    // Fade-out effect
    contactP.style.opacity = 0;

    // Wait for the fade-out to complete before updating the quote
    setTimeout(function() {
      currentQuoteIndex = (currentQuoteIndex + 1) % randomizedQuotes.length;
      contactP.textContent = randomizedQuotes[currentQuoteIndex];

      // Reset the timer animation
      timer.style.animation = "none";
      timer.offsetHeight; // Trigger reflow
      timer.style.animation = `spin ${rotationDuration}ms linear 1`;

      // Fade-in effect
      contactP.style.opacity = 1;
    }, 500); // Adjust the delay to match the CSS transition duration
  }, rotationDuration);
}

function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
rotateQuotes();





//===========================jQuery=============================//

//==========================Navbar Animation=======================//
$(document).ready(function() {
  // Slide in navbar items from right to left
  $('#navbar').hide().fadeIn(1000);
  $('#nav-list-r').hide();
  
  $('#nav-list-l li').each(function(index) {
    $(this).hide().delay(500 * index).animate({ marginLeft: 'toggle' }, 500);
  });
  
  $('#nav-list-r').delay(500 * ($('#nav-list-l li').length + 1)).animate({ width: 'toggle' }, 500);
});

//==========================Text Animation (Header Text)=======================//

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

  handleScroll();

  $(window).on('scroll', handleScroll);
});


//==========================Projects Animation=======================//

$(document).ready(function() {
  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    var verticalInView = (rect.top <= (windowHeight * 0.8)) && (rect.bottom >= (windowHeight * 0.2));
    var horizontalInView = (rect.left <= (windowWidth * 0.8)) && (rect.right >= (windowWidth * 0.2));

    return verticalInView && horizontalInView;
  }

  // Function to animate the projects
  function animateProjects() {
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

  $(window).on('scroll', animateProjects);

  animateProjects();
});

//===================================animate contact form==============================//

$(document).ready(function() {
  // Function to check if an element is in the viewport
  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    var verticalInView = (rect.top <= (windowHeight * 0.9)) && (rect.bottom >= (windowHeight * 0.2));
    var horizontalInView = (rect.left <= (windowWidth * 0.9)) && (rect.right >= (windowWidth * 0.2));

    return verticalInView && horizontalInView;
  }

  // Function to animate the form fields
  function animateFormFields() {
    var firstNameField = $('#first-name');
    var lastNameField = $('#last-name');
    var emailField = $('#email');
    var messageField = $('#message');

    // Loop through each form item
    firstNameField.add(lastNameField).add(emailField).add(messageField).each(function() {
      if (isElementInViewport(this)) {
        $(this).addClass('animate-show slide-from-left');
      } else {
        $(this).removeClass('animate-show slide-from-left');
      }
    })
  }
    
  $(window).on('scroll', animateFormFields);

  animateFormFields();
});


//==========================Make the arrows rotate 90 degrees===================//

$(document).ready(function() {
  var skillsButton = $('.skills-button');
  var projectsButton = $('.projects-button');


  skillsButton.hover(
    function() {
      $(this).find('i')
        .css({
          'transform': 'rotate(90deg)',
          'transition': 'transform 0.3s ease'
        });
    },
    function() {
      $(this).find('i')
        .css({
          'transform': 'rotate(0deg)',
          'transition': 'transform 0.3s ease'
        });
    }
  );
  projectsButton.hover(
    function() {
      $(this).find('i')
        .css({
          'transform': 'rotate(90deg)',
          'transition': 'transform 0.3s ease'
        });
    },
    function() {
      $(this).find('i')
        .css({
          'transform': 'rotate(0deg)',
          'transition': 'transform 0.3s ease'
        });
    }
  );
});
