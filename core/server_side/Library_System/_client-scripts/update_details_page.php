<!-- 
    This is a simple form of two fields to update the admin's data:
        New Username:
        New Password:
        Submit
        
-->

<?php
    session_start();    //  Commences the use of Sessions

    // If already loggedin, go to the "list_page_script.php"
    // if (isset($_SESSION['loggedin'])) header("Location: ./list_page_script.php");
    
    if (!isset($_SESSION["loggedin"]))
        header("Location: ./login_page.php");

    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ./login_page.php");


?>

<!DOCTYPE HTML><html>
    <head>
        <title>Update Details Page</title>
    </head>

    <body>
        <h2>Update Details Page</h2>
        <br>
        <p>Enter New Admin Details</p>

        <!--
            By default, the `target` attribute is '_blank' meaning
            The POST response will be displayed in the current window, which is generally
            displaying a new HTML due to the server redirecting.
        -->
        <form class="details_form" action="../_server-scripts/update_details_script.php" method="POST">
            <div class="form-element">
                <h4>New Username:</h4> 
                <input type="text" name="username"><br>
            </div>
            <div class="form-element">
                <h4>New Password:</h4>
                <input type="password" name="password"><br>
            </div>
            <!--
                This input type has three cool attributes that override the actual form's corresponding attributes:
                    1.  formaction -- specifies the URL of the file that the form submits to
                    2.  formenctype -- specifies the encoding type of the data the form submits:
                        e.g. formenctype="multipart/form-data, is opposed to the default encoding
                        3.  formethod -- specifies the delivery method (POST or GET).
                        4. formtarget -- just like that of th eform element as explained above, but this one overrides the lastter. 
            -->
            <input type="submit" value="Update" class="form-submit_button">
        </form>
    </body>
</html>