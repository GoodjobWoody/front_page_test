function downloadPDF() {
    var element = document.getElementById('resume');
    var opt = {
        margin: 10,
        filename: 'MyResume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}
