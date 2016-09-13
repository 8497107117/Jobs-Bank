<?php
	session_start();

	function status(){
		if(isset($_SESSION['loginData'])){
			$response = array(
				"isLogin" => true,
				"id" => $_SESSION['loginData']['id'],
				"name" => $_SESSION['loginData']['account'],
				"type" => $_SESSION['loginData']['type']);
		}
		else{
			$response = array(
				"isLogin" => false,
				"id" => "",
				"name" => "",
				"type" => "");
		}
		return $response;
	}

	echo json_encode(status());
?>
