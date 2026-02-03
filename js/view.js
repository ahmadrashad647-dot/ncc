// view.js - FIXED
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    loadAnalytics();
  });

  function loadAnalytics() {
    const logsDiv = document.getElementById("logs");
    const totalTimeEl = document.getElementById("totalTime");
    const subjectTotalsDiv = document.getElementById("subjectTotals");
    const streakBox = document.getElementById("streakBox");
    const weeklyBox = document.getElementById("weeklyBox");

    db.collection("dailyEntries")
      .where("userId", "==", auth.currentUser.uid)
      .get()
      .then(snapshot => {
        let totalMinutes = 0;
        let subjectMap = {};
        let todayTotal = 0;
        let dateSet = new Set();
        let thisWeekTotal = 0;
        
        const today = new Date().toDateString();
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        logsDiv.innerHTML = "";
        
        snapshot.forEach(doc => {
          const d = doc.data();
          const mins = Number(d.time) || 0;
          const entryDate = new Date(d.created);
          const dateStr = entryDate.toDateString();

          totalMinutes += mins;
          dateSet.add(dateStr);
          
          if (dateStr === today) todayTotal += mins;
          if (entryDate >= weekStart) thisWeekTotal += mins;
          
          // Subject totals
          subjectMap[d.subject] = (subjectMap[d.subject] || 0) + mins;
          
          // Logs
          logsDiv.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:12px;margin:8px 0;border-radius:8px;border-left:3px solid #00f5ff;">
              <b>${d.subject}</b> - ${d.chapter} <span style="float:right;color:#00f5ff">${mins} min</span>
            </div>
          `;
        });

        // Update UI
        totalTimeEl.innerText = todayTotal;
        
        // Subject breakdown
        subjectTotalsDiv.innerHTML = "";
        for (let subject in subjectMap) {
          subjectTotalsDiv.innerHTML += `
            <div style="display:flex;justify-content:space-between;padding:10px;background:rgba(255,255,255,0.05);margin:8px 0;border-radius:8px;">
              <span>${subject}</span>
              <span style="color:#00f5ff;font-weight:bold">${subjectMap[subject]} min</span>
            </div>
          `;
        }

        // Calculate streak
        let streak = 0;
        let check = new Date();
        while (true) {
          if (dateSet.has(check.toDateString())) {
            streak++;
            check.setDate(check.getDate() - 1);
          } else break;
        }
        streakBox.innerText = streak;

        // Weekly
        weeklyBox.innerText = thisWeekTotal;
      });
  }
});
