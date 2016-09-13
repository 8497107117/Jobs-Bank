<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function userRegister($name, $pass, $phone, $email, $gender, $age, $salary, $level, $specialty){
		$db = getPDO();
		$sql = "INSERT INTO User (account, password, level, expectedSalary, phone, gender, age, email) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
		$sth = $db->prepare($sql);
		$sth->execute(array($name, hash(SHA256, $pass), $level, $salary, $phone, $gender, $age, $email));

		$sql = "SELECT id FROM User WHERE account = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($name));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$id = $result['id'];

		$tmp = explode(",", $specialty);
		sort($tmp);
		foreach($tmp as $r){
			$sql = "INSERT INTO UserSpecialty (user, specialty) VALUES(?, ?)";
			$sth = $db->prepare($sql);
			$sth->execute(array($id, $r));
		}
		$response = array("success" => true);

		return $response;
	}

	echo json_encode(userRegister($obj->name, $obj->password, $obj->phone, $obj->email,
					$obj->gender, $obj->age, $obj->salary, $obj->level, $obj->specialty));
?>
