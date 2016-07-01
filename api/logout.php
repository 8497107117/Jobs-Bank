<?php
	session_start();

	function logout(){
		if(isset($_SESSION['loginData'])){
			$response = array("success" => true);
			unset($_SESSION['loginData']);
		}
		else{
			$response = array("success" => false);
		}
	}

	echo json_encode(logout());
?>
