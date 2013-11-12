<?php

$str=file_get_contents("vars.txt");
$vals=explode(":",$str);
$y=$vals[0];
$z=$vals[1];

echo $y.":".$z;
?>