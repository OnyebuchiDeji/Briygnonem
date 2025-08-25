<!-- 
    After Logging in, it redirects to Library's "list_page_script.php"
-->

<?php
    session_start();

    if (isset($_SESSION['loggedin'])) header("Location: ../_client-scripts/list_page_script.php");

    /* Process Login Data */
    if (!isset($_POST['username']) || !isset($_POST["password"]))
    {
        header("Location: ../_client-scripts/login_page.php");
    }

    $entered_username = $_POST['username'];
    $entered_password = $_POST['password'];

    /**
     *  Now check if the data file exists.
     *  If not, create it with default values of admin:
     *      username: "admin"
     *      password: "admin"
     *  It is a JSON file that should be made.
     * 
     * */ 
    $file_path = "../data/admin/admin_data.json";
    $loaded_data = array();
    //  This will be false if file doesn't exist
    $file_contents = file_get_contents($file_path);
    //  If the file didn't exist at first, then create one and populate with standard admin info
    if ($file_contents === FALSE)
    {
        $standard_admin_details = json_encode(array("username" => 'admin', 'password' => 'admin'), JSON_PRETTY_PRINT);  
        $file_handle = fopen($file_path, "w");
        fwrite($file_handle, $standard_admin_details);
        fclose($file_handle);
    }
    else{   #   If it does
        $loaded_data = json_decode(($file_contents), true);
        // Print associative array with
        var_dump($loaded_data);
    }

    /**
     *  Now check if loaded data matches the entered data
     * 
     */
    if ($loaded_data['username'] == $entered_username && $loaded_data['password'] == $entered_password)
    {
        //  Redirect to the 'list_page_script.php'
        $_SESSION['loggedin'] = TRUE;
        $_SESSION['username'] = $username;
        header("Location: ../_client-scripts/list_page_script.php");
    }
    else{
        $_SESSION['loggedin'] = FALSE;
        $_SESSION['username'] = "";
        //  Go back to login page
        header("Location: ../_client-scripts/login_page.php");
    }
?>