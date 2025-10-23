function initDashboard() {
  if (!localStorage.getItem("users")) localStorage.setItem("users", JSON.stringify([]));
  if (!localStorage.getItem("reports")) localStorage.setItem("reports", JSON.stringify([]));
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
  setTheme(localStorage.getItem("theme"));
  refreshDashboard();
}

// Navigation
function navigate(id, el) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
  document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("pageTitle").innerText = id.charAt(0).toUpperCase() + id.slice(1);
}

// Theme Menu
function toggleThemeMenu() {
  const menu = document.getElementById("themeMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
  document.getElementById("themeMenu").style.display = "none";
}

// Create User
function createUser() {
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  if (!username || !password) return alert("Enter all fields!");

  let users = JSON.parse(localStorage.getItem("users"));
  if (users.find(u => u.username === username)) return alert("Username exists!");
  
  users.push({ id: Date.now(), username, password, status: "active", createdAt: new Date().toISOString() });
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  refreshDashboard();
}

// Ban / Unban
function toggleBan(id) {
  let users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(u => u.id === id);
  if (user) user.status = user.status === "active" ? "banned" : "active";
  localStorage.setItem("users", JSON.stringify(users));
  refreshDashboard();
}

// Simulate Login
function simulateLogin() {
  const users = JSON.parse(localStorage.getItem("users"));
  const activeUsers = users.filter(u => u.status === "active");
  if (activeUsers.length === 0) return alert("No active users!");
  const user = activeUsers[Math.floor(Math.random() * activeUsers.length)];
  const reports = JSON.parse(localStorage.getItem("reports"));
  reports.push({ username: user.username, time: new Date().toLocaleString() });
  localStorage.setItem("reports", JSON.stringify(reports));
  refreshDashboard();
}

// Refresh UI
function refreshDashboard() {
  const users = JSON.parse(localStorage.getItem("users"));
  const reports = JSON.parse(localStorage.getItem("reports"));

  document.getElementById("totalUsers").innerText = users.length;
  const today = new Date();
  const newUsers = users.filter(u => today - new Date(u.createdAt) < 86400000);
  document.getElementById("todayUsers").innerText = newUsers.length;
  document.getElementById("loginCount").innerText = reports.length;

  const table = document.getElementById("userTable");
  table.innerHTML = "";
  users.forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${u.username}</td>
        <td>${u.status}</td>
        <td>${new Date(u.createdAt).toLocaleDateString()}</td>
        <td><button class="btn" onclick="toggleBan(${u.id})">${u.status === "active" ? "Ban" : "Unban"}</button></td>
      </tr>`;
  });

  const list = document.getElementById("reportList");
  list.innerHTML = "";
  reports.slice().reverse().forEach(r => {
    list.innerHTML += `<div class="report-item">${r.username} logged in at ${r.time}</div>`;
  });
}
