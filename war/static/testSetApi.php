<?php

$str=file_get_contents("vars.txt");
$vals=explode(":",$str);

$y=$vals[0];
$z=$vals[1];
$y+=$_GET['y'];
$z+=$_GET['z'];

$str=$y.":".$z;
file_put_contents("vars.txt",$str);
?>