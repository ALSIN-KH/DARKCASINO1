// Translation texts for all UI elements
const translations = {
  en: {
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    login: "Login",
    fillAllFields: "⚠️ Please fill all fields!",
    invalidCredentials: "❌ Invalid username or password!",
    banned: "🚫 You are banned from accessing this site.",
    loginSuccess: "✅ Login successful!",
    notAdmin: "Not an admin? ",
    requestAccess: "Request access"
  },
  km: {
    username: "ឈ្មោះអ្នកប្រើ",
    usernamePlaceholder: "បញ្ចូលឈ្មោះអ្នកប្រើរបស់អ្នក",
    password: "ពាក្យសម្ងាត់",
    passwordPlaceholder: "បញ្ចូលពាក្យសម្ងាត់របស់អ្នក",
    login: "ចូល",
    fillAllFields: "⚠️ សូមបំពេញគ្រប់វាល!",
    invalidCredentials: "❌ ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!",
    banned: "🚫 អ្នកត្រូវបានហាមឃាត់មិនអាចចូលប្រើបាន។",
    loginSuccess: "✅ ចូលបានដោយជោគជ័យ!",
    notAdmin: "មិនមែនជាអ្នកគ្រប់គ្រង? ",
    requestAccess: "ស្នើសុំការចូលប្រើ"
  },
  vi: {
    username: "Tên đăng nhập",
    usernamePlaceholder: "Nhập tên đăng nhập của bạn",
    password: "Mật khẩu",
    passwordPlaceholder: "Nhập mật khẩu của bạn",
    login: "Đăng nhập",
    fillAllFields: "⚠️ Vui lòng điền tất cả các trường!",
    invalidCredentials: "❌ Tên đăng nhập hoặc mật khẩu không đúng!",
    banned: "🚫 Bạn bị cấm truy cập trang này.",
    loginSuccess: "✅ Đăng nhập thành công!",
    notAdmin: "Không phải quản trị viên? ",
    requestAccess: "Yêu cầu truy cập"
  },
  zh: {
    username: "用户名",
    usernamePlaceholder: "请输入您的用户名",
    password: "密码",
    passwordPlaceholder: "请输入您的密码",
    login: "登录",
    fillAllFields: "⚠️ 请填写所有字段！",
    invalidCredentials: "❌ 用户名或密码无效！",
    banned: "🚫 您被禁止访问此网站。",
    loginSuccess: "✅ 登录成功！",
    notAdmin: "不是管理员？",
    requestAccess: "请求访问"
  }
};

// Current language default
let currentLang = "en";

// Switch language and update UI text
function setLanguage(lang) {
  currentLang = lang;

  document.getElementById("labelUsername").textContent = translations[lang].username;
  document.getElementById("loginUsername").placeholder = translations[lang].usernamePlaceholder;

  document.getElementById("labelPassword").textContent = translations[lang].password;
  document.getElementById("loginPassword").placeholder = translations[lang].passwordPlaceholder;

  document.getElementById("btnLogin").textContent = translations[lang].login;

  document.getElementById("loginMessage").textContent = ""; // Clear messages

  // Update footer text and link
  const footer = document.getElementById("footerText");
  footer.innerHTML = `${translations[lang].notAdmin} <a href="#" onclick="alert('${translations[lang].requestAccess}')">${translations[lang].requestAccess}</a>`;
}

// Login function with translated messages
function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMessage");

  if (!username || !password) {
    msg.textContent = translations[currentLang].fillAllFields;
    msg.style.color = "orange";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    msg.textContent = translations[currentLang].invalidCredentials;
    msg.style.color = "red";
    return;
  }

  if (user.status === "banned") {
    msg.textContent = translations[currentLang].banned;
    msg.style.color = "red";
    return;
  }

  msg.textContent = translations[currentLang].loginSuccess;
  msg.style.color = "limegreen";

  const reports = JSON.parse(localStorage.getItem("reports")) || [];
  reports.push({
    username: user.username,
    time: new Date().toLocaleString(),
  });
  localStorage.setItem("reports", JSON.stringify(reports));

  setTimeout(() => {
    alert(`Welcome ${user.username}! Redirecting to the main site...`);
    window.location.href = "https://dg-88-agent.vercel.app/";
  }, 1000);
}

// Setup event listeners for language buttons after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang); // default

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });
});

