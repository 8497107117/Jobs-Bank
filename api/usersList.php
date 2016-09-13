<?php
	require_once('dbAuth.php');
	session_start();

	function getUserList(){
		if($_SESSION['loginData']['type']!='boss'){
			$response = array('success' => false);
			return $response;
		}
		$db = getPDO();
		$sql = "SELECT * FROM User";
		$sth = $db->prepare($sql);
		$sth->execute();

		$response['success'] = true;
		foreach($sth as $r){
			$speSql = "SELECT Specialty.specialty
						FROM UserSpecialty
						JOIN Specialty ON UserSpecialty.specialty = Specialty.id
						WHERE user = ?";
			$speSth = $db->prepare($speSql);
			$speSth->execute(array($r['id']));

			foreach($speSth as $c){
				$specialty[] = $c['specialty'];
			}

			$response[] = array('id' => $r['id'],
								'name' => $r['account'],
								'level' => $r['level'],
								'salary' => $r['expectedSalary'],
								'phone' => $r['phone'],
								'gender' => $r['gender'],
								'age' => $r['age'],
								'email' => $r['email'],
								'speicialty' => $specialty);

			unset($specialty);
		}
		return $response;
	}
	echo json_encode(getUserList());
?>
