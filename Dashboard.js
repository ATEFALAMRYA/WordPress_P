
const WP_URL = "http://localhost/wordpress/wp-json/wp/v2/posts";

const USERNAME = "atef";

const APP_PASS = "o8BVuVBnKVq2NAfxGjunsUpm";

//========================================= all post ========================================//

async function loadPosts() {
    const res = await fetch(WP_URL);
    const data = await res.json();

    let html = "";

    data.forEach(post => {
        html += `
        <div class="post-info">
            <h3>${post.title.rendered}</h3>
            <p>${post.excerpt.rendered}</p>

            <div class="post-id">
                <span><b>ID:</b> ${post.id}</span>
            </div>

            <div class="post-actions">
                <button onclick="goEdit(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            </div>
        </div>`;
    });

    document.getElementById("posts").innerHTML = html;
}

loadPosts();

function goEdit(id) {
    window.location.href = `edit_post.html?id=${id}`;
}

async function deletePost(id) {

    if (!confirm("Are you sure you want to delete post?")) return;

    const response = await fetch(`${WP_URL}/${id}?force=true`, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    });

    const data = await response.json();

    if (data.deleted) {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-success">Post Deleted</div>`;
        loadPosts();
    } else {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-danger">Delete Failed: ${JSON.stringify(data)}</div>`;
    }
}

//==================================================================================================//



//======================================== creat post =============================================//

document.getElementById("create").addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch(WP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },

        body: JSON.stringify({
            title: document.getElementById("title").value,
            content: document.getElementById("content").value,
            status: "publish"
        })
    });
    const data = await response.json();
    
    if (data.id) {
        document.getElementById("alert").innerHTML =
        `<div class="alert alert-success">Post Created: ${data.id}</div>`;
    } else {
        document.getElementById("alert").innerHTML =
        `<div class="alert alert-danger">Post Failedto creat: ${JSON.stringify(data)}</div>`;
    }
});

//==================================================================================================//



//============================================== all user ==========================================//


async function loadUsers() {
    const res = await fetch(WP_USERS_URL + "?context=edit", {
        headers: {
            "Authorization": "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    });

    const data = await res.json();

    let html = "";

    data.forEach(user => {
        html += `
        <div class="user-card" onclick="openEditUser(${user.id})">
            <h3>${user.name}</h3>
            <p><b>Username:</b> ${user.slug}</p>
            <p><b>ID:</b> ${user.id}</p>
        </div>`;
    });

    document.getElementById("users").innerHTML = html;
}

function openEditUser(id) {
    window.location.href = `edit_user.html?id=${id}`;
}

loadUsers();

//==================================================================================================//



//============================================= creat user =========================================//

document.getElementById("create").addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch(WP_USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    });

    const data = await response.json();

    if (data.id) {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-success">User Created: ${data.id}</div>`;
    } else {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-danger">User Failed: ${JSON.stringify(data)}</div>`;
    }
});

//==================================================================================================//



//============================================= user post ==========================================//



//==================================================================================================//