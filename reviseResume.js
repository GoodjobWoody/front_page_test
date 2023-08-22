document
  .getElementById("tailorResumeBtn")
  .addEventListener("click", function () {
    document.getElementById("jdModal").style.display = "block";
  });

document
  .getElementById("reviseResumeBtn")
  .addEventListener("click", function () {
    const jobDescription = document.getElementById("jdTextarea").value;

    // Send a message to the parent window (content.js) with the job description

    const resumeRevisePayload = {
      resumeData: window.resumeData,
      jobDescription: jobDescription,
    };

    window.parent.postMessage(
      {
        action: "tailorResumeBasedOnJd",
        resumeRevisePayload: resumeRevisePayload,
      },
      "*"
    );

    document.getElementById("jdModal").style.display = "none";
  });
