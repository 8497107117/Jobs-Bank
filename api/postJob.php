<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function postJob($occupation, $location, $workingTime, $level, $experience, $salary){
		if($_SESSION['loginData']['type']!='boss'){
			$response = array("success" => false);
			return $response;
		}
		$db = getPDO();
		$sql = "SELECT id FROM Occupation WHERE occupation = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($occupation));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$occupation = $result['id'];

		$sql = "SELECT id FROM Location WHERE location = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($location));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$location = $result['id'];

		$sql = "INSERT INTO Recruit (boss, occupation, location, workingTime, level, experience, salary)
							VALUES(?, ?, ?, ?, ?, ?, ?)";
		$sth = $db->prepare($sql);
		$sth->execute(array($_SESSION['loginData']['id'], $occupation, $location, $workingTime,
							$level, $experience, $salary));
		$response = array("success" => true, "id" => $db->lastInsertId());

		return $response;
	}

	echo json_encode(postJob($obj->data->occupation, $obj->data->location, $obj->data->workingTime,
							$obj->data->level, $obj->data->experience, $obj->data->salary));
?>
