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
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
                <button onclick="viewUser(${user.id})">View</button>
            </div>
        </div>`;
    });

    document.getElementById("users").innerHTML = html;
}

loadUsers();

function cancelUserEdit() {
    loadUsers(); 
}

//---------------------------- edit user -------------------------------//

async function editUser(id) {

    document.querySelectorAll(".user-info").forEach(u => u.style.display = "none");

    const user = await (await fetch(`${WP_USERS_URL}/${id}?context=edit`, {
        headers: {
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        }
    })).json();

    const first = (user.first_name || "");
    const last  = (user.last_name || "");
    const email = (user.email || "");

    const box = document.getElementById(`user-${id}`);
    box.style.display = "block";

    box.innerHTML = `
        <div class="title">
            <label>Email</label>
            <input type="email" id="edit-email-${id}" value="${email}">
        </div>

        <div class="title">
            <label>First Name</label>
            <input type="text" id="edit-first-${id}" value="${first}">
        </div>

        <div class="title">
            <label>Last Name</label>
            <input type="text" id="edit-last-${id}" value="${last}">
        </div>

        <div class="post-actions">
            <button onclick="updateUser(${id})">Update</button>
            <button onclick="cancelUserEdit()">Cancel</button>
        </div>
    `;
}

//-------------------------------- update user ----------------------------------//

async function updateUser(id) {
    const res = await fetch(`${WP_USERS_URL}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${USERNAME}:${APP_PASS}`)
        },
        body: JSON.stringify({
            email: document.getElementById(`edit-email-${id}`).value,
            first_name: document.getElementById(`edit-first-${id}`).value,
            last_name: document.getElementById(`edit-last-${id}`).value
        })
    });

    const data = await res.json();

    const alertBox = document.getElementById("alert");

    if (data.id) {
        alertBox.innerHTML = `<div class="alert alert-success">User Updated</div>`;
        loadUsers();
    } else {
        alertBox.innerHTML = `<div class="alert alert-error">${data.message || "Update Failed"}</div>`;
    }
}

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
            `<div class="alert alert-error">${JSON.stringify(data)}</div>`;
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
        : `<div class="alert alert-error"> "Create Failed"</div>`;
});
