<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function deleteJob($recruit){
		if($_SESSION['loginData']['type']!='boss'){
			$response = array("success" => false);
			return $response;
		}
		$db = getPDO();
		$sql = "DELETE FROM Recruit WHERE Recruit.id = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($recruit));

		$response = array("success" => true);

		return $response;
	}
	echo json_encode(deleteJob($obj->recruit));
?>
