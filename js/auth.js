// MODE STATE
let isSignupMode = false;

// Toggle UI
const modeToggle = document.getElementById("modeToggle");
const loginText = document.getElementById("loginText");
const signupText = document.getElementById("signupText");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const submitBtn = document.getElementById("submitBtn");

modeToggle.addEventListener("click", () => {
  isSignupMode = !isSignupMode;

  modeToggle.classList.toggle("active");
  loginText.classList.toggle("active");
  signupText.classList.toggle("active");

  if (isSignupMode) {
    confirmPasswordGroup.style.display = "block";
    submitBtn.textContent = "Create Account";
  } else {
    confirmPasswordGroup.style.display = "none";
    submitBtn.textContent = "Sign In";
  }
});

// FORM SUBMIT
document.getElementById("authForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // ---------- SIGNUP MODE ----------
  if (isSignupMode) {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert("Account created successfully");
        window.location.href = "dashboard.html";
      })
      .catch(error => {

        if (error.code === "auth/email-already-in-use") {
          alert("Account already exists. Switch to Login.");
        } else {
          alert(error.message);
        }

      });

  }

  // ---------- LOGIN MODE ----------
  else {

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Login successful");
        window.location.href = "dashboard.html";
      })
      .catch(error => {

        if (error.code === "auth/user-not-found") {
          alert("Account not found. Switch to Create Account.");
        } 
        else if (error.code === "auth/wrong-password") {
          alert("Wrong password");
        }
        else {
          alert(error.message);
        }

      });

  }

});
