
import React from 'react'

const typetdv = document.getElementsByClassName("typetdv").value;
if(!typetdv){
    typetdv= "a";
}

export default function Stats() {
    console.log(typetdv)
  return (
    <p>{typetdv}</p>
  )
}


