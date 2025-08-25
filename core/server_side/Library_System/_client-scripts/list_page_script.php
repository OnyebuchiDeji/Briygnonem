<!-- 
    This is what loads and displays the list of library records
    that were entered into "submit_record_page.php" and written to
    memory by "submit_record_script.php".

    It displays nothing at first, since it will be empty, and hence the PHP will
    ensure to indicate that.
    It has a button to add a record, which redirects to the "submit_record_page.php"
    The PHP will also keep track of the number of records entered.

    These records can be clicked, which will redirect to "display_page_script.php".
-->


<?php
    if (!isset($_SESSION["loggedin"]))
        header("Location: ./login_page.php");
    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ./login_page.php");

    //  Get the Library data from the store
    $file_path = "../data/library/library_records.json";

    $data_as_json = file_get_contents($file_path);

    $data_array = array();
    if ($data_as_json)
        $data_array = json_decode($data_as_json,true);

?>

<!DOCTYPE HTML><html lang="en">
    <head>
        <title>List Library Records</title>
    </head>

    <body>
        <h2>The Library Records</h2>
        <br>
        <p>Pree the Library Records</p>
        
        <?php
            if (!$data_as_json){    ?>  
                <h3><b>The List is Empty Right Now.</b></h3>
        <?php }
            else{?>
                <div class="list-library_records">
                    <?php
                        foreach ($data_array as $data_records){?>
                            <div>
                                <h3>Book Title: <?=$data_records['title']?></h3>
                                <div class="record-buttons">
                                    <a href="./display_page_script.php?title=<?=$data_records['title']?>">View Record</a>
                                    <a href="../_server-scripts/delete_record_script.php?title=<?=$data_records['title']?>">Delete Record</a>
                                </div>
                            </div>
                    <?php } ?>
                </div>
            <?php } ?>
        
        <a href="./submit_record_page.php">Add New Record</a>
            
    </body>

</html>