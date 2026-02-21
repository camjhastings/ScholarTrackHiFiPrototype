document.addEventListener("DOMContentLoaded", () => {
    /* Prevent multiple times submitting same form
    if (localStorage.getItem("userProfile")) {
    window.location.href = "dashboard.html";
    }*/

  const form = document.getElementById("user-survey");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const profile = {
      attention: form.attention.value === "yes",
      anxiety: form.anxiety.value === "yes",
      motivation: form.motivation.value === "yes",
      depression: form.depression.value === "yes"
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));

    // send user to habits page
    window.location.href = "dashboard.html";
  });
});

function changeColors() {
  
}