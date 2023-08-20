document.addEventListener("DOMContentLoaded", function() {
    const keywords = ["restful api", "java", "python", "aws", "ec2", "docker", "sql", "azure", "spring", "s3", "dynamodb", "RESTful"];

    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi"); // Using 'gi' for global, case-insensitive matching
        document.body.innerHTML = document.body.innerHTML.replace(regex, '<span class="highlight">$1</span>');
    });

    // Regular expression to match numbers
    const numberRegex = /\b\d+\b/g;

    // Highlight numbers in the "highlights" section
    const highlightsContent = document.querySelector("#highlights").innerHTML;
    const newHighlightsContent = highlightsContent.replace(numberRegex, '<span class="number-highlight">$&</span>');
    document.querySelector("#highlights").innerHTML = newHighlightsContent;

    // Highlight numbers in the "achievements" within "job" section
    const achievementsLists = document.querySelectorAll("#professional-experience .job .achievements");
    achievementsLists.forEach(achievements => {
        const items = achievements.querySelectorAll("li");
        items.forEach(item => {
            item.innerHTML = item.innerHTML.replace(numberRegex, '<span class="number-highlight">$&</span>');
        });
    });
});
