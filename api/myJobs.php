<?php
	require_once('dbAuth.php');
	session_start();

	function myJobs(){
		if($_SESSION['loginData']['type']!='boss'){
			$response = array("success" => false);
			return $response;
		}

		$db = getPDO();
		$sql = "SELECT Recruit.id, Recruit.boss, Occupation.occupation, Location.location,
				Recruit.workingTime, Recruit.level, Recruit.experience, Recruit.salary
				FROM Recruit
				JOIN Occupation ON Recruit.occupation = Occupation.id
				JOIN Location ON Recruit.location = Location.id
				WHERE Recruit.boss = ?";
		$sth = $db->prepare($sql);
		$sth->execute(array($_SESSION['loginData']['id']));

		$response['success'] = true;
		foreach($sth as $r){
			$userSql = "SELECT User.id, User.account, User.level, User.expectedSalary, User.phone, User.gender, User.age, User.email FROM User
						JOIN Apply ON Apply.user = User.id AND Apply.recruit = ?
						ORDER BY user";
			$userSth = $db->prepare($userSql);
			$userSth->execute(array($r['id']));
			foreach($userSth as $c){
				$speSql = "SELECT Specialty.specialty
							FROM UserSpecialty
							JOIN Specialty ON UserSpecialty.specialty = Specialty.id
							WHERE user = ?";
				$speSth = $db->prepare($speSql);
				$speSth->execute(array($c['id']));
				foreach($speSth as $l){
					$specialty[] = $l['specialty'];
				}
				$user[] = array('id' => $c['id'],
								'user' => $c['account'],
								'level' => $c['level'],
								'salary' => $c['expectedSalary'],
								'phone' => $c['phone'],
								'gender' => $c['gender'],
								'age' => $c['age'],
								'email' => $c['email'],
								'specialty' => $specialty);

				unset($specialty);
			}
			$response[] = array('id' => $r['id'],
								'boss' => $r['boss'],
								'occupation' => $r['occupation'],
								'location' => $r['location'],
								'workingTime' => $r['workingTime'],
								'level' => $r['level'],
								'experience' => $r['experience'],
								'salary' => $r['salary'],
								'whoApply' => $user);

			unset($user);
		}

		return $response;
	}
	echo json_encode(myJobs());
?>
