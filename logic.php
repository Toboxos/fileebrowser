<?php
    
    // Check if already a path is give, otherweise set path to '.'
    if( isset($_POST['path']) ) {
        $path = $_POST['path'];
    }  else {
        $path = ".";
    }

    // If there is the command to create a folder and folder name is given
    // create a folder with the given name
    if( isset($_POST['create']) ) {
        if( isset($_POST['folder-name']) ) {
            mkdir( $path . "/" . $_POST['folder-name'] );
        }
    }

    // If there is the command to upload a file and a file was uploaded,
    // move the uploaded file from the tmp folder to actual path
    if( isset($_POST['upload']) ) {
        if( isset($_FILES['file']) ) {
            $file_name = $_FILES['file']['name'];
            $file_tmp = $_FILES['file']['tmp_name'];
            move_uploaded_file($file_tmp, $path . "/" . $file_name);
        }
    }

	// Action:
	//  0 = VIEW
	//  1 = DOWNLOAD
	// 	2 = DELETE
    if( isset($_POST['target']) ) {
        $target = $_POST['target'];
        $action = $_POST['action'];
        
        if( is_dir($path . "/" . $target) ) {
            if( $action == 2 ) {
                rmdir($path . "/" . $target);
            } else {
                if( $target != "." ) {
                    if( $target == ".." ) {
                        $split = explode("/", $path);
                        $count = count($split);
                        if( $path == "." || $split[$count - 1] == ".." ) {
                            $path = $path . "/" . $target;
                        }  else {
                            $path = ".";
                            for( $i = 1; $i < $count - 1; $i++ ) {
                                $path .= "/" . $split[$i];
                            }
                        }
                    } else {
                        $path = $path . "/" . $target;
                    }
                }
            }
        } else {
            if( $action == 2 ) {
                unlink($path . "/" . $target);
            } else if( $action == 1 ) {
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . basename($target) . '"');
                header("Content-Transfer-Encoding: Binary");
                header('Content-Length:' . filesize($path . "/" . $target));
                
                $file = fopen($path . "/" . $target, "rb");
                while( !feof($file) ) {
                    print fread($file, 1024);
                    flush();
                }
                //readfile($path . "/" . $target);
                fclose($file);
                exit;
            } else {
                die( str_replace("\t", "<span style=\"margin-left: 10px\"></span>", str_replace("\n", "<br>", htmlspecialchars(file_get_contents($path . "/" . $target)))) );
            }
        }
    }

    $dir = scandir($path);
?>