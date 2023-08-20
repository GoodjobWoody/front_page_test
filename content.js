function injectModal() {
  // Check if modal already exists
  if (document.getElementById("resumeModal")) {
    document.getElementById("resumeModal").style.display = "block";
    return;
  }

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
  modal.style.display = "block";

  // Close modal on 'x' click
  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });
}

// No need to fetch the content of resume.html anymore
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openModal") {
    injectModal();
  }
});
