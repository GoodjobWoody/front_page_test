document.addEventListener("DOMContentLoaded", function () {
  const jobSection = document.getElementById("template-work-experience");

  jobSection.addEventListener("click", function (event) {
    // Handle addition
    if (event.target.classList.contains("add-job")) {
      // If the closest parent is 'li', clone the li
      if (event.target.closest("li")) {
        const li = event.target.closest("li");
        const clonedLi = li.cloneNode(true); // Deep clone
        li.parentNode.insertBefore(clonedLi, li.nextSibling);
      }
      // If the closest parent is 'job-template', clone the entire job block
      else if (event.target.closest(".job-template")) {
        const jobTemplate = event.target.closest(".job-template");
        const clonedJobTemplate = jobTemplate.cloneNode(true); // Deep clone
        jobTemplate.parentNode.insertBefore(
          clonedJobTemplate,
          jobTemplate.nextSibling
        );
      }
    }
    // Handle removal
    else if (event.target.classList.contains("remove-job")) {
      // If the "-" button's direct parent is an 'li', remove the 'li'
      if (event.target.parentElement.tagName === "LI") {
        const li = event.target.parentElement;
        li.parentNode.removeChild(li);
      }
      // If the "-" button is inside a '.job-template', remove the entire job block
      else if (event.target.closest(".job-template")) {
        const jobTemplate = event.target.closest(".job-template");
        jobTemplate.parentNode.removeChild(jobTemplate);
      }
    }
  });
});

// Add a new project block
document.querySelector(".add-project").addEventListener("click", function () {
  const projectTemplate = document
    .querySelector(".project-template")
    .cloneNode(true);
  document
    .getElementById("template-project-experience")
    .appendChild(projectTemplate);
});

// Remove the last project block
document
  .querySelector(".remove-project")
  .addEventListener("click", function () {
    const allProjects = document.querySelectorAll(".project-template");
    if (allProjects.length > 1) {
      // Ensure at least one block remains
      allProjects[allProjects.length - 1].remove();
    }
  });

// Add a new education block
document.querySelector(".add-education").addEventListener("click", function () {
  const educationTemplate = document
    .querySelector(".education-template")
    .cloneNode(true);
  document.getElementById("template-education").appendChild(educationTemplate);
});

// Remove the last education block
document
  .querySelector(".remove-education")
  .addEventListener("click", function () {
    const allEducations = document.querySelectorAll(".education-template");
    if (allEducations.length > 1) {
      // Ensure at least one block remains
      allEducations[allEducations.length - 1].remove();
    }
  });
