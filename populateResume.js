document.addEventListener("DOMContentLoaded", function () {
  fetch("resume_sample.json")
    .then((response) => response.json())
    .then((resumeData) => populateData(resumeData))
    .catch((error) => {
      console.error("Error fetching resume data:", error);
    });
});

function populateData(resumeData) {
  // Sample JSON data (you would fetch this from your JSON file in a real scenario)

  // Populate Personal Information
  document.getElementById("name").innerText = resumeData.name;
  document.getElementById("phone").innerText = resumeData.contact.phone;
  document.getElementById("email").innerText = resumeData.contact.email;
  document.getElementById("location").innerText = resumeData.contact.location;
  document.getElementById("linkedin").innerText = resumeData.contact.linkedin;

  // Populate Highlights
  const highlightsContainer = document.getElementById("highlights");
  resumeData.highlights.forEach((highlight) => {
    const listItem = document.createElement("li");
    listItem.innerText = highlight;
    highlightsContainer.appendChild(listItem);
  });

  // Populate Work Experience
  const workExperienceContainer = document.getElementById("workExperience");
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
  const educationContainer = document.getElementById("education");
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
    document.getElementById("references").innerText =
      "References available upon request.";
  }
}
