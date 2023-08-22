// Existing logic for opening the modal
import { populateEditableResume } from "./populateEditableResume.js";

const API_ENDPOINTS = {
  ADD_RESUME: "https://addresume-yuah7ub4ta-uc.a.run.app",
  GET_RESUME: "https://getresume-yuah7ub4ta-uc.a.run.app",
  CONVERT_DOC_TO_JSON: "https://convertdoctojson-yuah7ub4ta-uc.a.run.app",
};

const CLOUD_FUNCTION_TOKEN = "abc";

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
    console.log(resumeText); // Log the extracted text to the console
    const resumeJsonContent = convertDocToJson({ content: resumeText });
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
  let html = result.value;
  console.log(html); // Log the extracted HTML to the console
}

function handleError(err) {
  console.log(err);
  alert("Error parsing the document.");
}

function convertDocToJson(data) {
  fetch(API_ENDPOINTS.CONVERT_DOC_TO_JSON, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + CLOUD_FUNCTION_TOKEN,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error("Error sending data to API:", error);
    });
}
