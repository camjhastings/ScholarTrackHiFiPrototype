document.addEventListener("DOMContentLoaded", () => {
    /* Prevent multiple times submitting same form
    if (localStorage.getItem("userProfile")) {
    window.location.href = "dashboard.html";
    }*/
    document.getElementById('id01').style.display='none'; // for popup
    
    if(localStorage.getItem("location") == null) {
      document.getElementById('id01').style.display='flex'; // for popup
    } else if(localStorage.getItem("location") == "false") {
        document.getElementById('id01').style.display='flex'; // for popup
    }

  const form = document.getElementById("location-access");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (form.location.value === "yes") {
        localStorage.setItem("location",true);
    } else {
        localStorage.setItem("location",false);
    }
    document.getElementById('id01').style.display='none'; // for popup

  });
});
