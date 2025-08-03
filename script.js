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
    var ul = document.querySelector("ul");
    var li = document.createElement("li");
    li.innerHTML = text;

    var sup = document.createElement("button");
    sup.classList = "sup";
    sup.innerHTML = "Supprimer";

    var check = document.createElement("input");
    check.type = "checkbox";
    check.classList = "check";
    if (complete) {
        li.style.textDecoration = "line-through";
        check.checked = true;
    }

    var modif = document.createElement("button");
    modif.classList = "modif";
    modif.innerHTML = "Modifier";

    li.appendChild(check);
    li.appendChild(sup);
    ul.appendChild(li);
    ul.appendChild(modif);

    sup.addEventListener("click", () => {
        li.remove();
        modif.remove();
        sauvegarder();
    });

    modif.addEventListener("click", () => {
        modif.remove();
        sup.remove();
        check.remove();

        var input = document.createElement("input");
        input.type = "text";
        input.classList = "input2";
        input.value = text;

        var bout2 = document.createElement("button");
        bout2.classList = "enreg";
        bout2.innerHTML = "Enrégistrer";

        li.innerHTML = "";
        li.appendChild(input);
        li.appendChild(bout2);

        bout2.addEventListener("click", () => {
            li.innerHTML = input.value;
            text = input.value;
            li.appendChild(check);
            li.appendChild(sup);
           
            sauvegarder();
        });
    });

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

    sauvegarder(); // chaque fois qu'une tâche est ajoutée
}





//CHARGER LES DONNEES
window.onload = chargerTaches;