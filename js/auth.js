document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");

  let isSignup = false;

  const toggle = document.getElementById("modeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      isSignup = !isSignup;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (isSignup) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Account Created!");
          window.location.href = "dashboard.html";
        })
        .catch(err => alert(err.message));
    } 
    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Login Success!");
          window.location.href = "dashboard.html";
        })
        .catch(err => alert(err.message));
    }

  });

});
