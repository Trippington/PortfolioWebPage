const blogTopics = [
  "Getting Started with HTML",
  "Introduction to CSS",
  "JavaScript Fundamentals",
  "Creating a Blog Website",
  "Responsive Web Design",
  "Web Accessibility Basics",
  "Exploring Backend Technologies",
];

const blogTopicsList = document.getElementById("blogTopics");

function displayBlogTopics() {
  blogTopics.forEach((topic) => {
    const li = document.createElement("li");
    li.textContent = topic;
    blogTopicsList.appendChild(li);
  });
}

displayBlogTopics();
