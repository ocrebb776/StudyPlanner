<?php
function whitelist($str,$allowed,$newLine = false,$debug = false){
    //split the allowed sting
    $allowed = "qwertyuiopasdfghjklzxcvbnm1234567890QW*ERTYUIOPASDFGHJKLZXCVBNM!£$%&?(),_-+=,.<>#: /@";
$split = str_split($allowed);
//split the inputed string
$str = str_split($str);
$list = [];
$list2 = [];
foreach($str as $a){
    //if the item is not in the list , or the item is a EOL and newlines are not allowed
   if(!in_array($a,$split) && !(( $a == "\n" )&& $newLine) && (mb_ord($a) != 10 && $newLine)){
    //echo the element
    $list2[]= mb_ord($a) == 10;
   }else{
    //add it to the list
$list[]=$a;
   }

}
if($debug){
print_r($list2);
}
//reutn the list
return join("",$list);
}
