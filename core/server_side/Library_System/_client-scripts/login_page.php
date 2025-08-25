<?php
    session_start();    //  Commences the use of Sessions

    // If already loggedin, go to the "list_page_script.php"
    if (isset($_SESSION['loggedin'])) header("Location: ./list_page_script.php");
?>

<!DOCTYPE HTML><html>
    <head>
        <title>Login Page</title>
    </head>

    <body>
        <h2>Login Page</h2>
        <br>
        <p>Enter Admin Details</p>

        <form class="details_form" action="../_server-scripts/login_script.php" method="POST">
            <div class="form-element">
                <h4>Username:</h4> 
                <input type="text" name="username"><br>
            </div>
            <div class="form-element">
                <h4>Password:</h4>
                <input type="password" name="password"><br>
            </div>
            <input type="submit" value="Login" class="form-submit_button">
        </form>
    </body>
</html>