
// On se crée un "tableau associatif" des entêtes pour les lignes et colonnes
const gridHeaders = {
    // index  0  1  2  3  4  5  6  7
    'rows' : [1, 2, 3, 4, 5, 6, 7, 8],
    // index      0    1    2    3    4    5    6    7
    'columns' : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
};


// On modélise une ligne de bataille navale à l'aide d'un tableau. Chaque entrée vide représente une cellule et chaque entrée "b" représente une cellule contenant un bateau.
let grid = [
    ['', '', 'b', 'b', 'b', '', '', '',], // 0
    ['', '', '', '', '', '', '', '',], // 1
    ['', '', 'b', '', '', '', '', '',], // 2
    ['', '', 'b', '', '', 'b', 'b', '',], // 3
    ['', '', 'b', '', '', '', '', '',], // 4
    ['', '', '', '', '', '', '', '',], // 5
    ['', '', '', 'b', 'b', '', '', '',], // 6
    ['', '', '', '', '', 'b', 'b', '',], // 7
];

// Affichage de la grille
displayGrid();

function displayGrid() {

    // On commence par afficher les entetes de colonnes.
    console.log('  ' + gridHeaders.columns.join(' '));

    // On parcourt chacune des lignes du tableau "grid"
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        // Chaque ligne est récupérée dans le constante row
        const row = grid[rowIndex];
        // Comme on a déjà fait une fonction qui se charge d'afficher les infos d'une ligne, on peut l'appeler en lui passant la ligne courante.
        
        // On récupère la chaine de caractères représentant la ligne.
        let stringLine = displayLine(row, rowIndex);

        // Pour afficher les entetes de lignes, on récupère l'index courant auquel on ajoute 1 !
        const lineNumber = gridHeaders.rows[rowIndex];

        // On affiche la ligne 
        console.log(lineNumber + ' ' + stringLine);


    }

}



// Fonction dont le but est de lire une ligne de grille sous forme de tableau et de la convertir en chaine de caractères à afficher dans la console.
function displayLine(gridLine, rowIndex) {
   
    // On initialise la chaine de caractère à afficher. C'est une chaine vide au début, qu'on va venir remplir.
    let stringLine = '';

    for (let columnIndex = 0; columnIndex < gridLine.length; columnIndex++) {
        
        const currentCharacter = gridLine[columnIndex];

        // On analyse maintenant le contenu de currentCharacter. Si c'est une une chaine vide, alors on doit ajouter un ~ dans la variable stringLine.
        if(currentCharacter === '') {
            // On concatène un ~ à notre variable line
            stringLine = stringLine + '~';
        } else {
            // Sinon, c'est que c'est un autre caractère, on le concatène à notre variable stringLine. 
            stringLine += currentCharacter;

            // On crée un sélecteur CSS pour sélectionner la cellule. Chaque cellule a un ID qui commence par "cell" suivi de l'index de ligne et de l'index de colonne.
            const currentHtmlCell = document.querySelector('#cell' + rowIndex + columnIndex);
            // On définit le contenu texte de la cellule HTML comme étant le caractère courant.
            currentHtmlCell.textContent = currentCharacter;

            // Si currentCharacter est égal à p alors on doit ajouter la classe splash à la cellule
            if(currentCharacter === 'p') {
                currentHtmlCell.classList.add('splash');
            }
            // Si current est égale à t, alors on doit ajouter la classe hit
            else if (currentCharacter === 't') {
                currentHtmlCell.classList.add('hit');
            }
        }
        stringLine += ' ';
        
    }

    return stringLine;
}


// Fonction qui envoie un missile sur la case donnée en paramètre.
function sendMissileAt(rowIndex, columnIndex) {

    // Récupérer la case sur laquelle on a tiré
        // columnIndex nous donne l'index de cette case
        // Le tableau grid contient notre ligne. Comme les fonctions JS sont des passo"cinq" => 
    const targetCell = grid[rowIndex][columnIndex];


        // Si la case contient "b", il y avait un bateau, c'est touché !
        // Si la case ne contient rien, c'est un plouf

    if(targetCell === "b"){
        console.log("Touché !");

        // Mettre à jour la grille pour ajouter un t à la place du b
        grid[rowIndex][columnIndex] = 't';

        // On affiche la grille mise à jour : 
        displayGrid();

        return true;
    }
    // Si on cible une case qui contient soit la lettre "p" soit la lettre "t", c'est qu'on cible une case qui a déjà été touchée. Pas besoin de modifier la grille, on affiche juste un petit message.
    else if(targetCell === 'p' || targetCell === 't') {
        // On indique que la case est déjà touchée, on n'envoie pas de missile.
        console.log("Tu sais pas lire ta grille ? On a déjà attaqué cette case, banane");

        return false;
    }
    else {
        console.log("Plouf !");
        // Mettre à jour la grille pour ajouter un p dans la cellule
        grid[rowIndex][columnIndex] = 'p';

        // On affiche la grille mise à jour : 
        displayGrid();

        return false;
    }
}



function sendMissile(cellName) {
    // On utilise la fonction getGridIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
    const result = getGridIndexes(cellName);

    console.log(result);
    const rowIndex = result[0];
    const columnIndex = result[1];
    
    // Puis on appelle la fonction sendMissileAt
    // on prend soin de retourner la valeur de retour de sendMissileAt
    // (VRAI si touché, FALSE sinon)
    return sendMissileAt(rowIndex, columnIndex);
}


// Fonction dont le but est renvoyer un tableau contenant les index correspondant aux coordonnées passées en paramètre : A5 doit donner row: 4 et column: 0
function getGridIndexes(cellName) {

    const cellLetter = cellName[0];
    let cellNumber = cellName[1];
 
    // 2- On convertit le chiffre en entier pour pouvoir l'utiliser en tant que tel.
    cellNumber = Number(cellNumber);

    // 3- On récupère l'index du chiffre converti (Par exemple 5 doit donner l'index 4)
    // Les index de lignes correspondent à l'entete de la ligne moins 1. On peut donc faire un calcul pour retrouver l'index de ligne
    // cellNumber = cellNumber - 1;
    // Ou
    // cellNumber -= 1
    // Ou
    const rowIndex = cellNumber - 1;

    // 4- On récupère l'index de la lettre grace au tableau qui énumère les colonnes.
    // Les entetes de colonnes sont stockés dans le tableau gridHeaders, dans l'entrée "columns". On utilise donc la fonction indexOf pour chercher l'index lié à l'entete contenu dans cellLetter.
    const columnIndex = gridHeaders.columns.indexOf(cellLetter);


    // 5- On crée un tableau contenant les index de ligne et de colonne, qu'on retourne.
    const indexes = [rowIndex, columnIndex];
    
    return indexes;
}


// Fonction qui renvoie true si la partie est terminée, false dans le cas contraire.
// Une partie est terminée quand la grille de contient plus la lettre "b"
function checkGameOver() {

    // On stocke le nombre de bateau trouvés dans une variable. On part du principe qu'il y a 0 bateaux, et à chaque fois qu'on en trouve un, on incrémente cette variable.
    let remainingBoats = 0;

    for (const row of grid) {
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

}

// Fonction demandant à l'utilisateur de taper des coordonnées de cellule à viser, à travers un prompt.
function promptMissileCell() {

    let targetedCell = prompt('Où envoyer le prochain missile ?');

    // On envoie le nom de la cellule récupérée à la fonction sendMissile qui va donc envoyer un missile dessus ! 
    sendMissile(targetedCell);
}

// Fonction permettant d'afficher le nombre  de cellules touchées ainsi que leur ID
function displayHits() {

    // On sélectionne toutes les cellules qui ont la class "hit" (donc touchées)
    const hitCells = document.querySelectorAll('.hit');
    // On affiche la longueur du tableau hitCells grace à la propriété length
    console.log("Nombre de cellules touchées : " + hitCells.length);

    // On parcourt le tableau hitCells et on affiche l'id de chaque cellule grace à la propriété "id"
    for (const cell of hitCells) {
        console.log(cell.id);
    }

}


// Une fois que toutes les fonctions sont définies, on lance le jeu via une boucle. Tant que la fonction checkGameOver renvoie false, le jeu n'est pas terminé, alors on demande à l'utilisateur de cibler une case.
// tant que le jeu n'est pas terminé
// while (checkGameOver() === false) {
    // on affiche la grille
    // displayGrid();
    // puis on demande au joueur de donner une case
    // promptMissileCell();
// }