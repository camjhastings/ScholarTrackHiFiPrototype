const form = document.getElementById("create-form");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // stops page refresh

  // Get form data
  const formData = new FormData(form);

  const email = formData.get("username");
  const password = formData.get("password");
  if(localStorage.getItem("valid-credentials") == null) {
    localStorage.setItem("valid-credentials",email + "|" + password);
  } else {
    localStorage.setItem("valid-credentials", localStorage.getItem("valid-credentials") + "," + email + "|" + password);
  }
    window.location.href = "index.html";

  console.log(email, password);
});
