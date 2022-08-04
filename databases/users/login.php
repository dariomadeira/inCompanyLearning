<?php
	header('Content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");
	require_once('../../libs/conexion.php');
	if (isset($_POST['val1']) && isset($_POST['val2'])) {
		$user = trim($_POST['val1']);
		$pass = trim($_POST['val2']);
		$jsondata = array();
		$conexion = Conectarse();
		$que ="SELECT * FROM users WHERE user = '".$user."' ORDER BY ID ASC";
		$res = mysql_query($que, $conexion);
		$total = mysql_num_rows ($res);
		if($total == 0) {
			$jsondata['status'] = "0";
			echo json_encode($jsondata);
			die(mysql_error());
		} else {
			while($fila=mysql_fetch_array($res)){
				$checkuser = $fila['user'];
				$checkpass = $fila['password'];
				if (($checkuser == $user) && ($checkpass == $pass)) {
					$jsondata['status'] = "1";
					$jsondata['ID'] = $fila['ID'];
					$jsondata['user'] = $checkuser;
					$jsondata['pass'] = $checkpass;
					$jsondata['name'] = $fila['name'];
					$jsondata['lastname'] = $fila['lastName'];
					$jsondata['phone'] = $fila['phone'];
					$jsondata['mail'] = $fila['email'];
					$jsondata['is_teacher'] = $fila['isTeacher'];
					$jsondata['is_admin'] = $fila['isAdmin'];
					date_default_timezone_set("America/Argentina/San_Luis");
					$today = date("d/m/Y");
					$timeNow = date("H:i:s");
					$fecha_actual = $today." a las ".$timeNow;
					$que2 = "UPDATE Users SET timestamp='".$fecha_actual."' WHERE ID = '".$fila['ID']."'";
					$res2 = mysql_query($que2, $conexion) or die(mysql_error());
					if (is_bool($res2) === false) {
						mysql_free_result($res2);
					}
				}
			}
			if (is_bool($res) === false) {
				mysql_free_result($res);
			}
			echo json_encode($jsondata);
		}
	}
?>