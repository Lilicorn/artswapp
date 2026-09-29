function loadingstuff(){
   if( window.innerWidth <= 513 ){
    generatecards("recommendedusersfull", 15, "");
   }
   else generatecards("recommendedusersfull", 30, "");

    colorrandomizer();
}

window.addEventListener("load", loadingstuff);