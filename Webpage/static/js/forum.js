// 获取 localStorage 中的帖子数据，若不存在则初始化为空数组
function getPostsFromLocalStorage() {
    const posts = localStorage.getItem('forumPosts');
    return posts ? JSON.parse(posts) : [];
}

// 将帖子保存到 localStorage
function savePostsToLocalStorage(posts) {
    localStorage.setItem('forumPosts', JSON.stringify(posts));
}

// 渲染帖子到页面
function renderPosts() {
    const posts = getPostsFromLocalStorage();
    const postsSection = document.querySelector("#posts");
    if (!postsSection) return;

    postsSection.innerHTML = "<h2>热门帖子</h2>"; // 清空原有内容

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>作者：${post.author || '匿名用户'} | 时间：${post.date}</small>
        `;
        postsSection.appendChild(postDiv);
    });
}

// 页面加载时渲染帖子
window.onload = function () {
    renderPosts();

    // 确保 DOM 加载完成后再绑定事件
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // 阻止默认提交行为

            const title = document.getElementById("title").value.trim();
            const content = document.getElementById("content").value.trim();

            if (!title || !content) {
                alert("标题和内容不能为空！");
                return;
            }

            const newPost = {
                title: title,
                content: content,
                author: "匿名用户",
                date: new Date().toISOString().slice(0, 10)
            };

            const posts = getPostsFromLocalStorage();
            posts.push(newPost);
            savePostsToLocalStorage(posts);

            renderPosts(); // 更新视图
            this.reset(); // 清空表单
        });
    }
};