
<?php
    session_start();
    session_destroy();
    header("Location: ../client-scripts/login_page.php");
    exit();
?>