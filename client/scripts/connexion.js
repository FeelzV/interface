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

function connecter(courriel = null, mdp = null){
    $.ajax({
        url:"/connexion",
        method:"POST",
        data:{
            "courriel": courriel==null?document.getElementById('courriel').value:courriel,
            "mdp": mdp==null?document.getElementById('mdp').value:mdp
        },
        success: function( result ) {
            ID_CLIENT = result.idClient;
            TOKEN_CLIENT = result.token;
            window.localStorage.clear()
            window.localStorage.setItem('idClient', ID_CLIENT);
            window.localStorage.setItem('tokenClient', TOKEN_CLIENT);
            window.location.href = "#/";
            document.getElementById("connexion").innerHTML = "Deconnexion";

            if(ID_CLIENT == 0){
                document.getElementById("adminPage").style.display = "block";
                document.getElementById("idPanier").style.display = "none";
            }
            updatepaniertooltip();
        },
        error: function(result){
            alert("Connexion invalide")
        }
    });
}
function initialize()
{

    if(ID_CLIENT != 0){
        document.getElementById("adminPage").style.display = "none";
        document.getElementById("idPanier").style.display = "block";
    }
    else{
        document.getElementById("adminPage").style.display = "block";
        document.getElementById("idPanier").style.display = "none";
    }

    if(ID_CLIENT == -1){

        document.getElementById("connexion").innerHTML = "Connexion";
    }
    else{
        console.log("Decotext")
        document.getElementById("connexion").innerHTML = "Deconnexion";
    }
    
}

function deconnection()
{

    if(ID_CLIENT == 0){
        document.getElementById("adminPage").style.display = "none";
        document.getElementById("idPanier").style.display = "block";
    }

    console.log(window.localStorage.getItem('idClient'))

    if(ID_CLIENT  == -1)
    {
        window.location.href = "#/connexion";
    }
    else
    {
        document.getElementById("connexion").innerHTML = "Connexion";
        window.location.href = "#/";
        ID_CLIENT = -1;
        TOKEN_CLIENT = null;
        window.localStorage.clear();
        window.localStorage.setItem('idClient', ID_CLIENT);
        window.localStorage.setItem('tokenClient', TOKEN_CLIENT);
    }
    updatepaniertooltip();
}

/**
 * Fonction qui initie le lancement des fonctions de ce script. Appel??e par "chargerSousContenu" dans navigation.js.
 * Remplace le DOMContentLoaded qui est lanc?? bien avant que le contenu associ?? ?? ce script ne soit dans l'??cran.
 * @returns {Promise<void>}
 */
async function chargerconnexion (){
    attacherListenerMenuGauche()
}
