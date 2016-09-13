<?php
	require_once('dbAuth.php');
	session_start();

	function favoriteList(){
		$response = array();
		$db = getPDO();
		$sql = "SELECT Recruit.id, Recruit.boss, Occupation.occupation, Location.location,
				Recruit.workingTime, Recruit.level, Recruit.experience, Recruit.salary
				FROM Recruit
				JOIN Favorite ON Favorite.recruit = Recruit.id AND Favorite.user = ?
				JOIN Occupation ON Recruit.occupation = Occupation.id
				JOIN Location ON Recruit.location = Location.id";
		$sth = $db->prepare($sql);
		if($_SESSION['loginData']['type'] == 'user'){
			$sth->execute(array($_SESSION['loginData']['id']));
		}

		foreach($sth as $r){
			if($_SESSION['loginData']['type'] == 'user'){
				$userSql = "SELECT
							(CASE WHEN EXISTS(SELECT * FROM Apply WHERE user = ? AND recruit = ?)
														THEN 1 ELSE 0 END) AS apply";
				$userSth = $db->prepare($userSql);
				$userSth->execute(array($_SESSION['loginData']['id'], $r['id']));
				foreach($userSth as $c){
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
								'favorite' => true,
								'apply' => $apply);
		}
		return $response;
	}
	echo json_encode(favoriteList());
?>
