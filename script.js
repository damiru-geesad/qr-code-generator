const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
sizes.addEventListener('change',(e)=>{
    size = e.target.value;
});

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    generateQRCode();
});

function generateQRCode() {

    const text = qrText.value.trim();

    if (text === "") {
        alert("Please enter text or URL!");
        return;
    }

    // Remove previous QR code
    qrContainer.innerHTML = "";

    // Remove previous animation
    qrContainer.classList.remove("show");

    new QRCode(qrContainer, {
        text: text,
        width: Number(size),
        height: Number(size),
        colorLight: "#ffffff",
        colorDark: "#000000",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Restart animation
    void qrContainer.offsetWidth;

    qrContainer.classList.add("show");
}
downloadBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const qrImage = qrContainer.querySelector('img');
    const qrCanvas = qrContainer.querySelector('canvas');
    if(qrCanvas){
        const link = document.createElement('a');
        link.href = qrCanvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
    }else if(qrImage){
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qr-code.png';
        link.click();
    }
    else{
        alert("Please generate a QR code first!");
    }
});
