const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 목록 표시
async function displayPosts() {
    try {
        const response = await fetch(`${apiUrl}/posts`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await response.json();
        const postList = document.getElementById("post-list");
        postList.innerHTML = "";

        posts.forEach((post) => {
            const li = document.createElement("li");
            li.textContent = post.title;
            li.dataset.postId = post.id;

            li.addEventListener("click", () => {
                window.location.href = `detail.html?postId=${post.id}`;
            });

            postList.appendChild(li);
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

displayPosts();