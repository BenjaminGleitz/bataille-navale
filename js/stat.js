
const stat = {

    // compteur de tour
    turn: 1,

    // methode mettant à jour le compteur
    updateRound: function() {

        // on incrémente le compteur
        stat.turn ++;

        // on selectionne la balise contenant le numéro de tour
        const roundTitle = document.querySelector('h3');
        
        roundTitle.textContent = 'Tour ' + stat.turn;
    },

    // methode permettant d'afficher les stats de tir
    handleStatsButton: function() {
    
        if (stat.turn > 1) {
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
    },

    // Méthode permettant d'ajouter une ligne à l'historique
    addActionToHistory: function(success) {
        // On récupère le nom de la cellule entré par l'utilisateur;
        const field = document.querySelector('#cellToHit');
        const cellName = field.value.toUpperCase();

        // On crée un message qui concatène le numéro du tour et le nom de la cellule
        let message = "Tour #" + stat.turn + " tir en " + cellName;
        
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
    },

    // méthode permettant de cacher ou de faire apparaitre l'historique 
    handleHistoryButton: function () {
        const actionElement = document.querySelector('#actions');
        actionElement.classList.toggle('hide-actions');
    },

    // Fonction permettant d'afficher le nombre  de cellules touchées ainsi que leur ID
    displayHits: function() {

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
}