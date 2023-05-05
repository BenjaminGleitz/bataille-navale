
// modélisation d'une grille de bataille navale, chaque entrée 'b' représente un bateau
let grid = ['','','b','b','b','','',''];

// console.log(grid);

function displayLine(gridLine) {
    
    // on initialise la chaine de caractere à remplir. Elle est vide au début
    let line = '';

    for (let columnIndex = 0; columnIndex < gridLine.length; columnIndex++) {

        // on recupere l'index courant
        const currentCharacter = columnIndex;

        // On place le contenu de l'index courant dans une variable
        const gridContent = gridLine[currentCharacter];

        // si la case courante est vide, alors:
        if (gridContent === '') {
            // console.log('~');
            // cela affichera '~'
            line += '~';
        }
        // Si elle possede un bateau, alors:
        else {
            // console.log('BATEAU');
            // cela affichera 'b'
            line += gridContent;
        }  
    
        line += ' ';
    }
    
    console.log(line);
};

displayLine(grid);