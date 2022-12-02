function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function noLoginAlert(){
    document.getElementById("noLoginAlert").style ="display:block";
    setTimeout(() => {document.getElementById("noLoginAlert").style = "display:none";},4000);
}
var ID_CLIENT = window.localStorage.getItem('idClient');
var TOKEN_CLIENT = window.localStorage.getItem('tokenClient');

initialize();