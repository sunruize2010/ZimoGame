// 获取相关元素
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('auth-error');

// 获取用户数据
let users = JSON.parse(localStorage.getItem('users')) || [];

// 登录按钮点击事件
loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    authError.textContent = 'Please fill in both fields.';
    return;
  }

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // 保存用户登录状态
    localStorage.setItem('currentUser', JSON.stringify(user));
    // 登录成功后跳转到主页
    window.location.href = 'index.html'; 
  } else {
    authError.textContent = 'Invalid username or password.';
  }
});