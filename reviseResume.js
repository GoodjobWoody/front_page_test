//
document.addEventListener("DOMContentLoaded", function () {
  const mainSection = document.body; // We'll attach the listener to the body to cover all sections

  mainSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("tailorResumeBtn")) {
      handoleTailorResumeBtn();
    } else if (event.target.classList.contains("reviseResumeBtn")) {
      handleReviseResumeBtn();
    }
  });
});
//   .getElementById("tailorResumeBtn")
//   .addEventListener("click", function () {
//     document.getElementById("jdModal").style.display = "block";
//   });

function handleReviseResumeBtn() {
  const jobDescription = document.getElementById("jdTextarea").value;

  // Send a message to the parent window (content.js) with the job description
  alert(jobDescription);

  alert(window.resumeData);

  const resumeRevisePayload = {
    resumeData: window.resumeData,
    jobDescription: jobDescription,
  };

  window.parent.postMessage(
    {
      action: "tailorResumeBasedOnJd",
      data: resumeRevisePayload,
    },
    "*"
  );

  document.getElementById("jdModal").style.display = "none";
}

function handoleTailorResumeBtn() {
  document.getElementById("jdModal").style.display = "block";
}
