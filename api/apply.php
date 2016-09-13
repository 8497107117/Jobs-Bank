<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function apply($recruit){
		if($_SESSION['loginData']['type']!='user'){
			$response = array("success" => false);
			return $response;
		}
		$db = getPDO();
		$sql = "INSERT INTO Apply (recruit, user) VALUES(?, ?)";
		$sth = $db->prepare($sql);
		$sth->execute(array($recruit, $_SESSION['loginData']['id']));

		$response = array("success" => true, "apply" => true);

		return $response;
	}
	echo json_encode(apply($obj->recruit));
?>
