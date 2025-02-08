<?php
function whitelist($str,$allowed,$newLine = false){
    //split the allowed sting
$split = str_split($allowed);
//split the inputed string
$str = str_split($str);
$list = [];
foreach($str as $a){
    //if the item is not in the list , or the item is a EOL and newlines are not allowed
   if(!in_array($a,$split) && !($a == "\n" && $newLine)){
    //echo the element
    echo "$a";
   }else{
    //add it to the list
$list[]=$a;
   }

}
print_r($list);
//reutn the list
return join("",$list);
}
