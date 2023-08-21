document.addEventListener("DOMContentLoaded", function () {
  fetch("resume_sample.json")
    .then((response) => response.json())
    .then((resumeData) => populateData(resumeData))
    .catch((error) => {
      console.error("Error fetching resume data:", error);
    });
});

function populateData(resumeData) {
  // Populate Personal Information
  document.querySelector(".tailored-resume #name").innerText = resumeData.name;
  document.querySelector(".tailored-resume #phone").innerText =
    resumeData.contact.phone;
  document.querySelector(".tailored-resume #email").innerText =
    resumeData.contact.email;
  document.querySelector(".tailored-resume #location").innerText =
    resumeData.contact.location;
  document.querySelector(".tailored-resume #linkedin").innerText =
    resumeData.contact.linkedin;

  // Populate Highlights
  const highlightsContainer = document.querySelector(
    ".tailored-resume #highlights ul"
  );
  resumeData.highlights.forEach((highlight) => {
    const listItem = document.createElement("li");
    listItem.innerText = highlight;
    highlightsContainer.appendChild(listItem);
  });

  // Populate Work Experience
  const workExperienceContainer = document.querySelector(
    ".tailored-resume #professional-experience"
  );
  resumeData.workExperience.forEach((experience) => {
    const experienceDiv = document.createElement("div");
    experienceDiv.classList.add("job");

    const jobTitle = `${experience.position} at ${experience.company}`;
    const jobLocation = `<strong>Location:</strong> ${experience.location}`;
    const jobDuration = `<strong>Duration:</strong> ${experience.startDate} - ${experience.endDate}`;

    let responsibilitiesList = experience.responsibilities
      .map((responsibility) => `<li>${responsibility}</li>`)
      .join("");

    experienceDiv.innerHTML = `
        <h3>${jobTitle}</h3>
        <p>${jobLocation} | ${jobDuration}</p>
        <ul class="achievements">
            ${responsibilitiesList}
        </ul>
    `;
    workExperienceContainer.appendChild(experienceDiv);
  });

  // Populate Education
  const educationContainer = document.querySelector(
    ".tailored-resume #education"
  );
  resumeData.education.forEach((education) => {
    const educationDiv = document.createElement("div");
    educationDiv.classList.add("education-entry");

    const educationTitle = `${education.degree} at ${education.university}`;
    const educationLocation = `<strong>Location:</strong> ${education.location}`;
    const educationDuration = `<strong>Duration:</strong> ${education.startDate} - ${education.endDate}`;

    educationDiv.innerHTML = `
        <h3>${educationTitle}</h3>
        <p>${educationLocation} | ${educationDuration}</p>
    `;
    educationContainer.appendChild(educationDiv);
  });

  // Handle References
  if (resumeData.referencesAvailable) {
    document.querySelector(".tailored-resume #reference h2").innerText =
      "References available upon request.";
  }

  highlightKeywords();
}
