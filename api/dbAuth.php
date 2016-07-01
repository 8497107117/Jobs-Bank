<?php
	require_once("dbAuthInformation.php");

	function getPDO(){
		try{
			$dsn = "mysql:host=".dbHost.";dbname=".dbName;
			$db = new PDO($dsn, dbUser, dbPassword);
			return $db;
		}catch(PDOException $e){
			echo "Error : %s". $e->getMessage();
		}
	}
?>
