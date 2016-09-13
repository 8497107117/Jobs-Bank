<?php
	require_once('dbAuth.php');
	session_start();

	function getOccLoc(){
		$db = getPDO();
		$sql = "SELECT occupation FROM Occupation";
		$sth = $db->prepare($sql);
		$sth->execute();

		foreach($sth as $r){
			$occupation[] = $r['occupation'];
		}

		$sql = "SELECT location FROM Location";
		$sth = $db->prepare($sql);
		$sth->execute();

		foreach($sth as $r){
			$location[] = $r['location'];
		}

		$response = array('occupation' => $occupation, 'location' => $location);

		return $response;
	}

	echo json_encode(getOccLoc());
?>
