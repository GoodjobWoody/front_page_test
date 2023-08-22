window.addEventListener("message", function (event) {
  if (event.data.action === "editabelResumePopulationComplete") {
    // Show the resume modal
    const resumeModal = document.getElementById("resumeModal");
    if (resumeModal) {
      resumeModal.style.display = "block";
    }
  }
});

function injectModal() {
  // Check if modal already exists
  if (document.getElementById("resumeModal")) {
    document.getElementById("resumeModal").style.display = "block";
    return;
  }

  // Check if the modal is already injected

  // Create modal
  const modal = document.createElement("div");
  modal.id = "resumeModal";
  modal.innerHTML = `
          <span class="close">&times;</span>
          <div class="modal-content">
              <iframe id="resumeFrame" src="${chrome.runtime.getURL(
                "resume.html"
              )}" frameborder="0"></iframe>
          </div>
      `;

  // Append modal to body
  document.body.appendChild(modal);

  // Show modal
  modal.style.display = "none";

  // Close modal on 'x' click
  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });
}

// No need to fetch the content of resume.html anymore
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openModal") {
    injectModal();
  } else if (message.action === "injectModal") {
    injectModal();
  } else if (message.action === "populateAndDisplayModal") {
    // populateAndDisplayModal(message.data);
    // send message to iframe
    // Send message to iframe
    const iframe = document.querySelector("#resumeModal iframe");
    console.log(iframe);
    if (iframe) {
      iframe.contentWindow.postMessage(
        {
          action: "populateEditableResumeAndDisplayModal",
          data: message.data,
        },
        "*"
      );
    }
  }
});

function populateAndDisplayModal(resumeData) {
  // let iframe = document.getElementById("resumeFrame");
  // if (!iframe) console.error("Iframe not found");
  // let document = iframe.contentDocument || iframe.contentWindow.document;
  // Personal Info

  // const resumeModal = document.querySelector("#resumeModal");
  // console.log(resumeModal);

  resumeModal.querySelector(
    ".editable-resume #template-personal-info span:nth-child(1)"
  ).textContent = `Name: ${resumeData.name}`;
  resumeModal.querySelector(
    ".editable-resume #template-personal-info span:nth-child(2)"
  ).textContent = `Phone: ${resumeData.contact.phone}`;
  resumeModal.querySelector(
    ".editable-resume #template-personal-info span:nth-child(3)"
  ).textContent = `Email: ${resumeData.contact.email}`;
  resumeModal.querySelector(
    ".editable-resume #template-personal-info span:nth-child(4)"
  ).textContent = `Location: ${resumeData.contact.location}`;
  resumeModal.querySelector(
    ".editable-resume #template-personal-info span:nth-child(5)"
  ).textContent = `LinkedIn: ${resumeData.contact.linkedin}`;

  // Highlights
  const highlightsEditableContainer = resumeModal.querySelector(
    ".editable-resume #template-highlights ul"
  );
  highlightsEditableContainer.innerHTML = ""; // Clear existing highlights
  resumeData.highlights.forEach((highlight) => {
    const li = document.createElement("li");
    li.innerHTML = `<button class="add-highlight">+</button><span contenteditable="true">${highlight}</span><button class="remove-highlight">-</button>`;
    highlightsEditableContainer.appendChild(li);
  });

  // Work Experience
  const workExperienceContainer = resumeModal.querySelector(
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
  const projectExperienceContainer = resumeModal.querySelector(
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
  const educationContainer = resumeModal.querySelector(
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

  // Hide the loader and display the modal

  const modal = document.getElementById("resumeModal");
  if (modal) modal.style.display = "block";
}
