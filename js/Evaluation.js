$(document).ready(function () {

    //Toutes les évaluations sur les photos 
    var Evaluation = function () {

        //Initialisation des variables
        var data = new InfoPhoto();//Récupération du JSON
        console.log(data);
        var page;
        var nbPhotoByPage = 6;
        var nbOfPage = 9;
        var numberOfPhoto = 55;
        var val = 10000000;
        var sol = []; //Tableau de résultat
        var score = [];
        var scoreColor = 0;
        var scoreTag = 0;
        var scoreDistance = 0;




        //Evaluations sur les photos par rapport au JSON
        this.evalColor = function (photoA, photoB) {
            
        };

        this.evalDistance = function () {

        };

        this.evalTags = function () {
            var photoATags = data[sol[photoA]]["tags"]["classes"];
            var photoBTags = data[sol[photoB]]["tags"]["classes"];
            var differentTags = 0;

            for (var key in photoATags) {
                if (photoBTags.indexOf(photoATags[key]) == -1) {
                    differentTags += 1;
                }
            }

            return ((differentTags * 100) / 20);
        };




        //Calcul le score de la page de photos
        this.calculScores = function (photos) {
            var photoA;
            var photoB;
            for (photos; photos < nbPhotoByPage; photos++) {
                if (photos % 2 == 0) {
                    photoA = photos;
                    photoB = photos + 1;

                    scoreTag = scoreTag + this.evalTags(photoA, photoB);
                    scoreColor = scoreColor + this.evalColor(photoA, photoB);
                    scoreDistance = scoreDistance + this.evalDistance(photoA, photoB);
                }
            }

        };


        this.mainEval = function () {
            for (page = 0; page < nbOfPage; page++) {
                val = val + evalScore(page * nbPhotoByPage);
            }
        };


        //Getters
        this.getSol = function () {
            return sol;
        };

        this.getScore = function () {
            return score;
        };

        this.getVal = function () {
            return val;
        };


    };

});


