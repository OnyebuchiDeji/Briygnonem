<!--
    This will use the ID of a record it receives by POST or GET
    to delete that record from memory.

    After deleting, it re-assigns the ids of the remaining records by simply assingning
    numbers counting from 0 to the number of exisiting records.

    In the end, didn't use IDs but used titles.

    Finally, it redirects to 'list_page_script.php'
-->

<?php
    if (!isset($_SESSION["loggedin"]))
        header("Location: ./login_page.php");

    if ($_SESSION["loggedin"]===FALSE)
        header("Location: ./login_page.php");
    
    //  In case someone calls the endpoint without adding a valid title
    if (!isset($_GET['title']))
        header("Location: ../_client-scripts/list_page_script.php");

    //  Now, delete the Record from memory by the title Posted to it:

    $file_path = "../data/library/library_records.json";
    $file_contents = file_get_contents($file_path);

    //  If file is empty, nothing to delete
    if ($file_contents === FALSE){
        //  Redirect to 'list_page_script.php'
        header("Location: ../_client-scripts/list_page_script.php");
    }

    //  Get the title of the Record to be deleted:
    $target_title = $_GET['title'];

    //  If not, transform to array
    //  true means decode as associative array
    $data_as_array = json_decode($file_contents, true);

    $index = 0;
    $found = false;
    foreach ($data_as_array as $data_records){
        if ($data_records['title'] === $target_title){
            unset($data_as_array[$index]);
            $found = true;
            break;
        }
        $index += 1;
    }

    //  The title was not found
    //  go back. Someone probably called the endpoint
    //  without clicking any link
    if (!$found){
        header("Location: ../_client-scripts/list_page_script.php");
    }
    
    //  Save the now updated $data_as_array
    $file_handle = fopen($file_path, "w");
    fwrite($file_handle, json_encode($data_as_array, JSON_PRETTY_PRINT));
    fclose($file_handle);
    
    //  Go back to the list_page_script, which will reload and update everything.
    header("Location: ../_client-scripts/list_page_script.php");
    
?>