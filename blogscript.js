// Get all the blog post items
const postItems = document.querySelectorAll('.blog-post');

// Loop through each blog post item
postItems.forEach(item => {
  // Get the full post element
  const fullPost = item.querySelector('.full-post');
  
  // Add a click event listener to the post title
  item.querySelector('.blog-title').addEventListener('click', (e) => {
    // Prevent the default click behavior
    e.preventDefault();

    // Check if the post item is already expanded
    const isExpanded = item.classList.contains('expanded');

    // Remove the "expanded" class from all post items
    postItems.forEach(postItem => postItem.classList.remove('expanded'));

    // Hide the full post element on all post items
    document.querySelectorAll('.full-post').forEach(fullPost => fullPost.classList.remove('show'));

    // If the post item is not already expanded, toggle the "expanded" class and show the full post element
    if (!isExpanded) {
      item.classList.add('expanded');
      fullPost.classList.add('show');
    }
  });

  // Add a click event listener to the window
  window.addEventListener('click', (e) => {
    // Check if the click is outside of the current post item
    if (!item.contains(e.target)) {
      // Remove the "expanded" class from the post item
      item.classList.remove('expanded');

      // Hide the full post element
      fullPost.classList.remove('show');
    }
  });
});





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


const topBtn = document.querySelector('.top-button');

topBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const topSection = document.querySelector('#welcome-section');
    topSection.scrollIntoView({ behavior: 'smooth' });
  });