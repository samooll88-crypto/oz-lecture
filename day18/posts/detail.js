// detail.js (포스트 상세 화면 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";
const CACHE_DURATION = 5 * 60 * 1000; // 5분

// 포스트 상세 정보 표시
async function displayPostDetail() {
  try {
    // URL에서 postId 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    if (!postId) {
      throw new Error("No post ID provided");
    }

    let post;
    const cacheKey = `post_${postId}`;
    const cachedData = localStorage.getItem(cacheKey);

    // localStorage에 캐시가 있는지 확인
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const now = Date.now();

      // 5분 내 캐시이면 캐시 사용
      if (now - parsedData.timestamp < CACHE_DURATION) {
        post = parsedData.data;
        console.log("Post loaded from localStorage");
      } else {
        // 캐시 만료 시 삭제
        localStorage.removeItem(cacheKey);
      }
    }

    // 캐시가 없거나 만료되었으면 API에서 가져오기
    if (!post) {
      const response = await fetch(`${apiUrl}/posts/${postId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      post = await response.json();

      // localStorage에 저장
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: post,
          timestamp: Date.now(),
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

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail();