// Existing logic for opening the modal
document
  .getElementById("reviseResumeBtn")
  .addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "openModal" });
        }
      );
    });
  });

// Set the worker source for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdf.worker.js");

// New logic for handling file upload
document
  .getElementById("uploadButton")
  .addEventListener("click", handleFileUpload);

function handleFileUpload() {
  const fileInput = document.getElementById("resumeUpload");
  const file = fileInput.files[0];
  if (file) {
    // Further processing based on file type
    if (file.type === "application/pdf") {
      parsePDF(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      parseDocx(file);
    } else {
      alert("Unsupported file type.");
    }
  } else {
    alert("Please select a file first.");
  }
}

function parsePDF(file) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let typedArray = new Uint8Array(event.target.result);
    pdfjsLib.getDocument({ data: typedArray }).promise.then(function (pdf) {
      // Extract text from the PDF
      extractTextFromPDF(pdf);
    });
  };
  reader.readAsArrayBuffer(file);
}

function extractTextFromPDF(pdf) {
  let totalPages = pdf.numPages;
  let allTextPromises = [];
  for (let i = 1; i <= totalPages; i++) {
    allTextPromises.push(pdf.getPage(i).then(extractPageText));
  }
  Promise.all(allTextPromises).then(function (pagesText) {
    let resumeText = pagesText.join(" ");
    // Convert this text to JSON or use as needed
  });
}

function extractPageText(page) {
  return page.getTextContent().then(function (textContent) {
    return textContent.items
      .map(function (item) {
        return item.str;
      })
      .join(" ");
  });
}

function parseDocx(file) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let arrayBuffer = event.target.result;
    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer })
      .then(displayResult)
      .catch(handleError);
  };
  reader.readAsArrayBuffer(file);
}

function displayResult(result) {
  let html = result.value; // The generated HTML
  // Convert this HTML to JSON or use as needed
}

function handleError(err) {
  console.log(err);
  alert("Error parsing the document.");
}

// Additional functions for handling the parsed data, converting to JSON, and populating the editable resume area will also be added here.
