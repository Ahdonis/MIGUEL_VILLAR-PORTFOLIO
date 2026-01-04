document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_ahq7pj8",
        "template_xrq9dvi",
        this
    ).then(() => {
        alert("Message sent successfully!");
        this.reset();
    }, (error) => {
        alert("Failed to send message. Please try again.");
        console.error(error);
    });
});

const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;

document.querySelectorAll(".matrix-section").forEach(section => {
    const canvas = section.querySelector(".matrix-canvas");
    const ctx = canvas.getContext("2d");

    let columns, drops;

    function resize() {
        canvas.width = section.clientWidth;
        canvas.height = section.clientHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
        ctx.fillStyle = "rgba(11, 25, 86, 0.12)";
        ctx.shadowColor = "#2074e1";
        ctx.shadowBlur = 8;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#2074e1";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i] += 0.3; 
        }


        requestAnimationFrame(draw);
    }

    draw();
});