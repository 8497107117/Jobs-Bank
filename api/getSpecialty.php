<?php
	require_once('dbAuth.php');
	session_start();

	function getSpecialty(){
		$db = getPDO();
		$sql = "SELECT specialty FROM Specialty";
		$sth = $db->prepare($sql);
		$sth->execute();

		foreach($sth as $r){
			$response[] = $r['specialty'];
		}

		return $response;
	}

	echo json_encode(getSpecialty());
?>
