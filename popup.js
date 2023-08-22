// Existing logic for opening the modal

const API_ENDPOINTS = {
  ADD_RESUME: "https://addresume-yuah7ub4ta-uc.a.run.app",
  GET_RESUME: "https://getresume-yuah7ub4ta-uc.a.run.app",
  CONVERT_DOC_TO_JSON: "https://convertdoctojson-yuah7ub4ta-uc.a.run.app",
};

const CLOUD_FUNCTION_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWZlN2E5YmRhNDZiYWU2ZWY5N2U0NmM5NWNkYTQ4OTEyZTU5NzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExODQ4MDc4MDM0OTk2NzczOTIwIiwiZW1haWwiOiJ3b29keS5jYXJlZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJtckVpVFhQMTlEdGxEeHF0ODBSMGJRIiwiaWF0IjoxNjkyNTgxNDc1LCJleHAiOjE2OTI1ODUwNzV9.icBD4Fk2vyl7AKVQX11Y3U3hS_UqYcjt1509kg_4shmNeD1qajWdrrf4SY9LW0c6sK7t1_VK17J6KB-pq0fil4oh1pzm1bs6oVEjDcmv7IMfoZ2fzn26H29CbLqqkssB4OgvEJ0L1YLLblH8PR123C-EdxvFJAY-U74fFCDvrPaY8IPvHnd3FyyGk4CVHIRqWMDlfB1W_0VjXUG0mkNmb-s8tWQs_idhHS_YLgR-4XzkZsPC9LJDcqMlsUiL3CTY_duh3QmKkpnlB79q_3YN5wuDNZcQBa6caTYfNS0G2lEHqKYgNFtVEwEHGkwc8hp_H5yuHeCA2BVM5sFbQsMBdA";

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
    const resumeJsonContent = convertDocToJson(resumeText);
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
