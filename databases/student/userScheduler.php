<?php
	header('Content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");
	require_once('../../libs/conexion.php');
	if (isset($_POST['val1'])) {
		$user = trim($_POST['val1']);
		$jsondata = array();
    $i=0;
		$conexion = Conectarse();
		$que ="SELECT * FROM schedule WHERE ID_users = '".$user."' ORDER BY ID ASC";
		$res = mysql_query($que, $conexion);
		$total = mysql_num_rows ($res);
		if($total == 0) {
			$jsondata['status'] = "0";
			echo json_encode($jsondata);
			die(mysql_error());
		} else {
			while($fila=mysql_fetch_array($res)) {
        $jsondata[$i]['ID'] = $fila['ID'];
        $jsondata[$i]['ID_users'] = $fila['ID_users'];
        $jsondata[$i]['date'] = $fila['date'];
        $jsondata[$i]['hours'] = $fila['hours'];
        $jsondata[$i]['startHour'] = $fila['startHour'];
        $jsondata[$i]['finishHour'] = $fila['finishHour'];
        $i = $i + 1;
			}
			if (is_bool($res) === false) {
				mysql_free_result($res);
			}
			echo json_encode($jsondata);
		}
	}
?>