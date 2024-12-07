// 获取相关元素
const registerBtn = document.getElementById('register-btn');
const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');
const registerError = document.getElementById('register-error');

// 获取用户数据
let users = JSON.parse(localStorage.getItem('users')) || [];

// 注册按钮点击事件
registerBtn.addEventListener('click', () => {
  const username = registerUsernameInput.value.trim();
  const password = registerPasswordInput.value.trim();

  if (!username || !password) {
    registerError.textContent = 'Please fill in both fields.';
    return;
  }

  // 检查是否已存在相同用户名
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    registerError.textContent = 'Username already exists.';
  } else {
    const newUser = {
      username: username,
      password: password,
      balance: 0.00
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // 保存新注册的用户
    // 保存用户登录状态
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    // 注册成功后跳转到主页
    window.location.href = 'index.html'; 
  }
});