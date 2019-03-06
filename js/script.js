    $(document).ready(function() {
      // Ici, le DOM est entièrement défini
      $("h1").html("This is my turn-based game !");


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
          this.row = row;
          this.line = line;
        }

        /* Méthode qui génère le plateau */
        drawPlateau() {
          let lastClicked;
          let grid = clickableGrid(this.row,this.line,function(el,row,col,i){
            console.log("You clicked on element:",el);
            console.log("You clicked on row:",row);
            console.log("You clicked on col:",col);
            console.log("You clicked on item #:",i);

            //el.className='clicked';
            //if (lastClicked) lastClicked.className='';
            //lastClicked = el;
          });

          document.body.appendChild(grid);    
        }

      }

      function clickableGrid( rows, cols, callback ){
        let i=0;
        let grid = document.createElement('table');
        grid.className = 'grid';
        for (let r=0;r<rows;++r){
          let tr = grid.appendChild(document.createElement('tr'));
          for (let c=0;c<cols;++c){
            let cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            $(cell).attr('id', i);
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
          for(let i = 0; i < this.nbrWall; i++) {
            $("#"+myList[i]).addClass( "black_cell" );
          }
        }
      }

      function listWallAndArm() {
        let myList = new Array();
        for (let i = 1; i <= 100; i++) {
          myList.push(i);
        }
        myList.sort(function (a, b) {
          return Math.round(Math.random() * 1) - 1;
        });
        return myList = myList.splice(0, 14);
      }

      let myList = listWallAndArm();
      console.log(myList);

      class Arm {
        constructor(type, name, nbrAttak, nameClass, pos) {
          this.type = type;
          this.name = name;
          this.nbrAttak = nbrAttak;
          this.nameClass = nameClass;
          this.pos = pos;
        }

        drawArm(randomNumber) {
          $("#"+randomNumber).addClass(this.nameClass);
          this.pos = randomNumber;
        }

      }

      let premierLaser = new Arm("Arme","myLaser", 70, "myLaserClass");
      let premierGun = new Arm("Arme","myGun", 40, "myGunClass");
      let premierKnife = new Arm("Arme","myKnife", 30, "myKnifeClass");
      let premierSword = new Arm("Arme","mySword", 40, "mySwordClass");


      let inventaire = [premierLaser, premierGun, premierKnife, premierSword];
      console.log(inventaire);

      let tableau = [];

      class Player {
        constructor(nom, pos) {
          this.nom = nom;
          this.pos = pos;
        }

        drawPlayer() {
          if(tableau.length === 0) {
            let posPlayerOne = positionPlayer();
            console.log(posPlayerOne);
            tableau.push(posPlayerOne);
            //testPosPlayerTwo();
            //console.log(tableau);
            for (let i =0; i < tableau.length; i++) {
              $("#"+tableau[i]).addClass( "player"+[i] );
              this.pos = tableau[i];
            }
          }
          else {
            testPosPlayerTwo();
            for (let i =0; i < tableau.length; i++) {
              $("#"+tableau[i]).addClass( "player"+[i] );
              this.pos = tableau[i];
            }
          }
        }      
      }


      function positionPlayer() {
        let joueur = getNumber();
        let compte = 0;
        //console.log(joueur);
        for (let i = 0; i < myList.length; i++) {
          if (joueur != myList[i]) {
            compte++;
          }
          else {
            console.log(joueur+": valeur non tolérée, match avec un nombre correspondant à un mur ou une arme.");
          }
        }
        if (compte === 14) {
          //console.log("WIN!!!!");
          console.log(joueur+": valeur acceptée, pas de correspondance avec un mur ou une arme.")
          return joueur;
        }
        else {
          console.log(joueur);
          console.log("On recommence !");
          return positionPlayer();
        }
      }

      function getNumber() {
            let minNumber = 1; // le minimum
            let maxNumber = 99; // le maximum
            let randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // la fonction magique
            return randomnumber;
          } 



          function testPosPlayerTwo() {
            let posPlayerTwo = positionPlayer();
            if(testPlayer(posPlayerTwo) === true) {
              tableau.push(posPlayerTwo);
              console.log(posPlayerTwo);
              return posPlayerTwo;
            }
            else {
              console.log(posPlayerTwo);
              console.log("On retente !");
              testPosPlayerTwo();
            }
          }

          function testPlayer(nbrTest) {
            for (let i =0; i < tableau.length; i++) {
              if (nbrTest != tableau[i] && nbrTest != (tableau[i] - 1) && nbrTest != (tableau[i] + 1) && nbrTest != (tableau[i] - 10) && nbrTest != (tableau[i] + 10)) {
                console.log(nbrTest+": valeur acceptée, position du joueur 2 assez éloignée du joueur 1.");
                return true;
              }
              else {
                console.log(nbrTest+": valeur non tolérée, position à coté du joueur 1.");
                return false;
              }
            }
          }

          function game() {
            premierPlateau = new Plateau(10, 10);
            premierPlateau.drawPlateau();
            lesWall = new Wall(10);
            lesWall.drawWall();
            premierLaser.drawArm(myList[10]);
            premierGun.drawArm(myList[11]);
            premierKnife.drawArm(myList[12]);
            premierSword.drawArm(myList[13]);
            premierJoueur = new Player("Marin");
            deuxiemeJoueur = new Player("Tom");
            //troisiemeJoueur = new Player("Charlie");
            premierJoueur.drawPlayer();
            deuxiemeJoueur.drawPlayer();
            //troisiemeJoueur.drawPlayer();
            console.log(premierJoueur);
            console.log(deuxiemeJoueur);
            //console.log(troisiemeJoueur);
          }

          game();
        });

        // test pour github test pour voir retest
