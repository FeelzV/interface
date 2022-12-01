function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

var ID_CLIENT = window.localStorage.getItem('idClient');
var TOKEN_CLIENT = window.localStorage.setItem('tokenClient', TOKEN_CLIENT);

initialize();