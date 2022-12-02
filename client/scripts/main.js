function clicMenuGauche(lien){
    lien.style.color = "#F00";
    lien.innerText += " cliqué!"
}

function noLoginAlert(status){
    document.getElementById("noLoginAlert").style ="display:block";
    if (status == 401){
        document.getElementById("noLoginAlert").innerHTML = "Vous devez être connecté pour accéder à cette fonctionnalité";
    }
    else{
        document.getElementById("noLoginAlert").innerHTML = "Vous n'avez pas de produit dans votre panier";
    }
    setTimeout(() => {document.getElementById("noLoginAlert").style = "display:none";},4000);
}
var ID_CLIENT = window.localStorage.getItem('idClient');
var TOKEN_CLIENT = window.localStorage.getItem('tokenClient');

initialize();
