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
  document.querySelector(".highlighted-resume #name").innerText =
    resumeData.name;
  document.querySelector(".highlighted-resume #phone").innerText =
    resumeData.contact.phone;
  document.querySelector(".highlighted-resume #email").innerText =
    resumeData.contact.email;
  document.querySelector(".highlighted-resume #location").innerText =
    resumeData.contact.location;
  document.querySelector(".highlighted-resume #linkedin").innerText =
    resumeData.contact.linkedin;

  // Populate Highlights
  const highlightsContainer = document.querySelector(
    ".highlighted-resume #highlights ul"
  );
  resumeData.highlights.forEach((highlight) => {
    const listItem = document.createElement("li");
    listItem.innerText = highlight;
    highlightsContainer.appendChild(listItem);
  });

  // Populate Work Experience
  const workExperienceContainer = document.querySelector(
    ".highlighted-resume #professional-experience"
  );
  resumeData.workExperience.forEach((experience) => {
    const experienceDiv = document.createElement("div");
    experienceDiv.innerHTML = `
          <h3>${experience.company} - ${experience.position}</h3>
          <p>${experience.location} | ${experience.startDate} - ${
      experience.endDate
    }</p>
          <ul>
              ${experience.responsibilities
                .map((responsibility) => `<li>${responsibility}</li>`)
                .join("")}
          </ul>
      `;
    workExperienceContainer.appendChild(experienceDiv);
  });

  // Populate Education
  const educationContainer = document.querySelector(
    ".highlighted-resume #education"
  );
  resumeData.education.forEach((education) => {
    const educationDiv = document.createElement("div");
    educationDiv.innerHTML = `
          <h3>${education.university} - ${education.degree}</h3>
          <p>${education.location} | ${education.startDate} - ${education.endDate}</p>
      `;
    educationContainer.appendChild(educationDiv);
  });

  // Handle References
  if (resumeData.referencesAvailable) {
    document.querySelector(".highlighted-resume #reference h2").innerText =
      "References available upon request.";
  }
}
