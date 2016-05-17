<?php
//secure this file
include("Functions.php");
session_start();
$function = new DatabaseClasses;
	if(isset($_GET['chkConnection'])){
		print_r($function->chkConnection());
	}

	if(isset($_GET['createDB'])){
		$data = $function->createDB('db_k12');
		if($data == 1){
			echo 1;
		}
	}

	if(isset($_GET['createTables'])){
		$fileDir = '../db/k12.sql';
		if(file_exists($fileDir)){
			$query = file_get_contents($fileDir);
			$query = $function->PDO(false,$query);
			if($query->execute()){
				echo 1;
			}
			else{
				echo 0;
				/*
				$Data = $query->errorInfo();
				print_r($Data);
				*/
			}
		}
		else{
			echo 0;
		}			
	}

	if(isset($_GET['checkSchoolDetails'])){
		$query = $function->PDO(true,'SELECT * FROM tbl_schoolinfo');
		print_r(json_encode($query));
	}

	if(isset($_GET['login'])){
		$data = $_POST['data'];
		$username = $data[0]['value'];
		$password = sha1($data[1]['value']);
		$date = new DateTime();
		$hash = $date->getTimestamp();

		$query = $function->PDO(true,"SELECT * FROM tbl_user WHERE username = '{$username}' AND password = '{$password}'");
		if(count($query)>0){
			$_SESSION["data"] = [$username,$password,$hash];
			print_r(json_encode($query));
		}
		else{
			echo 0;
		}
	}

	if(isset($_GET['get-account'])){
		$data = $_SESSION['data'];
		$query = $function->PDO(true,"SELECT * FROM tbl_user WHERE username = '{$data[0]}' AND password = '{$data[1]}'");
		print_r(json_encode($query));
	}



?>