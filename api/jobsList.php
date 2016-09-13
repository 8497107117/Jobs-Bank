<?php
	require_once('dbAuth.php');
	session_start();

	function getList(){
		$response = array();
		$db = getPDO();
		$sql = "SELECT Recruit.id, Recruit.boss, Occupation.occupation, Location.location,
				Recruit.workingTime, Recruit.level, Recruit.experience, Recruit.salary
				FROM Recruit
				JOIN Occupation ON Recruit.occupation = Occupation.id
				JOIN Location ON Recruit.location = Location.id";
		$sth = $db->prepare($sql);
		$sth->execute();

		foreach($sth as $r){
			$favorite = false;
			$apply = false;
			$edit = $_SESSION['loginData']['type'] == 'boss' && $_SESSION['loginData']['id'] == $r['boss'];
			if($_SESSION['loginData']['type'] == 'user'){
				$userSql = "SELECT
							(CASE WHEN EXISTS(SELECT * FROM Favorite WHERE user = ? AND recruit = ?)
														THEN 1 ELSE 0 END) AS favorite,
							(CASE WHEN EXISTS(SELECT * FROM Apply WHERE user = ? AND recruit = ?)
														THEN 1 ELSE 0 END) AS apply";
				$userSth = $db->prepare($userSql);
				$userSth->execute(array($_SESSION['loginData']['id'], $r['id'], $_SESSION['loginData']['id'], $r['id']));
				foreach($userSth as $c){
					$favorite = $c['favorite'] == 1 ? true : false;
					$apply = $c['apply'] == 1 ? true : false;
				}
			}
			$response[] = array('id' => $r['id'],
								'boss' => $r['boss'],
								'occupation' => $r['occupation'],
								'location' => $r['location'],
								'workingTime' => $r['workingTime'],
								'level' => $r['level'],
								'experience' => $r['experience'],
								'salary' => $r['salary'],
								'favorite' => $favorite,
								'apply' => $apply,
								'edit' => $edit,
								'editPattern' => false);
		}
		return $response;
	}
	echo json_encode(getList());
?>
