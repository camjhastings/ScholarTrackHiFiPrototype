const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stops page refresh

  // Get form data
  const formData = new FormData(form);
  var logged = 0;
  const email = formData.get("username");
  const password = formData.get("password");
  const str = localStorage.getItem("valid-credentials");
  if (str == null) str == " | , |" ;
  const arr = str.split(",");
  console.log("Valid-Cred Array: " + arr);
  arr.forEach((s, index) => {
    cred = s.split("|");
    if (cred[0] == email && cred[1] == password) {
      logged = 1;
    }
  });

  if (logged) {
    localStorage.setItem("username", email);
    localStorage.setItem("password", password);
    window.location.href = "survey.html"; // successful login
  } else {
    alert("Incorrect username or password");
  }


  console.log(email, password);
});
