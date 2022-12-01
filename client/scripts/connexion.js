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

function connecter(){
    console.log("ok")
    $.ajax({
        url:"/connexion",
        method:"POST",
        data:{
            "courriel": document.getElementById('courriel').value,
            "mdp": document.getElementById('mdp').value
        },
        success: function( result ) {
            //ID_CLIENT = result.items[0].id;
            console.log(result.items);
            //TODO Changer le texte de connexion pour client.prenom/nom et client présent = client.id
        },
        error: function(result){
            alert("Connexion invalide")
        }
    });
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appelée par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lancé bien avant que le contenu associé à ce script ne soit dans l'écran.
 * @returns {Promise<void>}
 */
async function chargerconnexion (){
    attacherListenerMenuGauche()
}
