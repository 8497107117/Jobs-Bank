<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function editJob($recruit, $data){
		if($_SESSION['loginData']['type']!='boss'){
			$response = array("success" => false);
			return $response;
		}
		$db = getPDO();
		$sql = "SELECT id FROM Occupation WHERE occupation = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($data->occupation));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$occupation = $result['id'];
		$sql = "SELECT id FROM Location WHERE location = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($data->location));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$location = $result['id'];
		$sql = "UPDATE Recruit SET occupation = ?, location = ?, workingTime = ?, level = ?, experience = ?, salary = ?
				WHERE Recruit.id = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($occupation, $location, $data->workingTime,
							$data->level, $data->experience, $data->salary, $data->id));

		$response = array("success" => true);

		return $response;
	}
	echo json_encode(editJob($obj->recruit, $obj->data));
?>
