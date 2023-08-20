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
      width: 93%;  /* Adjust this value as needed */
      height: 90%; /* Adjust this value as needed */
      margin: auto;
      margin-top: 15px;
      position: relative;
      background: white; /* Optional: to give the modal content a background */
      overflow: hidden;  /* Prevents the outer container from scrolling */
  }
  #resumeModal iframe {
      width: 100%;
      height: 100%;
      border: none;
      overflow-x: hidden; /* Hides horizontal scrollbar */
      overflow-y: auto; /* Hides vertical scrollbar */
  }
  .close {
    position: absolute;
    top: 10px;  /* Adjusted value */
    right: 10px; /* Adjusted value */
    cursor: pointer;
    background-color: #fff; /* White background for visibility */
    color: #000; /* Black text for visibility */
    padding: 5px; /* Some padding for better appearance */
    border-radius: 25%; /* Optional: to make it circular */
    z-index: 10001; /* Ensure it's above other elements */
}

    #resumeModal .modal-content, #resumeModal iframe {
        box-sizing: border-box; /* Include padding and borders in total width/height */
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
