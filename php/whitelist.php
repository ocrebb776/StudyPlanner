<?php
function whitelist($str,$allowed){
$split = str_split($allowed);
$str = str_split($str);
$list = [];
foreach($str as $a){
    if(in_array($a,$split)){
        $list[] = $a;
    }
}
return join("",$list);
}
?>