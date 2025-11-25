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
    <title>Dashboard</title>

<style>

body {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    background: #1f1f1f;
    color: #fff;
    overflow: hidden;
}

.top-bar {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    background: #242424;
    border-bottom: 2px solid #333;
}

.user-icon {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    background: #444;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.layout {
    display: flex;
    height: calc(100vh - 70px);
}

.sidebar {
    width: 240px;
    background: #242424;
    padding: 20px;
    border-right: 2px solid #333;
    box-shadow: 4px 0 12px rgba(0,0,0,0.3);
}

.sidebar button {
    width: 100%;
    padding: 13px;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: #fa3333ff;
    color: #fff;
    transition: 0.3s ease;
}

.sidebar button:hover {
    background: #bd2f2fff;
}

.content {
    flex: 1;
    padding: 20px;
}

.content-box {
    background: #2b2b2b; 
    padding: 15px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.4);
    overflow: hidden;
}

h2 {
    color: #fa3333ff;
    font-size: 32px;
    margin-bottom: 10px;
}

p {
    color: #dcdcdc;
    font-size: 19px;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    background: #242424;
}

.user-info {
    display: flex;
    align-items: center;
}

.logout-btn {
    background: #fa3333ff;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.2s ease;
}

.logout-btn:hover {
    background: #bd2f2fff;
}

</style>

</head>

<body>

<div class="top-bar">
    <div class="user-info">
        <div class="user-icon">
            <img src="usericon.png" alt="user icon">
        </div>
        <span><?php echo $user; ?></span>
    </div>

    <a href="logout.php" class="logout-btn">Logout</a>
</div>

    <div class="layout">

        <div class="sidebar">
            <button onclick="loadContent('create_post.html')">create post</button>
            <button onclick="loadContent('all_post.html')">show all post</button>
        </div>

        <div class="content content-box" id="content-area">
            <h2>Welcome to your dashboard</h2>
            <p>Here you can create and display posts</p>
        </div>

    </div>

    <script>

         function loadContent(page) {
            document.getElementById("content-area").innerHTML =
            '<iframe src="' + page + '" style="width:100%;height:100%;border:0;overflow:hidden;"></iframe>';}

    </script>

</body>
</html>
