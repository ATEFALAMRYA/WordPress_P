<?php

session_start();
if (!isset($_SESSION['user_id'])) {
header("Location: login.php");
exit;
}

$user = $_SESSION['user_name'];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="Dashboard.css">
</head>
<body>

<div class="top-bar">

    <div class="user-info">
        <div class="user-icon">
            <img src="usericon.png" alt="user icon">
        </div>
        <span><?php echo $user; ?></span>
    </div>

    <div class="logo">
        <a href="http://localhost/wordpress/wp-admin" class="logo-btn" target="_blank">
            <img src="logo.png" alt="logo">
        </a>

    <a href="logout.php" class="logout-btn">Logout</a>
    </div>
</div>

<div class="layout">

    <div class="sidebar">
 
        <div class="menu-title">Posts</div>
        <button onclick="loadContent('post/create_post.html')">create post</button>
        <button onclick="loadContent('post/all_post.html')">all posts</button>

        <div class="menu-title">Users</div>
        <button onclick="loadContent('./user/create_user.html')">create user</button>
        <button onclick="loadContent('./user/all_user.html')">all user</button>
        <button onclick="loadContent('./user/user_post.html')">user post</button>

    </div>

    <div class="content content-box" id="content-area">
        <h2>Welcome to your quick dashboard</h2>
        <p>Here you can create and display posts and users</p>
    </div>

</div>

<script>

function loadContent(page) {
    document.getElementById("content-area").innerHTML =
        `<iframe src="${page}" style="width:100%;height:100%;border:0"></iframe>`;
}

</script>

</body>
</html>
