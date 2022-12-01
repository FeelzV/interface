function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}
console.log(window.localStorage.getItem('idClient'));
var ID_CLIENT = window.localStorage.getItem('idClient');
var TOKEN_CLIENT = window.localStorage.getItem('tokenClient');
//window.onload(initialize());