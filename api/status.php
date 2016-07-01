<?php
	session_start();

	function status(){
		if(isset($_SESSION['loginData'])){
			$response = array(
				"success" => true,
				"isLogin" => true,
				"name" => $_SESSION['loginData']['account'],
				"type" => $_SESSION['loginData']['type']);
		}
		else{
			$response = array("success" => true, "isLogin" => false);
		}
		return $response;
	}

	echo json_encode(status());
?>
