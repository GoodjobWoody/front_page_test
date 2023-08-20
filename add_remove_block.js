document.addEventListener("DOMContentLoaded", function () {
  const mainSection = document.body; // We'll attach the listener to the body to cover all sections

  mainSection.addEventListener("click", function (event) {
    // Handle addition
    if (
      event.target.classList.contains("add-job") ||
      event.target.classList.contains("add-project") ||
      event.target.classList.contains("add-education") ||
      event.target.classList.contains("add-highlight")
    ) {
      const sectionClass = event.target.classList.contains("add-job")
        ? ".job-template"
        : event.target.classList.contains("add-project")
        ? ".project-template"
        : event.target.classList.contains("add-education")
        ? ".education-template"
        : "li"; // For highlights

      // If the closest parent is 'li', clone the li
      if (event.target.closest("li")) {
        const li = event.target.closest("li");
        const clonedLi = li.cloneNode(true); // Deep clone
        li.parentNode.insertBefore(clonedLi, li.nextSibling);
      }
      // If the closest parent is a section (job, project, education), clone the entire block
      else if (event.target.closest(sectionClass)) {
        const section = event.target.closest(sectionClass);
        const clonedSection = section.cloneNode(true); // Deep clone
        section.parentNode.insertBefore(clonedSection, section.nextSibling);
      }
    }
    // Handle removal
    else if (
      event.target.classList.contains("remove-job") ||
      event.target.classList.contains("remove-project") ||
      event.target.classList.contains("remove-education") ||
      event.target.classList.contains("remove-highlight")
    ) {
      const sectionClass = event.target.classList.contains("remove-job")
        ? ".job-template"
        : event.target.classList.contains("remove-project")
        ? ".project-template"
        : event.target.classList.contains("remove-education")
        ? ".education-template"
        : "li"; // For highlights

      // If the "-" button's direct parent is an 'li', remove the 'li'
      if (event.target.parentElement.tagName === "LI") {
        const li = event.target.parentElement;
        if (li.parentNode.querySelectorAll("li").length > 1) {
          // Ensure at least one block remains for highlights
          li.parentNode.removeChild(li);
        }
      }
      // If the "-" button is inside a section (job, project, education), remove the entire block
      else if (event.target.closest(sectionClass)) {
        const section = event.target.closest(sectionClass);
        section.parentNode.removeChild(section);
      }
    }
  });
});
