document.addEventListener("DOMContentLoaded", function () {
    let whatsappButton = document.querySelector(".whatsapp-button");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            whatsappButton.style.right = "0px";
            whatsappButton.style.bottom = "120px";
        } else {
            whatsappButton.style.right = "-220px";
            whatsappButton.style.bottom = "-220px";
        }
    });

});