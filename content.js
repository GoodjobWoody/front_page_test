window.addEventListener("message", function (event) {
  console.log(event.data);
  if (event.data.action === "editabelResumePopulationComplete") {
    // Show the resume modal
    const resumeModal = document.getElementById("resumeModal");
    if (resumeModal) {
      resumeModal.style.display = "block";
    }
  } else if (event.data.action === "tailorResumeBasedOnJd") {
    alert("Tailoring resume based on JD");
    console.log(event.data.data);
    // send data to backend api
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
