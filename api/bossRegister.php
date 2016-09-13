<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function bossRegister($name, $pass, $phone, $email){
		$db = getPDO();
		$sql = "INSERT INTO Boss (account, password, phone, mail) VALUES(?, ?, ?, ?)";
		$sth = $db->prepare($sql);
		$sth->execute(array($name, hash(SHA256, $pass), $phone, $email));
		$response = array("success" => true);

		return $response;
	}

	echo json_encode(bossRegister($obj->name, $obj->password, $obj->phone, $obj->email));
?>
