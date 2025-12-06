const WP_USERS_URL = "http://localhost/wordpress/wp-json/wp/v2/users";

const USERNAME = "";

const APP_PASS = "";

//==================================== all user ================================================//

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
        <div class="user-info" id="user-${user.id}">
            <h3>${user.name}</h3>
            <p><b>Username:</b> ${user.slug}</p>
            <p><b>ID:</b> ${user.id}</p>

            <div class="post-actions">
                <button onclick="deleteUser(${user.id})">Delete</button>
                <button onclick="viewUser(${user.id})">View</button>
            </div>
        </div>`;
    });

    document.getElementById("users").innerHTML = html;
}

loadUsers();

// ---------------------------- Delete -------------------------------------//

async function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) return;

    const REASSIGN_TO = 1;

    const res = await fetch(`${WP_USERS_URL}/${id}?force=true&reassign=${REASSIGN_TO}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    });

    const data = await res.json();

    if (data.deleted) {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-success">User Deleted</div>`;
        loadUsers();
    } else {
        document.getElementById("alert").innerHTML =
            `<div class="alert alert-danger">${JSON.stringify(data)}</div>`;
    }
}

//-------------------------------- View ---------------------------------//

function viewUser(id) {
    window.open(
        `http://localhost/wordpress/wp-admin/user-edit.php?user_id=${id}`,
        "_blank"
    );
}
//============================================= creat user =========================================//

create.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = await (await fetch(WP_USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    })).json();

    document.getElementById("alert").innerHTML = data.id
        ? `<div class="alert alert-success">User Created: ${data.id}</div>`
        : `<div class="alert alert-danger">${data.message || "Create Failed"}</div>`;
});
