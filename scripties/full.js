function loadingstuff(){
   if( window.innerWidth <= 513 ){
    generatecards("recommendedusersfull", 15, "", "full");
   }
   else generatecards("recommendedusersfull", 30, "", "full");

    colorrandomizer();
}

window.addEventListener("load", loadingstuff);