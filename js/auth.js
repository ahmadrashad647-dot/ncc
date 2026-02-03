// Firebase CDN
const firebaseConfig = {
  apiKey: "AIzaSyCrlP360Fpx-9tCyggJeoqLgkwnTlRTJ5o",
  authDomain: "ncc-project-3b0f1.firebaseapp.com",
  projectId: "ncc-project-3b0f1",
  storageBucket: "ncc-project-3b0f1.firebasestorage.app",
  messagingSenderId: "590441541895",
  appId: "1:590441541895:web:2a861830fcb60f09f655a2"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

loginBtn.onclick = () => {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  )
  .then(() => {
    alert("Login success");
    window.location.href = "dashboard.html";
  })
  .catch(err => alert(err.message));
};

signupBtn.onclick = () => {
  auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  )
  .then(() => alert("Account created"))
  .catch(err => alert(err.message));
};
