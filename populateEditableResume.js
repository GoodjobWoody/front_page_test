function populateEditableResume(resumeData) {
  // Personal Info
  document.querySelector(
    ".editable-resume #template-personal-info span:nth-child(1)"
  ).textContent = `Name: ${resumeData.name}`;
  document.querySelector(
    ".editable-resume #template-personal-info span:nth-child(3)"
  ).textContent = `Phone: ${resumeData.contact.phone}`;
  document.querySelector(
    ".editable-resume #template-personal-info span:nth-child(5)"
  ).textContent = `Email: ${resumeData.contact.email}`;
  document.querySelector(
    ".editable-resume #template-personal-info span:nth-child(7)"
  ).textContent = `Location: ${resumeData.contact.location}`;
  document.querySelector(
    ".editable-resume #template-personal-info span:nth-child(9)"
  ).textContent = `LinkedIn: ${resumeData.contact.linkedin}`;

  // Highlights
  const highlightsEditableContainer = document.querySelector(
    ".editable-resume #template-highlights ul"
  );
  highlightsEditableContainer.innerHTML = ""; // Clear existing highlights
  resumeData.highlights.forEach((highlight) => {
    const li = document.createElement("li");
    li.innerHTML = `<button class="add-highlight">+</button><span contenteditable="true">${highlight}</span><button class="remove-highlight">-</button>`;
    highlightsEditableContainer.appendChild(li);
  });

  // Work Experience
  const workExperienceContainer = document.querySelector(
    ".editable-resume #template-work-experience"
  );
  workExperienceContainer.innerHTML = "<h2>Work Experience</h2>"; // Clear existing work experiences
  resumeData.workExperience.forEach((job) => {
    const div = document.createElement("div");
    div.className = "job-template";
    div.innerHTML = `
            <h3><button class="add-job">+</button>${job.position} at ${
      job.company
    }<button class="remove-job">-</button></h3>
            <p><strong>Location:</strong> <span contenteditable="true">${
              job.location
            }</span> | <strong>Duration:</strong> <span contenteditable="true">${
      job.startDate
    }</span> - <span contenteditable="true">${job.endDate}</span></p>
            <ul>${job.responsibilities
              .map(
                (responsibility) =>
                  `<li><button class="add-job">+</button><span contenteditable="true">${responsibility}</span><button class="remove-job">-</button></li>`
              )
              .join("")}</ul>
        `;
    workExperienceContainer.appendChild(div);
  });

  // Project Experience
  const projectExperienceContainer = document.querySelector(
    ".editable-resume #template-project-experience"
  );
  projectExperienceContainer.innerHTML = "<h2>Project Experience</h2>"; // Clear existing project experiences
  resumeData.projectExperience.forEach((project) => {
    const div = document.createElement("div");
    div.className = "project-template";
    div.innerHTML = `
            <h3 contenteditable="true"><button class="add-project">+</button>${
              project.position
            } at ${
      project.company
    }<button class="remove-project">-</button></h3>
            <p><strong>Role:</strong> <span contenteditable="true">${
              project.position
            }</span></p>
            <ul>${project.responsibilities
              .map(
                (responsibility) =>
                  `<li><button class="add-project">+</button><span contenteditable="true">${responsibility}</span><button class="remove-project">-</button></li>`
              )
              .join("")}</ul>
        `;
    projectExperienceContainer.appendChild(div);
  });

  // Education
  const educationContainer = document.querySelector(
    ".editable-resume #template-education"
  );
  educationContainer.innerHTML = "<h2>Education</h2>"; // Clear existing education
  resumeData.education.forEach((education) => {
    const div = document.createElement("div");
    div.className = "education-template";
    div.innerHTML = `
            <h3 contenteditable="true"><button class="add-education">+</button>${education.degree}, ${education.fieldOfStudy} at ${education.university}<button class="remove-education">-</button></h3>
            <p><strong>Location:</strong> <span contenteditable="true">${education.location}</span> | <strong>Duration:</strong> <span contenteditable="true">${education.startDate}</span> - <span contenteditable="true">${education.endDate}</span></p>
        `;
    educationContainer.appendChild(div);
  });
}

export { populateEditableResume };
