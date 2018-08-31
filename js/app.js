const demineur = (function demineur(){
  "use strict";
  const insererLigne = function insererLigne(){
    var ligne = document.createElement("tr");
    const cible = document.getElementById("game");
    return cible.appendChild(ligne);
  };
  var nbJoueurs = 0;
  var playersRandom = []; //joueurs replacés dans l'ordre aléatoire
  var score = [];
  var tour = 1; //le joueur qui doit jouer
  var nbMines = 0;
  var nbMinesATrouver = 0;
  var lignesTotal = 0;
  var colonnesTotal = 0;
  var endgame = false; // bloque la partie A LA FIN
  const insererColonne = function insererColonne(nLigne, i, j) {
    var colonne = document.createElement("td");
    var cellRow = i;
    var cellCol = j;
    colonne.style.width = "30px";
    colonne.style.height = "30px";
    nLigne.appendChild(colonne);
    colonne.classList.add("cell_"+i+"_"+j); //créer des classes permettant d'identifier chaque cellule
    colonne.classList.add("hidden");// classe pour cellules pas encore ouvertes
    colonne.classList.add("noflag");// classe pour cellules sans drapeau
    function placerMine(){ // placer des mines
      var a = Math.random();
      //probabilité que chaque case contienne une mine
      var b = 0.19;

      if (a <= b){
        colonne.classList.add("mine");
        nbMines++;
        nbMinesATrouver++;
      }
    }
    placerMine();

    function nombreCases(){ //combien de cases autour de la case sélectionnée contiennent des mines
      colonne.innerHTML = "0";
      console.log(i);
      console.log(j);
      var nbMinesAutour = 0; //nombre total de mines autour de la case sélectionnée
      //HAUT GAUCHE
      if(i>=1 && j>=1){
        var hautGauche = document.querySelector(".cell_"+(i-1)+"_"+(j-1));
        if(hautGauche.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //HAUT
      if(i>=1){
        var haut = document.querySelector(".cell_"+(i-1)+"_"+j);
        if(haut.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //HAUT DROITE
      if(i>=1 && j<colonnesTotal){
        var hautDroite = document.querySelector(".cell_"+(i-1)+"_"+(j+1));
        if(hautDroite.classList.contains("mine")){
          nbMinesAutour++;
        }
      }

      //DROITE
      if(j<colonnesTotal){
        var droite = document.querySelector(".cell_"+i+"_"+(j+1));
        if(droite.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //BAS DROITE
      if(i<lignesTotal && j<colonnesTotal){
        var basDroite = document.querySelector(".cell_"+(i+1)+"_"+(j+1));
        if(basDroite.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //BAS
      if(i<lignesTotal){
        var bas = document.querySelector(".cell_"+(i+1)+"_"+j);
        if(bas.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //BAS GAUCHE
      if(i<lignesTotal && j>=1){
        var basGauche = document.querySelector(".cell_"+(i+1)+"_"+(j-1));
        if(basGauche.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      //GAUCHE
      if(j>=1){
        var gauche = document.querySelector(".cell_"+i+"_"+(j-1));
        if(gauche.classList.contains("mine")){
          nbMinesAutour++;
        }
      }
      if(nbMinesAutour==0){
        colonne.innerHTML="";


      }
      else{
        colonne.innerHTML=nbMinesAutour;
        if(nbMinesAutour==1){
          colonne.style.color="#0000ff";
        }
        if(nbMinesAutour==2){
          colonne.style.color="#008000";
        }
        if(nbMinesAutour==3){
          colonne.style.color="#ff0000";
        }
        if(nbMinesAutour==4){
          colonne.style.color="#000080";
        }
        if(nbMinesAutour==5){
          colonne.style.color="#800000";
        }
        if(nbMinesAutour==6){
          colonne.style.color="#008888";
        }
        if(nbMinesAutour==7){
          colonne.style.color="#000000";
        }
        if(nbMinesAutour==8){
          colonne.style.color="#808080";
        }
      }
    }
    // document.getElementById("nombreMines").innerHTML="<img src=\"img/mine.png\" alt=\"mines\"> = "+nbMinesATrouver+" / "+nbMines;

    // colonne.oncontextmenu = function (event) { //placer des drapeaux avec le clique droit
    //   if(endgame == false)
    //   {
    //     if(colonne.classList.contains("hidden")){ //placer le drapeau
    //       if(colonne.classList.contains("noflag") && colonne.classList.contains("hidden")){
    //         nbMinesATrouver--;
    //       }
    //       else{
    //         nbMinesATrouver++;
    //       }
    //       colonne.classList.toggle("noflag");
    //       gagnerPartie();
    //     }
    //     else{
    //       //rien
    //     }
    //
    //     document.getElementById("nombreMines").innerHTML="<img src=\"img/mine.png\" alt=\"mines\"> = "+nbMinesATrouver+" / "+nbMines;
    //   }
    //
    //   if(endgame == true){
    //
    //   }
    //   return false
    // }

    colonne.addEventListener("click", function clickCell(){ // quand on clique sur une cellule
      if(endgame == false){
        openCell();
      }

      if(endgame == true){

      }
    });

    // function finDePartie(){ // si partie terminée vérifier les drapeaux mal placés
    //   for(var i = 0; i <= lignesTotal; i++){
    //     for(var j = 0; j <= colonnesTotal; j++){
    //       colonne = document.querySelector(".cell_"+i+"_"+j);
    //       if(colonne.classList.contains("hidden")){
    //         if(colonne.classList.contains("noflag")){ //si pas de drapeau
    //           //afficher toutes les mines
    //           if(colonne.classList.contains("mine")){
    //             colonne.classList.remove("hidden");
    //             colonne.classList.add("show");
    //             colonne.classList.add("finDuGame");
    //           }
    //         }
    //         else{ //si il y a un drapeau
    //           if(colonne.classList.contains("mine")){
    //             //rien
    //           }
    //           else{
    //             console.log("mauvais drapeau case "+i+", "+j);
    //             colonne.classList.add("mauvaisDrapeau");
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    function gagnerPartie(){ //vérifier si le joueur a gagné
      var nbCasesTotal = (lignesTotal+1)*(colonnesTotal+1);
      var tmp = colonne;
      console.log(nbCasesTotal);
      var nbCasesCompletees = 0;
      for(var i = 0; i <= lignesTotal; i++){
        for(var j = 0; j <= colonnesTotal; j++){
          colonne = document.querySelector(".cell_"+i+"_"+j);
          if(colonne.classList.contains("mine")){
            if(colonne.classList.contains("noflag")){
              //rien
            }
            else{
              nbCasesCompletees++;
            }
          }
          else{
            if(colonne.classList.contains("noflag")){
              if(colonne.classList.contains("hidden")){
                //rien
              }
              if(colonne.classList.contains("show")){
                nbCasesCompletees++;
              }
            }
          }
        }
      }
      console.log(nbCasesCompletees);
      if(nbCasesCompletees == nbCasesTotal){
        endgame=true;
        document.getElementById("nombreMines").innerHTML="<img src=\"img/mine.png\" alt=\"mines\"> = FIN DE PARTIE";
        document.getElementById("game").style.border="10px solid lime";
        document.getElementById("nombreMines").style.background="lime";
        document.getElementById("nombreMines").style.color="black";
        document.getElementById("chronometre").style.background="lime";
        document.getElementById("chronometre").style.color="black";
      }
      colonne = tmp;
    }

    function openCell(){ //ouvrir une cellule
      if(colonne.classList.contains("hidden") && colonne.classList.contains("noflag")){
        console.log("case "+i+", "+j);
        colonne.classList.remove("hidden");
        colonne.classList.add("show");
        if (colonne.classList.contains("mine")){ //si on clique sur une mine
          colonne.classList.remove("noflag");
          for (var k = 1; k <= tour; k++){
            if(k==tour){
              score[k-1]++;
              document.getElementById("score"+k).innerHTML=score[k-1];
              colonne.classList.add("flag"+k);
              console.log(k);
            }
          }
        }
        else{
          var compteur = 0;
          tour++;
          if(tour>nbJoueurs){
            tour=1;
          }
          for (var k = 1; k <= tour; k++){
            if(k==tour){
              document.getElementById("nombreMines").innerHTML=playersRandom[k-1];
            }
          }
          nombreCases();
          gagnerPartie();
        }
      }
      if(tour==1){
        document.getElementById("nombreMines").style.background="#FF0000";
        document.getElementById("game").style.border="10px solid #FF0000";
        document.getElementById("chronometre").style.background="#FF0000";
        document.getElementById("chronometre").style.color="white";
      }
      if(tour==2){
        document.getElementById("nombreMines").style.background="#FFFF00";
        document.getElementById("game").style.border="10px solid #FFFF00";
        document.getElementById("chronometre").style.background="#FFFF00";
        document.getElementById("chronometre").style.color="black";
      }
      if(tour==3){
        document.getElementById("nombreMines").style.background="#0000FF";
        document.getElementById("game").style.border="10px solid #0000FF";
        document.getElementById("chronometre").style.background="#0000FF";
        document.getElementById("chronometre").style.color="white";
      }
      if(tour==4){
        document.getElementById("nombreMines").style.background="#00FF00";
        document.getElementById("game").style.border="10px solid #00FF00";
        document.getElementById("chronometre").style.background="#00FF00";
        document.getElementById("chronometre").style.color="black";
      }
      if(tour==5){
        document.getElementById("nombreMines").style.background="#FF8000";
        document.getElementById("game").style.border="10px solid #FF8000";
        document.getElementById("chronometre").style.background="#FF8000";
        document.getElementById("chronometre").style.color="black";
      }
      if(tour==6){
        document.getElementById("nombreMines").style.background="#8000FF";
        document.getElementById("game").style.border="10px solid #8000FF";
        document.getElementById("chronometre").style.background="#8000FF";
        document.getElementById("chronometre").style.color="white";
      }
      if(tour==7){
        document.getElementById("nombreMines").style.background="#00FFFF";
        document.getElementById("game").style.border="10px solid #00FFFF";
        document.getElementById("chronometre").style.background="#00FFFF";
        document.getElementById("chronometre").style.color="black";
      }
      if(tour==8){
        document.getElementById("nombreMines").style.background="#FF0080";
        document.getElementById("game").style.border="10px solid #FF0080";
        document.getElementById("chronometre").style.background="#FF0080";
        document.getElementById("chronometre").style.color="white";
      }
    };


  };


  const resetMatrice = function resetMatrice() {
    document.getElementById("game").innerHTML="";
  };



  const dessinerMatrice = function dessinerMatrice(lignes, colonnes) { //dessine la grille
    endgame=false;
    tour=1;
    document.getElementById("nombreMines").style.background="#FF0000";
    document.getElementById("game").style.border="10px solid #FF0000";
    document.getElementById("chronometre").style.background="#FF0000";
    document.getElementById("chronometre").style.color="white";
    document.getElementById("game").style.border="10px solid red";
    var bouton1 = document.getElementById("btn1");
    var bouton2 = document.getElementById("btn2");
    var bouton3 = document.getElementById("btn3");
    var croix = document.getElementById("croix");

    bouton1.oninput = function modifierNbJoueurs() {
      nbJoueurs = bouton1.value;
      var i = bouton1.value; //nb de joueurs sur le range
      document.getElementById("nbJoueurs").innerHTML=i;
      for (var j = 1; j < 9; j++){
        if(i>=j){
          document.getElementById("textJ"+j).style.visibility="visible";
        }
        else{
          document.getElementById("textJ"+j).style.visibility="hidden";
        }
      }
    };
    bouton3.onclick = function afficherClassement(){
      document.querySelector(".classement").style.visibility="visible";
    };
    croix.onclick = function masquerClassement(){
      document.querySelector(".classement").style.visibility="hidden";
    };

    bouton2.onclick = function creerTableauDeJeu() {
      resetMatrice();
      var players = []; //tableau initial de joueurs
      for (var i = 1; i <= nbJoueurs; i++) {
        // players[i-1].name= document.getElementById("textJ"+i).value;
        // players[i-1].id = i;
        players[i-1] = document.getElementById("textJ"+i).value;
      }
      console.log(players);
      players = players.sort(function(){
        return Math.random()-0.5; //-0.5
      });
      console.log(players);
      playersRandom = players; // joueurs triés random
      //  console.log(playersRandom);
      dessinerMatrice(16, 36);
      document.getElementById("nombreMines").innerHTML=playersRandom[0];
      for (var i = 0; i < 8; i++){
        document.getElementById("res"+(i+1)).innerHTML="";
        document.getElementById("score"+(i+1)).innerHTML="";
      }
      for(var i = 0; i < playersRandom.length; i++){
        document.getElementById("res"+(i+1)).innerHTML=playersRandom[i];
        score[i]=0;
        document.getElementById("score"+(i+1)).innerHTML=0;
        console.log(score[i]);
      }
    };

    nbMines=0;
    nbMinesATrouver = 0;
    //boucles for imbriquées pour insérer lignes et colonnes
    lignesTotal = lignes-1;
    colonnesTotal = colonnes-1;
    for (var i = 0; i < 16; i++) {
      let nouvelleLigne = insererLigne();
      for (var j = 0; j < 36; j++) {
        insererColonne(nouvelleLigne, i, j);
      }
    }
  };




  return dessinerMatrice;


}());

window.addEventListener("DOMContentLoaded", function init() {
  demineur();
});
