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

	if(isset($_GET['get-schoolInfo'])){
		$data = $_SESSION['data'];
		$query = $function->PDO(true,"SELECT * FROM tbl_schoolinfo");
		print_r(json_encode($query));
	}

	if(isset($_GET['get-students'])){
		$final = [];
		$students = [];
		$query = $function->PDO(true,"SELECT * FROM tbl_studentinfo");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
		        $query_studentEd = $function->PDO_SQL("SELECT * FROM tbl_student WHERE student_id = '{$v[15]}' ORDER BY `date` DESC");
		        $final[] = [$v,$query_studentEd];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
	}

    if (isset($_GET['get-yearLevel'])) {
    	$final = [];
    	$subjects = [];
        $query = $function->PDO_SQL("SELECT * FROM tbl_yearlevel ORDER BY chronological ASC");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
		        $query_section = $function->PDO_SQL("SELECT * FROM tbl_section WHERE `year` = '{$v[0]}' ORDER BY `order` ASC");
		        $query_subject = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE `year` = '{$v[0]}' ORDER BY subject_sort ASC");
		        $final[] = [$v,$query_section,$query_subject];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
    }

    if (isset($_GET['get-assoc-yearLevel'])) {
    	$final = [];
    	$subjects = [];
        $query = $function->PDO_ASSOC("SELECT * FROM tbl_yearlevel ORDER BY chronological ASC");
        if(count($query)>0){
        	foreach ($query as $i => $v) {
        		$year = $v['id'];
		        $query_section = $function->PDO_ASSOC("SELECT * FROM tbl_section WHERE `year` = '{$year}' ORDER BY `order` ASC");
		        $query_subject = $function->PDO_ASSOC("SELECT * FROM tbl_subject WHERE `year` = '{$year}' ORDER BY subject_sort ASC");
		        $final[$v['title']] = [$v,$query_section,$query_subject];
        	}
	        print_r(json_encode($final));
        }
        else
            echo 0;
    }

	if(isset($_GET['set-schoolInfo'])){
		$data = $_POST['data'];
        $id = $function->PDO_IDGenerator('tbl_schoolinfo','id');

		$schoolName = $data[0]['value'];
		$schoolAddress = $data[1]['value'];
		$schoolYear = $data[2]['value'];
		$schoolID = $data[3]['value'];
		$schoolRegion = $data[4]['value'];
		$schoolDivision = $data[5]['value'];

        if($data[6]['name'] == 'save'){

			$details = json_encode(['','',$schoolAddress]);
			$query = $function->PDO(false,"INSERT INTO tbl_schoolinfo(id,schoolName,schoolID,schoolYear,region,division,details) VALUES('{$id}','{$schoolName}','{$schoolID}','{$schoolYear}','{$schoolRegion}','{$schoolDivision}','{$details}')");
			if($query->execute()){
				echo 1;
			}
			else{
				$Data = $query->errorInfo();
				print_r($Data);
			}
        }
        else{
			$details = json_encode(['','',$schoolAddress]);
			$query = $function->PDO(false,"UPDATE tbl_schoolinfo SET schoolName = '{$schoolName}',schoolID = '{$schoolID}',schoolYear = '{$schoolYear}',region = '{$schoolRegion}',division = '{$schoolDivision}', details = '{$details}'");
			if($query->execute()){
				echo 1;
			}
			else{
				$Data = $query->errorInfo();
				print_r($Data);
			}
        }
	}

	if(isset($_GET['set-yearLevel'])){
		$year = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'];
		$query = ''; $attr = '';
        foreach ($year as $key => $value) {
        	$id = sha1($key);
        	$chronological = $key+1;

        	if(($value == 'Grade 11') || ($value == 'Grade 12')){
				$attr = 2;
        	}
        	else{
				$attr = 1;
        	}
        	$query .= "INSERT INTO tbl_yearlevel(id,title,chronological,attribute) VALUES('{$id}','{$value}',{$chronological},{$attr});";
        }

		$query = $function->PDO(false,$query);
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['set-section'])){
		$data = $_POST['data'];
		$section = $data[0]['value'];
		$year = $data[1]['value'];
        $id = $function->PDO_IDGenerator('tbl_section','id');
		$order = count($function->PDO(true,"SELECT * FROM tbl_section WHERE `year` = '{$year}'"))+1;

		$query = $function->PDO(false,"INSERT INTO tbl_section(`id`,`section`,`order`,`year`) VALUES('{$id}','{$section}','{$order}','{$year}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

	if(isset($_GET['set-subject'])){
		$data = $_POST['data'];

        $id = $function->PDO_IDGenerator('tbl_subject','id');
		$subject_code = $data[0]['value'];
		$subject_title = json_encode([$data[2]['value']]);
		$subject_discription = $data[3]['value'];
		$subject_sort = 1;
		$year = $data[1]['value'];

		$query = $function->PDO(false,"INSERT INTO tbl_subject(`id`,`subject_code`,`subject_title`,`subject_discription`,`subject_sort`,`year`) VALUES('{$id}','{$subject_code}','{$subject_title}','{$subject_discription}','{$subject_sort}','{$year}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}

    if (isset($_GET['set-sublevelsubject'])) {
		$data = $_POST['data'];
		$sublevelesubject = [];

		$year = $data[1]['value'];
		$subject_code = $data[0]['value'];
		$subject_title = $data[2]['value'];
		$subject_discription = $data[3]['value'];

        $Query = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE id = '{$year}'");
        $data = json_decode($Query[0][2]);
        $data[] = [$subject_code,$subject_title,$subject_discription];
        $data = json_encode($data);

		$QueryString = "UPDATE tbl_subject SET subject_title = '{$data}' WHERE id = '{$year}'";
		$Query = $function->PDO_SQLQuery($QueryString);
		if($Query->execute())
			echo 1;
		else{
			print_r(json_encode([$query->errorInfo()]));
		}
    }

    if (isset($_GET['delete-sublevelsubject'])) {
		$data = $_POST['data'];
		$newdata = [];
		$subject_id = $data[0];
		$subject_code = $data[1][0];
		$subject_title = $data[1][1];
		$subject_discription = $data[1][2];
        $Query = $function->PDO_SQL("SELECT * FROM tbl_subject WHERE id = '{$subject_id}'");
        $data = json_decode($Query[0][2]);

        foreach ($data as $i => $v) {
        	if(count($v)==0){
        		$newdata[] = $v;
        	}
        	else{
        		if(($v[1] == $subject_code) && ($v[0] == $subject_title) && ($v[2] == $subject_discription)){
        			// echo "code: {$subject_code}, title: {$subject_title}, value: {$subject_discription}";
        		}
        		else{
	        		$newdata[] = $v;
        		}        		
        	}
        }
        $data = json_encode($newdata);

		$QueryString = "UPDATE tbl_subject SET subject_title = '{$data}' WHERE id = '{$subject_id}'";
		$Query = $function->PDO_SQLQuery($QueryString);
		if($Query->execute())
			echo 1;
		else{
			print_r(json_encode([$query->errorInfo()]));
		}
    }

    if (isset($_GET['delete-subject'])) {
    	$data = $_POST['data'];
        $Query = $function->PDO_SQLQuery("DELETE FROM tbl_subject WHERE id = '{$data[0]}'");
        if($Query->execute()){
	        echo 1;
        }
        else{
	        print_r(json_encode($Query->errorInfo()));
        }
    } 

    if (isset($_GET['delete-section'])) {
    	$data = $_POST['data'];
        $Query = $function->PDO_SQLQuery("DELETE FROM tbl_section WHERE id = '{$data[0]}'");
        if($Query->execute()){
	        echo 1;
        }
        else{
	        print_r(json_encode($Query->errorInfo()));
        }
    }    

	if(isset($_GET['set-studentInfo'])){
		$data = $_POST['data'];
        $id = $function->PDO_IDGenerator('tbl_studentinfo','id');

		$family_name = $data[0]['value'];
		$given_name = $data[1]['value'];
		$middle_name = $data[2]['value'];
		$gender = $data[7]['value'];
		$date_of_birth = $data[4]['value'];
		$place_of_birth = $data[5]['value'];
		$permanent_address = $data[6]['value'];
		$citizenship = $data[8]['value'];
		$height = $data[9]['value'];
		$weight = $data[10]['value'];
		$mother_name = $data[12]['value'];
		$father_name = $data[11]['value'];
		$picture = 'avatar.jpg';
		$date = $function->PDO_DateAndTime();
		$studentid = $data[13]['value'];
		$educ_year = $data[14]['value'];
		$educ_section = $data[15]['value'];

		$query = $function->PDO(false,"INSERT INTO  tbl_studentinfo(id,family_name,given_name,middle_name,gender,date_of_birth,place_of_birth,permanent_address,citizenship,height,weight,mother_name,father_name,picture,student_id,`date`) VALUES ('{$id}','{$family_name}','{$given_name}','{$middle_name}','{$gender}','{$date_of_birth}','{$place_of_birth}','{$permanent_address}','{$citizenship}','{$height}','{$weight}','{$mother_name}','{$father_name}','{$picture}','{$studentid}','{$date}'); INSERT INTO  tbl_student(id,student_id,year,section,`date`) VALUES ('{$id}','{$studentid}','{$educ_year}','{$educ_section}','{$date}')");
		if($query->execute()){
			echo 1;
		}
		else{
			$Data = $query->errorInfo();
			print_r($Data);
		}
	}
	if(isset($_GET['get-validateStudentID'])){
	    $data = $_POST['data'];
		$query = count($function->PDO(true,"SELECT * FROM tbl_studentinfo WHERE studentid = '{$data}'"));
		echo $query==0 ? "true" : "false";
	}

?>