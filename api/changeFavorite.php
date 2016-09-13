<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function changeFavorite($recruit){
		if($_SESSION['loginData']['type']!='user'){
			$response = array("success" => false);
			return $response;
		}
		$db = getPDO();
		$sql = "SELECT (CASE WHEN EXISTS(SELECT * FROM Favorite WHERE recruit = ? AND user = ?) THEN 1 ELSE 0 END) AS favorite";
		$sth = $db->prepare($sql);
		$sth->execute(array($recruit, $_SESSION['loginData']['id']));
		$result = $sth->fetch(PDO::FETCH_ASSOC);
		$favorite = $result['favorite'];

		if($favorite == 0){
			$sql = "INSERT INTO Favorite (recruit, user) VALUES(?, ?)";
			$sth = $db->prepare($sql);
			$sth->execute(array($recruit, $_SESSION['loginData']['id']));

			$response = array("success" => true, "favorite" => true);
		}
		else{
			$sql = "DELETE FROM Favorite WHERE recruit = ? and user = ?";
			$sth = $db->prepare($sql);
			$sth->execute(array($recruit, $_SESSION['loginData']['id']));

			$response = array("success" => true, "favorite" => false);
		}

		return $response;
	}
	echo json_encode(changeFavorite($obj->recruit));
?>
