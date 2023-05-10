// module qui gere toutes les actions du jeu (envoi de missile, verification de cellule, de fin de partie, etc..)
const game = {

    // methode permettant de recuperer les données entrées par le joueur 
    handleFormSubmit: function(event) {

        // On bloque le comportement par défaut du formulaire. C'est à dire faire une requete vers l'url contenu dans l'attribut action ou recharger si cet attribut est vide ou inexistant.
        event.preventDefault();
    
        // Pour envoyer le missile, on a besoin de récupérer la saisie de l'utilisateur. On commence donc par sélectionner le champ dans lequel on inscrit les coordonnées de la case ciblée
        const field = document.querySelector('#cellToHit');
    
        // Une fois qu'on a le champ, on peut récupérer ce qu'il contient grace à la propriété value
        const targetedCell = field.value.toUpperCase();
    
        // Si la cellule cible est valide, alors on envoie le missile
        if(game.checkCellName(targetedCell) === true) {
    
            // On envoi le missile sur la cellule ciblée. 
            game.sendMissile(targetedCell);
        } else {
            alert('La case ' + targetedCell + ' n\'existe pas. Veuillez entrer une cellule existante.');
        }
    
        // On vide la propriété value du champ, donc on vide le contenu du champ sur la page
        field.value = "";
    
        // Pour pouvoir réécrire dans le champ rapidement, on peut donner le "focus" à ce champ. C'est à dire placer automatiquement le curseur dessus.
        field.focus();
    },

    // méthode qui attend en parametre le nom d'une cellule pour vérifier si elle existe
    checkCellName: function(cellName) {

        // On sélectionne la cellule ciblée avec un sélecteur utilisant les datasets
        const cell = document.querySelector('.cell[data-cell-name="' + cellName + '"]');
        console.log(cell);

        // Si la cellule ciblée n'existe pas, la variable cell contient null. Donc le nom de  la cellule n'est pas valide : on retourne false.
        if(cell === null) {
            return false;
        } else {
            return true;
        }
    },

    // méthode qui envoie un missile sur la case donnée en paramètre.
    sendMissileAt: function(rowIndex, columnIndex) {

        // Récupérer la case sur laquelle on a tiré
            // columnIndex nous donne l'index de cette case
            // Le tableau grid contient notre ligne. Comme les méthodes JS sont des passo"cinq" => 
        const targetCell = grid.cells[rowIndex][columnIndex];

        let returnValue = false;


            // Si la case contient "b", il y avait un bateau, c'est touché !
            // Si la case ne contient rien, c'est un plouf

        if(targetCell === "b"){
            console.log("Touché !");
            // alert('Touché !');

            // Mettre à jour la grille pour ajouter un t à la place du b
            grid.cells[rowIndex][columnIndex] = 't';

            // on change la valeur pour qu'elle renvoi "true"
            returnValue = true;
        }
        // Si on cible une case qui contient soit la lettre "p" soit la lettre "t", c'est qu'on cible une case qui a déjà été touchée. Pas besoin de modifier la grille, on affiche juste un petit message.
        else if(targetCell === 'p' || targetCell === 't') {
            // On indique que la case est déjà touchée, on n'envoie pas de missile.
            console.log("Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane");
        }
        else {
            console.log("Plouf !");
            // alert('Raté, essaie encore !');


            // Mettre à jour la grille pour ajouter un p dans la cellule
            grid.cells[rowIndex][columnIndex] = 'p';
        }

        // On affiche la grille mise à jour : 
        grid.displayGrid();

        //  on met à jour le compteur
        stat.updateRound();

        // on appelle la méthode qui sert à ajouter l'action à l'historique
        stat.addActionToHistory(returnValue);

        //  et on retourne la valeurs 
        return returnValue;
    },

    sendMissile: function(cellName) {
        // On utilise la méthode getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
        const result = grid.getGridIndexes(cellName);
    
        console.log(result);
        const rowIndex = result[0];
        const columnIndex = result[1];
        
        // Puis on appelle la méthode sendMissileAt
        // on prend soin de retourner la valeur de retour de sendMissileAt
        // (VRAI si touché, FALSE sinon)
        return game.sendMissileAt(rowIndex, columnIndex);
    },

    // méthode qui renvoie true si la partie est terminée, false dans le cas contraire.
    checkGameOver: function () {

        // On stocke le nombre de bateau trouvés dans une variable. On part du principe qu'il y a 0 bateaux, et à chaque fois qu'on en trouve un, on incrémente cette variable.
        let remainingBoats = 0;

        for (const row of grid.cells) {
            // la variable row représente une ligne de la grille et est aussi un tableau. Pour parcourir chaque cellule de la grille, on doit donc parcourir celle-ci avec une autre boucle.
            for (const cell of row) {
                // Ici la variable cell contient successivement chaque celule de la grille. On peut donc vérifier ce qu'elle contient !
                
                if(cell === 'b') {
                    remainingBoats++;
                }
            }
        }

        // Si le compteur de bateaux est supérieur à 0, il reste donc des bateaux en jeu : la partie n'est pas terminée !
        if(remainingBoats > 0) {
            return false;
        } else {
            console.log("Game Over !");
            return true;
        }
    },

    // methode demandant à l'utilisateur de taper des coordonnées de cellule à viser, à travers un prompt.
    promptMissileCell: function() {

        // La methode prompt permet d'afficher une fenetre popup et l'utilisateur entrée du texte dedans. Ce texte sera récupéré dans la variable targetedCell.
        let targetedCell = prompt('Où envoyer le prochain missile ?');

        // On envoie le nom de la cellule récupérée à la methode sendMissile qui va donc envoyer un missile dessus ! 
        sendMissile(targetedCell);
    }
}