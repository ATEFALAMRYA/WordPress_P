const WP_URL = "http://localhost/wordpress/wp-json/wp/v2/posts";

const USERNAME = "";

const APP_PASS = "";

//================================= all post ===============================//

const postsContainer = document.getElementById("posts");

async function loadPosts() {
    const posts = await (await fetch(WP_URL)).json();

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-info" id="post-${post.id}">
            <h3>${post.title.rendered}</h3>
            <p>${post.excerpt.rendered}</p>

            <div class="post-id"><b>ID:</b> ${post.id}</div>

            <div class="post-actions">
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                <button onclick="viewPost(${post.id})">View</button>
            </div>
        </div>
    `).join("");
}

loadPosts();

function cancelEdit() {
    loadPosts();
}

//------------------------- delete post ---------------------------//

async function deletePost(id) {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${WP_URL}/${id}?force=true`, {
        method: "DELETE",
        headers: {
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    });

    const data = await res.json();

    const alertBox = document.getElementById("alert");

    if (data.deleted) {
        alertBox.innerHTML = `<div class="alert alert-success">Post Deleted</div>`;
        loadPosts();
    } else {
        alertBox.innerHTML = `<div class="alert alert-danger">Delete Failed</div>`;
    }
}

//------------------------------ edit post -----------------------//

async function editPost(id) {
    document.querySelectorAll(".post-info").forEach(p => p.style.display = "none");

    const post = await (await fetch(`${WP_URL}/${id}`)).json();

    const title = post.title.rendered.replace(/<[^>]*>/g, "");
    const content = post.content.rendered.replace(/<[^>]*>/g, "");

    const box = document.getElementById(`post-${id}`);
    box.style.display = "block";

    box.innerHTML = `
        <div class="title">
            <label>Post Title</label>
            <input type="text" id="edit-title-${id}" value="${title}">
        </div>

        <div class="contant">
            <label>Post Content</label>
            <textarea id="edit-content-${id}" rows="5">${content}</textarea>
        </div>

        <div class="post-actions">
            <button onclick="updatePost(${id})">Update</button>
            <button onclick="cancelEdit()">Cancel</button>
        </div>
    `;
}

//-------------------------- update post --------------------------//

async function updatePost(id) {
    const res = await fetch(`${WP_URL}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },
        body: JSON.stringify({
            title: document.getElementById(`edit-title-${id}`).value,
            content: document.getElementById(`edit-content-${id}`).value
        })
    });

    const data = await res.json();

    alert.innerHTML = data.id
        ? `<div class="alert alert-success">Post Updated</div>`
        : `<div class="alert alert-danger">Update Failed</div>`;

    if (data.id) loadPosts();
}

//------------------------ view post -----------------------------//

function viewPost(id) {
    window.open(`http://localhost/wordpress/?p=${id}`, "_blank");
}

//============================== Create Post ==============================//

const form = document.getElementById("create");

form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch(WP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            status: "publish"
        })
    });

    const data = await res.json();

    document.getElementById("alert").innerHTML = data.id
    ? `<div class="alert alert-success">Post Created: ${data.id}</div>`
    : `<div class="alert alert-danger">Create Failed</div>`;
});
