// On se crée un "tableau associatif" des entêtes pour les lignes et colonnes
// => pour y accéder : gridHeaders.columns ou gridHeaders['rows']
const gridHeaders = {
    // index  0  1  2  3  4  5  6  7
    'rows' : [1, 2, 3, 4, 5, 6, 7, 8],
    // index      0    1    2    3    4    5    6    7
    'columns' : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
};

// compteur de tour
let turn = 1;


// On modélise une ligne de bataille navale à l'aide d'un tableau. Chaque entrée vide représente une cellule et chaque entrée "b" représente une cellule contenant un bateau.
let grid = [
    ['', '', '', '', '', '', '', '',], // 0
    ['', '', '', '', '', '', '', '',], // 1
    ['', '', '', '', '', 'b', 'b', '',], // 2
    ['', '', '', '', '', '', '', '',], // 3
    ['', '', 'b', '', '', '', '', '',], // 4
    ['', '', 'b', '', '', '', '', '',], // 5
    ['', '', 'b', '', '', '', '', '',], // 6
    ['', '', '', '', '', '', '', '',], // 7
];

/**
 * fonction servant à initialiser le jeu
 */
function init() {

    // Affichage de la grille
    displayGrid();

    //on surveille ce qu'on rentre dans le formulaire à l'aide d'un écouteur d'évènement
    const form = document.querySelector('.form');
    form.addEventListener('submit', handleFormSubmit);

    // on surveille le bouton d'affichage des statistique
    const statsButton = document.querySelector('button#stats');
    statsButton.addEventListener('click', handleStatsButton);

    // on selectionne le bouton historique
    const historyButton = document.querySelector('#toogle-actions');
    historyButton.addEventListener('click', handleHistoryButton);

}

function handleFormSubmit(event) {

    // On bloque le comportement par défaut du formulaire. C'est à dire faire une requete vers l'url contenu dans l'attribut action ou recharger si cet attribut est vide ou inexistant.
    event.preventDefault();

    // Pour envoyer le missile, on a besoin de récupérer la saisie de l'utilisateur. On commence donc par sélectionner le champ dans lequel on inscrit les coordonnées de la case ciblée
    const field = document.querySelector('#cellToHit');

    // Une fois qu'on a le champ, on peut récupérer ce qu'il contient grace à la propriété value
    const targetedCell = field.value.toUpperCase();

    // Si la cellule cible est valide, alors on envoie le missile
    if(checkCellName(targetedCell) === true) {

        // On envoi le missile sur la cellule ciblée. 
        sendMissile(targetedCell);
    } else {
        alert('La case ' + targetedCell + ' n\'existe pas. Veuillez entrer une cellule existante.');
    }

    // On vide la propriété value du champ, donc on vide le contenu du champ sur la page
    field.value = "";

    // Pour pouvoir réécrire dans le champ rapidement, on peut donner le "focus" à ce champ. C'est à dire placer automatiquement le curseur dessus.
    field.focus();
}

/**
 * Fonction qui attend en parametre le nom d'une cellule pour vérifier si elle existe
 */
function checkCellName(cellName) {

    // On sélectionne la cellule ciblée avec un sélecteur utilisant les datasets
    const cell = document.querySelector('.cell[data-cell-name="' + cellName + '"]');
    console.log(cell);

    // Si la cellule ciblée n'existe pas, la variable cell contient null. Donc le nom de  la cellule n'est pas valide : on retourne false.
    if(cell === null) {
        return false;
    } else {
        return true;
    }
    
}

function name(params) {
    
}



function displayGrid() {

    // On commence par afficher les entetes de colonnes. C'est pas super pratique car si change le nombre de colonnes, on doit venir modifier le nombre d'entetes.
    // console.log('  A B C D E F G H');
    console.log('  ' + gridHeaders.columns.join(' '));
    // On utilise plutot notre tableau gridHeaders qui sert de source pour nos entetes


    // On parcourt chacune des lignes du tableau "grid"
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        // Chaque ligne est récupérée dans le constante row
        const row = grid[rowIndex];
        // Comme on a déjà fait une fonction qui se charge d'afficher les infos d'une ligne, on peut l'appeler en lui passant la ligne courante.
        // On récupère la chaine de caractères représentant la ligne.
        
        let stringLine = displayLine(row, rowIndex);

        // Pour afficher les entetes de lignes, on récupère l'index courant auquel on ajoute 1 !
        const lineNumber = gridHeaders.rows[rowIndex];

        // On affiche la ligne !
        console.log(lineNumber + ' ' + stringLine);


    }

}



// Fonction dont le but est de lire une ligne de grille sous forme de tableau et de la convertir en chaine de caractères à afficher dans la console.
function displayLine(gridLine, rowIndex) {
   
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
}


// Fonction qui envoie un missile sur la case donnée en paramètre.
function sendMissileAt(rowIndex, columnIndex) {

    // Récupérer la case sur laquelle on a tiré
        // columnIndex nous donne l'index de cette case
        // Le tableau grid contient notre ligne. Comme les fonctions JS sont des passo"cinq" => 
    const targetCell = grid[rowIndex][columnIndex];

    let returnValue = false;


        // Si la case contient "b", il y avait un bateau, c'est touché !
        // Si la case ne contient rien, c'est un plouf

    if(targetCell === "b"){
        console.log("Touché !");
        // alert('Touché !');

        // Mettre à jour la grille pour ajouter un t à la place du b
        grid[rowIndex][columnIndex] = 't';

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
        grid[rowIndex][columnIndex] = 'p';
    }

    // On affiche la grille mise à jour : 
     displayGrid();

     // on appelle la fonction qui sert à ajouter l'action à l'historique
     addActionToHistory(returnValue);

    //  et on retourne la valeurs 
    return returnValue;
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

    // La fonction prompt permet d'afficher une fenetre popup et l'utilisateur entrée du texte dedans. Ce texte sera récupéré dans la variable targetedCell.
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

    // On parcourt le tableau hitCells et on affiche l'attribut de donnée "cell-name" de chaque cellule grace à la propriété "dataset"
    for (const cell of hitCells) {
        // Les "dataset" (attributs de données) sont obligatoirement écrits en kebabCase dans l'HTML. Pour les utiliser en JS, il faut les convertir en camelCase. Donc "cell-name" devient "cellName".
        console.log(cell.dataset.cellName);
    }

}

/**
 * Fonction mettant à jour le compteur
 */
function uptadeRound() {

    // on incrémente le compteur
    turn ++;

    // on selectionne la balise contenant le numéro de tour
    const roundTitle = document.querySelector('h3');
    
    roundTitle.textContent = 'Tour ' + turn;
}



function handleStatsButton() {
    
    if (turn > 1) {
        // on recupere le nombre de tir reussi
        const hit = document.querySelectorAll('.hit').length;
        console.log(hit);
    
        // on recupere le nombre de tir raté
        const splash = document.querySelectorAll('.splash').length;
        console.log(splash);
    
        // on calcule le nombre de tire total
        const total = hit + splash;
    
        // on calcule le pourcentage
        const hitsPercentage = Math.round(hit * 100 / total);
        const splashsPercentage = Math.round(splash * 100 / total);
    
        // On affiche les statistiques grâce à une alerte
        alert("Total des tirs : " + total + '\n' + "pourcentage de tirs reussis : " + hitsPercentage + '\n' + "pourcentage de tirs ratés : " + splashsPercentage
        )
    } else {
        alert("Vous devez tirer au moins une fois pour visualiser les statistiques !")
    }
}

function handleHistoryButton () {
    const actionElement = document.querySelector('#actions');
    actionElement.classList.toggle('hide-actions');
}

// Méthode permettant d'ajouter une ligne à l'historique
function addActionToHistory(success) {
    // On récupère le nom de la cellule entré par l'utilisateur;
    const field = document.querySelector('#cellToHit');
    const cellName = field.value.toUpperCase();

    // On crée un message qui concatène le numéro du tour et le nom de la cellule
    let message = "Tour #" + turn + " tir en " + cellName;
    
    // Si le paramètre success est égal à true, c'est que c'est un tir réussi. On concatène alors un "réussi" à la fin du message.
    if(success === true) {
        message += " : réussi !!";
    } else {
        message += " : manqué...";
    }
     
    // on selectionne l'élément qui va contenir les messages
    const actionContainer = document.querySelector("#actions");

    // On crée un nouvel élément de type "div" qui va contenir le message
    const messageElement = document.createElement('div');

    // on ajoute le contenu du message dans l'élément crée
    messageElement.textContent = message;

    // On envoi l'élément dans le dom
    actionContainer.prepend(messageElement);
}


// Une fois que toutes les fonctions sont définies, on lance le jeu via une boucle. Tant que la fonction checkGameOver renvoie false, le jeu n'est pas terminé, alors on demande à l'utilisateur de cibler une case.
// tant que le jeu n'est pas terminé
// while (checkGameOver() === false) {
    // on affiche la grille
    // displayGrid();
    // puis on demande au joueur de donner une case
    // promptMissileCell();

    document.addEventListener('DOMContentLoaded', init)