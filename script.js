// 获取相关元素
const watchAdsBtn = document.getElementById('watch-ads-btn');
const balanceElement = document.getElementById('balance');
const withdrawBtn = document.getElementById('withdraw-btn');
const withdrawModal = document.getElementById('withdraw-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const confirmWithdrawBtn = document.getElementById('confirm-withdraw-btn');

// 获取当前用户数据
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// 初始化余额为0.00，如果有用户数据，则获取余额
let balance = currentUser ? currentUser.balance : 0.00;
balanceElement.textContent = `$${balance.toFixed(2)}`; // 初始时显示余额

// 点击“看广告”按钮增加余额
watchAdsBtn.addEventListener('click', () => {
  balance += 1;  // 每次点击增加 1
  updateBalance();  // 更新余额
});

// 点击“提现”按钮打开弹窗
withdrawBtn.addEventListener('click', () => {
  withdrawModal.style.display = 'flex';  // 让弹窗显示
});

// 点击“确认提现”按钮
confirmWithdrawBtn.addEventListener('click', () => {
  const withdrawAmount = parseFloat(document.getElementById('withdraw-amount').value);
  if (withdrawAmount <= balance && withdrawAmount > 0) {
    balance -= withdrawAmount;  // 扣除提现金额
    updateBalance();  // 更新余额
    const transactionId = Math.random().toString(36).substring(2, 15); // 生成一个随机的交易 ID
    document.getElementById('transaction-id').textContent = `Transaction ID: ${transactionId}`;
    document.getElementById('withdraw-amount').value = '';  // 清空输入框
  } else {
    alert('Invalid amount!');
  }
});

// 点击“X”按钮关闭弹窗
closeModalBtn.addEventListener('click', () => {
  withdrawModal.style.display = 'none';
});

// 点击弹窗外部区域关闭弹窗
window.addEventListener('click', (event) => {
  if (event.target === withdrawModal) {
    withdrawModal.style.display = 'none';
  }
});

// 更新余额并保存到本地存储
function updateBalance() {
  balanceElement.textContent = `$${balance.toFixed(2)}`;  // 更新显示的余额
  if (currentUser) {
    currentUser.balance = balance;  // 更新当前用户的余额
    localStorage.setItem('currentUser', JSON.stringify(currentUser));  // 保存到本地存储
  }
}