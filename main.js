document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nightToggle");
    const body = document.body;

    // Check localStorage for saved mode
    if (localStorage.getItem("nightMode") === "true") {
        toggle.classList.add("active");
        body.classList.add("dark");
    }

    // Toggle the nighmode upon click of button
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        body.classList.toggle("dark");

        // Save the current mode in localStorage
        localStorage.setItem("nightMode", body.classList.contains("dark"));
    });
})