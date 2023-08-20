function injectModal() {
  // Check if modal already exists
  if (document.getElementById("resumeModal")) return;

  // Create modal
  const modal = document.createElement("div");
  modal.id = "resumeModal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <iframe id="resumeFrame" src="${chrome.runtime.getURL(
              "resume.html"
            )}" frameborder="0"></iframe>
        </div>
    `;

  // Append modal to body
  document.body.appendChild(modal);

  // Add styles for modal (you can expand this with your previous styles)
  const style = document.createElement("style");
  style.textContent = `
  #resumeModal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      z-index: 10000;
  }
  #resumeModal .modal-content {
      width: 90%;  /* Adjust this value as needed */
      height: 80%; /* Adjust this value as needed */
      margin: auto;
      position: relative;
      background: white; /* Optional: to give the modal content a background */
      overflow: auto;    /* To handle content that might overflow */
  }
  #resumeModal iframe {
      width: 100%;
      height: 100%;
      border: none;
  }
`;
  document.head.appendChild(style);

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
