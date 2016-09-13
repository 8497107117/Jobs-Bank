<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function checkName($name){
		$db = getPDO();
		$bossSql = "SELECT count(*) FROM Boss WHERE account = ?";
		$bossSth = $db->prepare($bossSql);
		$bossSth->execute(array($name));
		$userSql = "SELECT count(*) FROM User WHERE account = ?";
		$userSth = $db->prepare($userSql);
		$userSth->execute(array($name));

		if($bossSth->fetch()[0] || $userSth->fetch()[0]){
			$response = array("exist" => true);
		}
		else{
			$response = array("exist" => false);
		}

		return $response;
	}

	echo json_encode(checkName($obj->name));
?>
