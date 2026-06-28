document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Submitted Successfully!");

    this.reset();
});