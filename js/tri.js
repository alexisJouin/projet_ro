$(document).ready(function () {
    var data = new InfoPhoto();
    var output = "";
    var nbPhotoByPage = 6;
    /**
     * Génération de l'album 
     */
    $('#generateAlbum').click(function () {
        //Message de chargement
        $('#load').fadeIn(500);

        //Nombre d'évaluation
        var nbEvalMax = $('#nbEvalMax').val();
        var precision = $('#precision').val();
        var p = 10;

        if (nbEvalMax == 0 || nbEvalMax == "") {
            nbEvalMax = 1000; //Valeur Par défaut
        }
        if (precision == 0 || precision == "") {
            precision = 0.1; //Valeur Par défaut
        }

        //Instanciation des classes
        //var hill = new HillClimber(nbEvalMax);
        var ls = new LocalSearch(new HillClimber(nbEvalMax), p);
        var evaluation = new Evaluation();

        evaluation.setSolution();
        //console.log("HC Result : " + hill.evalHC(evaluation));
        var evaluation = ls.ILS(evaluation);
        
        //On boucle sur l'ensemble des solutions
        $.each(evaluation.getSol(), function (id, val) {
            console.log(id,val);
            $('#page' + id % nbPhotoByPage).append( "<img src='img/" + data[val]['name'] + "'/>");
        });
        //Affichage de l'album
        $('#load').delay(1000).fadeOut(500);
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
                $('#pageTitle').html("Page 9");
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

