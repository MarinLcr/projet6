$(document).ready(function() {
  // Ici, le DOM est entièrement défini
  $("h1").html("This is Hello World by JQuery");


/* Création de la class Partie */
class Partie {
  constructor(nom) {
    this.nom = nom;
  }
  /* Méthode qui lance la partie */
  startGame() {
  }
  /* Méthode qui détermine le vainqueur */
  vainqueur() {
  }
  /* Méthode qui permet de relancer une partie */
  newGame() {
  }
}

/* Création de la class Plateau */
class Plateau {
  constructor(row, line) {
    this.row = 10;
    this.line = 10;
  }


  /* Méthode qui gère le callback */

  /* Méthode qui génère le plateau */
  drawPlateau() {
    var lastClicked;
    var grid = clickableGrid(this.row,this.line,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
    });

    document.body.appendChild(grid);    
  }

}

class Player {

}

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            $(cell).attr('id', i+"test");
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}


/* Création de la class Wall */
class Wall {
  constructor(nbrWall){
    this.nbrWall = nbrWall;
  } 

  drawWall() {
    for(let i = 0; i < myNums.length; i++) {
        $("#"+myNums[i]+"test").addClass( "black_cell" );
        console.log("GG");
    }
  }
}

var myList = new Array();
for (var i = 1; i <= 100; i++) {
  myList.push(i);
}
myList.sort(function (a, b) {
  return Math.round(Math.random() * 1) - 1;
});
var myNums = myList.splice(0, 8);
console.log(myNums)


function getNumber() {
        var minNumber = 1; // le minimum
        var maxNumber = 100; // le maximum
        var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
        $('#result').html(randomnumber);
        return randomnumber;
    } 














class Arm {
  constructor(type, name, nbrAttak, nameClass) {
    this.type = type;
    this.name = name;
    this.nbrAttak = nbrAttak;
    this.nameClass = nameClass;
  }

  drawArm() {
          let choice = getNumber();
          $("#"+choice+"test").addClass(this.nameClass);
}

}

 premierLaser = new Arm("Arme","myLaser", 70, "myLaserClass");
 premierGun = new Arm("Arme","myGun", 40, "myGunClass");
 premierKnife = new Arm("Arme","myKnife", 30, "myKnifeClass");
 premierSword = new Arm("Arme","mySword", 40, "mySwordClass");


 let inventaire = [premierLaser, premierGun, premierKnife, premierSword];
 console.log(inventaire);


//inventaire.forEach(function(item, index, array) {
  //console.log(item, index);
  //let choice = getNumber();
  //$("#"+choice+"test").addClass( "arm_cell" );
//});

//function drawArmes() {
  //for(let i = 0; i < inventaire.length; i++) {
    //  let choice = getNumber();

      //if($("#"+choice+"test").hasClass("arm_cell")==false){
        //$("#"+choice+"test").addClass( "arm_cell" );
      //}
      //else {
        // alert("Raté");
        //console.log("Raté");
        //let choice = getNumber();
      //};
    //}
//}


function game() {
    premierPlateau = new Plateau(1, 2);
    premierPlateau.drawPlateau();
    lesWall = new Wall(8);
    lesWall.drawWall();
    //drawArmes();
    //lesArm = new Arm(4);
    //lesArm.drawArm();
    //premierLaser.drawArm();
    //premierGun.drawArm();
    //premierKnife.drawArm();
    //premierSword.drawArm();
  }

game();
});

