
const grid = {

    // On se crée un "tableau associatif" des entêtes pour les lignes et colonnes
    gridHeaders: {
        // index  0  1  2  3  4  5  6  7
        'rows' : [1, 2, 3, 4, 5, 6, 7, 8],
        // index      0    1    2    3    4    5    6    7
        'columns' : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    },

    // On modélise une ligne de bataille navale à l'aide d'un tableau. Chaque entrée vide représente une cellule et chaque entrée "b" représente une cellule contenant un bateau.
    cells: [
        ['', '', '', '', '', '', '', '',], // 0
        ['', '', '', '', '', '', '', '',], // 1
        ['', '', '', '', '', 'b', 'b', '',], // 2
        ['', '', '', '', '', '', '', '',], // 3
        ['', '', 'b', '', '', '', '', '',], // 4
        ['', '', 'b', '', '', '', '', '',], // 5
        ['', '', 'b', '', '', '', '', '',], // 6
        ['', '', '', '', '', '', '', '',], // 7
    ],

    // methode permettant d'afficher la grille
    displayGrid: function() {

        // On commence par afficher les entetes de colonnes. C'est pas super pratique car si change le nombre de colonnes, on doit venir modifier le nombre d'entetes.
        // console.log('  A B C D E F G H');
        console.log('  ' + grid.gridHeaders.columns.join(' '));
        // On utilise plutot notre tableau gridHeaders qui sert de source pour nos entetes
    
    
        // On parcourt chacune des lignes du tableau "grid"
        for (let rowIndex = 0; rowIndex < grid.cells.length; rowIndex++) {
            // Chaque ligne est récupérée dans le constante row
            const row = grid.cells[rowIndex];
            // Comme on a déjà fait une méthode qui se charge d'afficher les infos d'une ligne, on peut l'appeler en lui passant la ligne courante.
            // On récupère la chaine de caractères représentant la ligne.
            
            let stringLine = grid.displayLine(row, rowIndex);
    
            // Pour afficher les entetes de lignes, on récupère l'index courant auquel on ajoute 1 !
            const lineNumber = grid.gridHeaders.rows[rowIndex];
    
            // On affiche la ligne !
            console.log(lineNumber + ' ' + stringLine);
        }
    },

    // méthode dont le but est de lire une ligne de grille sous forme de tableau et de la convertir en chaine de caractères à afficher dans la console.
    displayLine : function(gridLine, rowIndex) {
    
        // On initialise la chaine de caractère à afficher. C'est une chaine vide au début, qu'on va venir remplir.
        let stringLine = '';

        for (let columnIndex = 0; columnIndex < gridLine.length; columnIndex++) {
            
            // Grace à columnIndex, on peut récupérer chacune des entrées du tableau gridLine.
            const currentCharacter = gridLine[columnIndex];

            // On analyse maintenant le contenu de currentCharacter. Si c'est une une chaine vide, alors on doit ajouter un ~ dans la variable stringLine.
            if(currentCharacter === '') {
                // On concatène un ~ à notre variable line
                stringLine = stringLine + '~';
            } else {
                // Sinon, c'est que c'est un autre caractère, on le concatène à notre variable stringLine. 
                stringLine += currentCharacter;

                // On veut afficher dans la grille HTML les lettres correspondantes à notre tableau JS. Si j'ai un B dans le tableau, je dois avoir un b dans la grille HTML.
                // On crée un sélecteur CSS pour sélectionner la cellule. Chaque cellule a un ID qui commence par "cell" suivi de l'index de ligne et de l'index de colonne.
                const currentHtmlCell = document.querySelector('#cell' + rowIndex + columnIndex);
                // console.log(currentHtmlCell);
                // On définit le contenu texte de la cellule HTML comme étant le caractère courant.
                // currentHtmlCell.textContent = currentCharacter;

                // Si currentCharacter est égal à p alors on doit ajouter la classe splash à la cellule
                if(currentCharacter === 'p') {
                    currentHtmlCell.classList.add('splash');
                }
                // Si current est égale à t, alors on doit ajouter la classe hit
                else if (currentCharacter === 't') {
                    currentHtmlCell.classList.add('hit');
                }
            }
            // Ensuite, on ajoute un espace pour aérer entre les caractères
            stringLine += ' ';
            
        }

        return stringLine;
    },

    // Fonction dont le but est renvoyer un tableau contenant les index correspondant aux coordonnées passées en paramètre : A5 doit donner row: 4 et column: 0
    getGridIndexes: function(cellName) {

        // 1- On décortique la chaine de caractères. C'est à dire, on récupère d'un coté la lettre et d'un coté le chiffre
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
        const columnIndex = grid.gridHeaders.columns.indexOf(cellLetter);


        // 5- On crée un tableau contenant les index de ligne et de colonne, qu'on retourne.
        const indexes = [rowIndex, columnIndex];
        
        return indexes;
    }
}