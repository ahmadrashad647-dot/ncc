// =======================
// TOGGLE STATE
// =======================
let isSignupMode = false;

const toggle = document.getElementById("modeToggle");
const loginText = document.getElementById("loginText");
const signupText = document.getElementById("signupText");
const confirmGroup = document.getElementById("confirmPasswordGroup");
const submitBtn = document.getElementById("submitBtn");

// Make toggle clickable
toggle.style.cursor = "pointer";

toggle.addEventListener("click", () => {
  isSignupMode = !isSignupMode;

  toggle.classList.toggle("active");
  loginText.classList.toggle("active");
  signupText.classList.toggle("active");

  if (isSignupMode) {
    confirmGroup.style.display = "block";
    submitBtn.textContent = "Create Account";
  } else {
    confirmGroup.style.display = "none";
    submitBtn.textContent = "Sign In";
  }
});


// =======================
// FORM SUBMIT
// =======================
document.getElementById("authForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // -------- CREATE ACCOUNT MODE --------
  if (isSignupMode) {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        alert("Account created successfully");
        window.location.href = "dashboard.html";
      })
      .catch(err=>{

        if (err.code === "auth/email-already-in-use") {
          alert("Already account created, please login to continue");
        } else {
          alert("Unable to create account");
        }

      });

  }

  // -------- LOGIN MODE --------
  else {

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(()=>{
        alert("Login successful");
        window.location.href = "dashboard.html";
      })
      .catch(err=>{

        if (err.code === "auth/user-not-found") {
          alert("Please create new account");
        }
        else if (err.code === "auth/wrong-password") {
          alert("Invalid credentials");
        }
        else {
          alert("Login failed");
        }

      });

  }

});
