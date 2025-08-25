<!--
    This simply receives the new POSTED information of the admin
    from the "update_details_page.php" script.
    It updates the admin's login credentials in memory.
-->

<!-- 
    After Logging in, it redirects to Library's "list_page_script.php"
-->

<?php
    session_start();

    if (!isset($_SESSION["loggedin"]))
        header("Location: ../_client-scripts/login_page.php");

    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ../_client-scripts/login_page.php");

    /* Process Login Data */
    if (!isset($_POST['username']) || !isset($_POST["password"]))
    {
        header("Location: ../_client-scripts/update_details_page.php");
    }

    $entered_new_username = $_POST['username'];
    $entered_new_password = $_POST['password'];

    /**
     *  Now since this is a request to update, the data file already exists.
     *  But just in case, still check and create a new one.
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
    $new_details = $loaded_data;
    if ($loaded_data['username'] != $entered_new_username)
    {
        //  store the new username by changing the value
        $new_details['username'] = $entered_new_username;
    }
    if ($loaded_data['password'] != $entered_new_password)
    {
        //  store the new password by changing the value
        $new_details['password'] = $entered_new_username;
    }
    
    if ($new_details !== $loaded_data){
        //  Finally, write JSON to memory if there was indeed a change
        $file_handle = fopen($file_path, "w");
        fwrite($file_handle, $new_details);
        fclose($file_handle);

        //  Redirect to the 'login_page.php'
        //  to login with new credentials.
        $_SESSION['loggedin'] = FALSE;
        $_SESSION['username'] = "";
        header("Location: ../_client-scripts/login_page.php");
    }
    
    //  If nothing was changed, redirect to the 'list_page_script.php'
    $_SESSION['loggedin'] = TRUE;
    $_SESSION['username'] = $new_details['username'];
    header("Location: ../_client-scripts/list_page_script.php");

?>