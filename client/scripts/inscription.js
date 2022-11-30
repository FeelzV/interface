function menuGaucheClic(lien){
    let menu = document.getElementById('menu-gauche');
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].classList.remove("choisi")
    }
    lien.classList.add("choisi");
}

function attacherListenerMenuGauche(){
    let menu = document.getElementById("menu-gauche");
    let liens = menu.children;
    for (let i = 0 ; i<liens.length ; i++){
        liens[i].addEventListener('click', function(){
            menuGaucheClic(liens[i])
        });
    }
}

var check = function() {
    if (document.getElementById('mdp').value == document.getElementById('confirmation').value)
    {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Identique';
    } 
    else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Pas identique';
    }
}

function ajouterClient(){
    $.ajax({
        url:"/clients",
        method:"POST",
        data:{
            "prenom": document.getElementById('prenom').value,
            "nom": document.getElementById('nom').value,
            "age": document.getElementById('age').value,
            "adresse": document.getElementById('adresse').value,
            "pays": document.getElementById('pays').value,
            "courriel": document.getElementById('courriel').value,
            "mdp": document.getElementById('mdp').value
        },
        success: function( result ) {
            alert("Votre inscription est valide")
            //TODO Changer le texte de connexion pour client.prenom/nom et client présent = client.id
        },
        error: function(result){
            alert("Inscription invalide l'un des champs remplie n'est pas bon")
        }
    });
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerinscription (){
    attacherListenerMenuGauche()
}
