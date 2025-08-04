//RECUPERATION DU BOUTON D'AJOUT:
var bout = document.querySelector("button");

//FONTION POUR SAUVEGARDER LES DONNEES DANS LE LOCALSTORAGE
function sauvegarder(){
    const taches = [];
    document.querySelectorAll("ul li").forEach(li => {
        taches.push({
            texte: li.childNodes[0].nodeValue.trim(),
            complete: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("todolist",JSON.stringify(taches));
}

//FONCTION POUR CHARGER LES TACHES DEPUIS LE LOCALSTOGARE
function chargerTaches(){
    const data = localStorage.getItem("todolist");
    if(data){
        const taches = JSON.parse(data);
        taches.forEach(t => {
            ajouterTache(t.texte, t.complete);
        })
    }
}



//AJOUT D'UN EVENEMENT CLICK AU BOUTON Ajouter:
bout.addEventListener("click",afficher);

//FONCTION D'AFFICHAGE PRINCIPALE
function afficher(){
    
    //RECUPER LA VALEUR ENTREE DANS LE CHAMP INPUT
    var text = document.getElementById("text").value;
    
    //TEST SI LA VALEUR ENTREE EST VIDE OU PAS
    if(text == ""){
alert("Veuillez remplir le champ")
   }else{
    //RECUPERATION DE L'ELEMENT li
    var ul = document.querySelector("ul");
    
    //CREATION D'UN ELEMENT li 
    var li = document.createElement("li");
    
    //AJOUT DU TEXTE ENTRE PAR L'UTILISATEUR DANS L'ELEMENT li
   ajouterTache(text,false);
   
   

} }
 

// FONCTION POUR CREER UNE TACHE
function ajouterTache(text, complete) {
   
     //RECUPERATION DE L'ELEMENT ul
    var ul = document.querySelector("ul");

    //CREATION D'UN ELEMENT li 
    var li = document.createElement("li");

     //AJOUT DU TEXTE ENTRE PAR L'UTILISATEUR DANS L'ELEMENT li
    li.innerHTML = text;

    // CREATION D'UN BOUTON SUPPRIMER
    var sup = document.createElement("button");
    sup.classList = "sup";
    sup.innerHTML = "Supprimer";

    //CREATTION D'UN ELEMENT checkbox
    var check = document.createElement("input");
    check.type = "checkbox";
    check.classList = "check";
    
    //POUR BARRER UN ELEMENT
    if (complete) {
        li.style.textDecoration = "line-through";
        check.checked = true;
    }

    // CREATION D'UN BOUTON MODIFIER
    var modif = document.createElement("button");
    modif.classList = "modif";
    modif.innerHTML = "Modifier";

    //INSERTION DES BOUTONS SUPPRIMER ET MODIFIER DANS LA LISTE
    li.appendChild(check);
    li.appendChild(sup);
    ul.appendChild(li);
    ul.appendChild(modif);

    //AJOUT D'UN EVENEMENT CLICK AU BOUTON SUPPRIMER
    sup.addEventListener("click", () => {

       //SUPRESSION DE LA TACHE ET DU BOUTON Modifier
        li.remove();
        modif.remove();
       
        //SAUVEGARDE
        sauvegarder();
    });

        //AJOUT D'UN EVENEMENT CLICK AU BOUTON MODIFIER 
        modif.addEventListener("click", () => {
        
        //SUPRESSION DU BOUTON Modifier, DU BOUTON Supprimer ET DU checkbox
        modif.remove();
        sup.remove();
        check.remove();
        
        //CREATION DE L'ELEMENT INPUT ET BOUTON RESPECTIVEMENT POUR LA NOUVELLE VALEUR ET POUR ENREGISTRER
        var input = document.createElement("input");
        input.type = "text";
        input.classList = "input2";
        input.value = text;
        var bout2 = document.createElement("button");
        bout2.classList = "enreg";
        bout2.innerHTML = "Enrégistrer";
        
        //AJOUT DE L'ELEMENT INPUT CREE ET DU BOUTON Enrégistrer SUR LA LISTE
        li.innerHTML = "";
        li.appendChild(input);
        li.appendChild(bout2);

        //AJOUT D'UN EVENEMENT CLICK AU BOUTON Enrégistrer
        bout2.addEventListener("click", () => {
           
        //INSERTION DE LA NOUVELLE TACHE DANS LA LISTE
            li.innerHTML = input.value;
            text = input.value;
            
        //AJOUT DES ELEMENTS Supprimer et Checkbox 
            li.appendChild(check);
            li.appendChild(sup);
       
        //SAUVEGARDE
            sauvegarder();
        });
    });
        //AJOUT D'UN EVENEMENT CLICK SUR LE Checkbox
    check.addEventListener("click", () => {
        if (check.checked) {
            li.style.textDecoration = "line-through";
            li.style.backgroundColor="lightgray";
            li.style.color="grey";
        } else {
            li.style.textDecoration = "none";
            li.style.backgroundColor="rgba(223, 215, 215, 0.849)";
            li.style.color="black";
        }
        sauvegarder();
    });
    
        // CHAQUE FOIS QU'UNE TACHE EST AJOUTEE
        sauvegarder(); 
}


//CHARGER LES DONNEES
window.onload = chargerTaches;