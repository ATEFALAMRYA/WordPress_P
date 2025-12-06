const WP_USERS_URL = "http://localhost/wordpress/wp-json/wp/v2/users";

const USERNAME = "";

const APP_PASS = "";

//============================= user post ==============================//

async function loadUsers() {
    const res = await fetch(`${WP_USERS_URL}?context=edit`, {
        headers: {
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    });

    const users = await res.json();

    document.getElementById("users").innerHTML = users.map(user => `
        <div class="user-info">
            <h3>${user.name}</h3>
            <p><b>Username:</b> ${user.slug}</p>
            <p><b>ID:</b> ${user.id}</p>

            <div class="post-actions">
                <button onclick="viewUserPosts('${user.slug}')">View Posts</button>
            </div>
        </div>
    `).join("");
}

loadUsers();

//------------------------- open User posts ------------------------//

function viewUserPosts(username) {
    window.open(`http://localhost/wordpress/author/${username}/`, "_blank");
}
