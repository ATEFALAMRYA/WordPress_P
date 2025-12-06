<?php
session_start();
require_once "C:/xampp/htdocs/wordpress/wp-load.php";

$show_error = false;
$error_message = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_user'])) {

    $username = sanitize_user($_POST['username']);
    $password = $_POST['password'];

    $user = get_user_by('login', $username);

    if ($user) {
        $auth = wp_authenticate($username, $password);

        if (!is_wp_error($auth)) {
            $_SESSION['user_id']   = $auth->ID;
            $_SESSION['user_name'] = $auth->display_name;

            header("Location: Dashboard.php");
            exit;
        }

        $show_error = true;
        $error_message = "Invalid password!";

    } else {
        $show_error = true;
        $error_message = "User not found!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Login</title>

<style>

body{
    margin:0;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#1f1f1f;
    font-family:"Segoe UI",Arial,sans-serif;
    color:#fff
}

.login-box{
    background:#242424;
    width:420px;
    padding:50px;
    border-radius:12px;
    border:1px solid #333;
    box-shadow:0 8px 25px rgba(0,0,0,.5);
    text-align:center
}

.login-box h2{
    color:#ff3030;
    margin-bottom:40px;
    font-size:55px;
    font-weight:bold
}

.login-box input{
    width:90%;
    padding:15px;
    margin-bottom:25px;
    border-radius:10px;
    border:1px solid #444;
    background:#1f1f1f;
    color:#fff;
    font-size:17px
}

.login-box input:focus{
    border-color:#ff3030
}

.login-box button{
    width:100%;
    padding:15px;
    font-size:18px;
    font-weight:bold;
    border-radius:10px;
    border:none;
    cursor:pointer;
    background:#ff3030;
    color:#fff;
    transition:.2s
}

.login-box button:hover{
    background:#cc2626
}

.alert-box{
    width:94%;
    margin:15px auto 0;
    background:#3a1f1f;
    padding:14px;
    border-radius:10px;
    font-size:16px
}

</style>
</head>

<body>

<div class="login-box">
    <h2>Login</h2>

    <form method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit" name="login_user">Login</button>
    </form>

    <?php if ($show_error): ?>
        <div class="alert-box"><?= $error_message ?></div>
    <?php endif; ?>
</div>

</body>
</html>
