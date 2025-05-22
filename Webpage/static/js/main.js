// 核心识别函数
    async function analyzeImage() {
        const ACCESS_TOKEN = '24.66579e1753c9a3f7795e47caf7c3c2c4.2592000.1750478151.282335-118555727'; 
        const API_URL = `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${ACCESS_TOKEN}`;

        const fileInput = document.getElementById('imageInput');
        const resultDiv = document.getElementById('result');            
        const loading = document.getElementById('loading');

        if (!fileInput.files[0]) {
            alert('请先选择图片');
            return;            
        }

        loading.style.display = 'block';
        resultDiv.innerHTML = '';

        try {
            // 获取处理后的blob
            const processedDataUrl = await processImage(fileInput.files[0]);
            const base64Data = processedDataUrl.split(',')[1]; // 精确分割去头部

            // 构建请求参数
            const params = new URLSearchParams();
            params.append('image', base64Data); 
            params.append('top_num', '3'); // 可修改返回结果数量
            params.append('baike_num', '3'); // 百科结果数量

            // 发送请求
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            });
            if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
                const data = await response.json();
                
            if (data.error_code) {
                throw new Error(`API错误: ${data.error_msg}`);
            }
                
            showResult(data);
        } catch (error) {
            console.error('完整错误追踪:', error);
            resultDiv.innerHTML = `识别失败: ${error.message}`;
        } finally {
            loading.style.display = 'none';
        }
    }

    document.getElementById('customUploadBtn').addEventListener('click', function () {
    document.getElementById('imageInput').click();
});
