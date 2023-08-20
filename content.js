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
            )}"></iframe>
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
        /* ... (other styles) ... */
    `;
  document.head.appendChild(style);

  // Show modal
  modal.style.display = "block";

  // Close modal on 'x' click
  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openModal") {
    injectModal();
  }
});
