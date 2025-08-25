<!--
    This will contain the form for submitting new library records.
    A library record is basically information about a new book
    you're submitting.
    It consists of these:
        1.  The title -- a text input
        2.  Description -- a text input
        3.  ISBN -- a text input of exactly 13 digits, seperated with some delimeter
        4.  Category (E.g. Visual Arts, Music, Natural Sciences, Computer Sciences, Engineering, Maths, Business, Law,  Language)
            this will be a dropdown list
        5.  Associated Keele Module -- should also be a dropdown. To make it simple, associate it
            not with a module specifically, but with the letters that prefix the module.
            E.g. CSC for Computer Science, LSC for Life Sciences, etc.
        This is enough!

-->


<?php
    session_start();

    if (!isset($_SESSION["loggedin"]))
        header("Location: ./login_page.php");
    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ./login_page.php");
?>


<!DOCTYPE HTML><html lang="en">
    <head>
        <title>Submit Record Page</title>
        <meta charset="urf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <h2>Submit Library Records Here</h2>
        <br>
        <p>Enter a Library Record</p>

        <form class="record_form" method="POST" action="../_server-scripts/submit_record_script.php">
            <div class="form-element">
                <h4>Title:</h4>
                <input type="text" id="title">
            </div>
            <div class="form-element">
                <h4>Description:</h4>
                <input type="text" id="description">
            </div>
            <div class="form-element">
                <h4>ISBN:</h4>
                <input type="number" id="isbn">
            </div>
            <div class="form-element">
                <h4>Category:</h4>
                <select class="form-record_select" id="category">
                    <option value="Visual Arts">Visual Arts</option>
                    <option value="Music">Music</option>
                    <option value="Natural Sciences">Natural Sciences</option>
                    <option value="Computing">Computing</option>
                    <option value="Math">Math</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Law">Law</option>
                    <option value="Language">Language</option>
                </select>
            </div>
            <div class="form-element">
                <h4>Associated Keele Module Code:</h4>
                <select class="form-record_select" id="module_code">
                    <!-- <option value=""> -->
                    <option value="LSC">
                    <option value="CSC">
                </select>
            </div>
            <input type="submit" value="Update" class="form-submit_button">
        </form>

    </body>
</html>