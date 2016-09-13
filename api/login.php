<?php
	require_once('dbAuth.php');
	session_start();

	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	function login($name, $pass){
		$db = getPDO();
		$userSql = "SELECT * FROM User WHERE account = ? and password = ?";
		$userSth = $db->prepare($userSql);
		$userSth->execute(array($name, hash(SHA256, $pass)));
		$userResult = $userSth->fetch();
		$bossSql = "SELECT * FROM Boss WHERE account = ? and password = ?";
		$bossSth = $db->prepare($bossSql);
		$bossSth->execute(array($name, hash(SHA256, $pass)));
		$bossResult = $bossSth->fetch();

		if($userResult){
			$_SESSION['loginData'] = array(
				'id' => $userResult['id'],
				'account' => $userResult['account'],
				'type' => 'user');
			$response = array("success" => true);
		}
		else if($bossResult){
			$_SESSION['loginData'] = array(
				'id' => $bossResult['id'],
				'account' => $bossResult['account'],
				'type' => 'boss');
			$response = array("success" => true);
		}
		else{
			$response = array("success" => false);
		}

		return $response;
	}
	echo json_encode(login($obj->name, $obj->password));
?>
