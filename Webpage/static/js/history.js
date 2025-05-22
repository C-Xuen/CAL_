// 获取本地记录
function getHistoryFromLocalStorage() {
    const history = localStorage.getItem('识别记录');
    return history ? JSON.parse(history) : [];
}

// 保存到本地
function saveHistoryToLocalStorage(history) {
    localStorage.setItem('识别记录', JSON.stringify(history));
}

// 渲染历史记录
function renderHistory() {
    const history = getHistoryFromLocalStorage();
    const historyList = document.getElementById("history-list");
    if (!historyList) return;

    if (history.length === 0) {
        historyList.innerHTML = "<p>暂无识别记录。</p>";
        return;
    }

    historyList.innerHTML = ""; // 清空旧内容

    history.forEach((record, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "history-item";

        itemDiv.innerHTML = `
            <img src="${record.image}" alt="识别图片">
            <div class="history-info">
                <h3>${record.name}</h3>
                <p>热量: ${record.calories || '未知'} kcal</p>
                <p>时间: ${record.timestamp}</p>
            </div>
        `;
        historyList.appendChild(itemDiv);
    });
}

// 添加一条记录（可从 Identify 页面调用）
function addRecordToHistory(imageDataUrl, dishName, calories) {
    const history = getHistoryFromLocalStorage();

    const newRecord = {
        image: imageDataUrl,
        name: dishName,
        calories: calories,
        timestamp: new Date().toLocaleString()
    };

    history.unshift(newRecord); // 插入最前
    saveHistoryToLocalStorage(history);
    renderHistory();
}

// 清除所有记录
function clearHistory() {
    if (confirm("确定要清空所有历史记录吗？")) {
        localStorage.removeItem('识别记录');
        renderHistory();
    }
}

// 页面加载时渲染
window.onload = renderHistory;

// 导出函数供其他页面调用（如 main.js）
window.addRecordToHistory = addRecordToHistory;