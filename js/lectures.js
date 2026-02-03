// lectures.js - NEW FILE
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    loadLectures();
  });

  const subjectInput = document.getElementById("lecSubject");
  const nameInput = document.getElementById("lecName");
  const durationInput = document.getElementById("lecDuration");
  const saveBtn = document.getElementById("saveLectureBtn");
  const listDiv = document.getElementById("lectureList");

  function loadLectures() {
    db.collection("lectures")
      .where("userId", "==", auth.currentUser.uid)
      .orderBy("created", "desc")
      .get()
      .then(snapshot => {
        listDiv.innerHTML = "";
        snapshot.forEach(doc => {
          const d = doc.data();
          listDiv.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:15px;margin:10px 0;border-radius:12px;">
              <b>${d.subject}</b> - ${d.name}
              <span style="float:right;color:#00f5ff">${d.duration} min</span>
            </div>
          `;
        });
      });
  }

  saveBtn.onclick = () => {
    if (!subjectInput.value || !nameInput.value || !durationInput.value) {
      alert("Please fill all fields!");
      return;
    }
    
    db.collection("lectures").add({
      subject: subjectInput.value,
      name: nameInput.value,
      duration: Number(durationInput.value),
      userId: auth.currentUser.uid,
      created: new Date()
    }).then(() => {
      subjectInput.value = "";
      nameInput.value = "";
      durationInput.value = "";
      loadLectures();
    });
  };
});
