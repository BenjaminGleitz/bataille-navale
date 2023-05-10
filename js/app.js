// module proncipal qui lance le jeu et pose les écouteur d'évènement
const app = {

    /**
     * fonction servant à initialiser le jeu
     */
    init: function() {

        // Affichage de la grille
        grid.displayGrid();

        //on surveille ce qu'on rentre dans le formulaire à l'aide d'un écouteur d'évènement
        const form = document.querySelector('.form');
        form.addEventListener('submit', game.handleFormSubmit);

        // on surveille le bouton d'affichage des statistique
        const statsButton = document.querySelector('button#stats');
        statsButton.addEventListener('click', stat.handleStatsButton);

        // on selectionne le bouton historique
        const historyButton = document.querySelector('#toogle-actions');
        historyButton.addEventListener('click', stat.handleHistoryButton);
    }
}

// Une fois que toutes les fonctions sont définies, on lance le jeu via une boucle. Tant que la fonction checkGameOver renvoie false, le jeu n'est pas terminé, alors on demande à l'utilisateur de cibler une case.
// tant que le jeu n'est pas terminé
// while (checkGameOver() === false) {
    // on affiche la grille
    // displayGrid();
    // puis on demande au joueur de donner une case
    // promptMissileCell();

    document.addEventListener('DOMContentLoaded', app.init)