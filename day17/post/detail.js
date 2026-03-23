const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 상세 정보 표시
async function displayPostDetail() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("postId");

        if (!postId) {
            throw new Error("No post ID provided");
        }

        const cacheKey = `post_${postId}`;
        const cachedData = localStorage.getItem(cacheKey);
        let post = null;

        // localStorage 캐시 확인
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const now = Date.now();
            const cacheTime = parsedData.timestamp;
            const fiveMinutes = 5 * 60 * 1000;

            if (now - cacheTime < fiveMinutes) {
                post = parsedData.data;
                console.log("Post loaded from localStorage");
            }
        }

        // 캐시가 없거나 만료되었으면 API 호출
        if (!post) {
            const response = await fetch(`${apiUrl}/posts/${postId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch post detail");
            }

            post = await response.json();

            // localStorage에 저장
            localStorage.setItem(
                cacheKey,
                JSON.stringify({
                    data: post,
                    timestamp: Date.now()
                })
            );

            console.log("Post fetched from API");
        }

        renderPost(post);
    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("post-detail").innerHTML =
            "<p>Error loading post details</p>";
    }
}

// 포스트 렌더링 함수
function renderPost(post) {
    const postDetail = document.getElementById("post-detail");
    postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `;
}

displayPostDetail();