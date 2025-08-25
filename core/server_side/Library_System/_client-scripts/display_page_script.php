<!--
    This will receive by POST or GET the details of which
-->


<?php
    if (!isset($_SESSION["loggedin"]))
        header("Location: ./login_page.php");
    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ./login_page.php");
    
    if (!isset($_GET['title']))
        header("Location: ./list_page_script.php");
    
    $target_title = $_GET['title'];
    
    //  Read data
    $file_path = "../data/library/library_records.json";
    $file_contents = file_get_contents($file_path);
    
    if (!$file_contents){
        header("Location: ./list_page_script.php");
    }

    //  If there are indeed contents
    $data_as_array = json_decode($file_contents, true);
    $found = false;
    $index = 0;
    foreach ($data_as_array as $data_record)
    {
        if ($data_record['title'] == $target_title){
            $found = true;
            break;
        }
        $index += 1;
    }

    if (!$index){   //  Title didn't exist
        header("Location: ./list_page_script.php");
    }
?>

<!DOCTYPE HTML><html lang="en">
    <head>
        <title>Display Library Record</title>
    </head>

    <body>
        <div id="library_record_details">
            <h2>Viewing <b><?=$data_as_array[$index]['title']?></b></h2>
            <br>
            
            <h4>ISBN:</h4>
            <h5><?=$data_as_array[$index]['isbn']?></h5>
            
            <br>
            <h4>Description:</h4>
            <p><?=$data_as_array[$index]['description']?></p>

            <br>
            <h4>Category:</h4>
            <p><?=$data_as_array[$index]['category']?></p>

            <br>
            <h4>Associated Module Code:</h4>
            <p><?=$data_as_array[$index]['module_code']?></p>
        </div>
        
        <a href="./list_page_script.php">Back to List</a>
            
    </body>

</html>