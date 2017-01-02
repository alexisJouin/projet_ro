$(document).ready(function () {

    /**
     * Génération de l'album 
     */
    $('#generateAlbum').click(function () {
        //Nombre d'évaluation
        var nbEval = $('#nbEval').val();
        if (nbEval == 0 || nbEval == "") {
            nbEval = 3500; //Valeur Par défaut
        }

        //Message de chargement
        $('#load').fadeIn(500);

        var hill = new HillClimber(nbEval);
        hill.run();


        //Affichage de l'album
        $('load').fadeOut(500);
        $('#album').fadeIn(1000);
        $('#page0').fadeIn(1000);
    });


    /*
     * Gestion de la navigation
     */
    $('.navButton').click(function () {
        var buttonId = $(this).attr("id");
        var currentPage = parseInt($(".pagePhoto:visible").attr("id").replace(/page/, ''));
        $('.pagePhoto').hide();
        switch (buttonId) {
            case "first":
                $('#page0').fadeIn(500);
                $('#pageTitle').html("Page 1");
                break;
            case "last":
                $('#page8').fadeIn(500);
                $('#pageTitle').html("Page 8");
                break;
            case "next":
                var next = currentPage + 1;
                var nextTitle = next + 1;
                if (next >= 9) {
                    next = 0;
                    nextTitle = 1;
                }
                $('#pageTitle').html("Page " + nextTitle);
                $('#page' + next).fadeIn();
                break;
            case "prev":
                var prev = currentPage - 1;
                var prevTitle = currentPage;
                if (prev <= -1) {
                    prev = 8;
                    prevTitle = 9;
                }
                $('#pageTitle').html("Page " + prevTitle);
                $('#page' + prev).fadeIn();
                break;
        }
    });

});

