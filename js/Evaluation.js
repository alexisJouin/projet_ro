//Toutes les évaluations sur les photos 
"use strict";

var Evaluation = function () {

    //Initialisation des variables
    var data = new InfoPhoto();//Récupération du "JSON"
//    console.log(data);
    var page;
    var nbPhotoByPage = 6;
    var nbOfPage = 9;
    var numberOfPhoto = 55;
    var val = 1000;
    var sol = []; //Tableau de résultat
    var tabPhoto = [];
    var score = [];
    var scoreColor = 0;
    var scoreTag = 0;
    var scoreDistance = 0;

    //Initiation du tableu de résultat de solutions
    for (var i = 0; i < numberOfPhoto; i++) {
        sol.push(i);
    }


    //Evaluations sur les photos par rapport au JSON
    this.evalColor = function (photoA, photoB) {
        var red1 = data[sol[photoA]]["color1"]["r"] - data [sol[photoB]]["color1"]["r"];
        var blue1 = data[sol[photoA]]["color1"]["b"] - data [sol[photoB]]["color1"]["b"];
        var green1 = data[sol[photoA]]["color1"]["g"] - data [sol[photoB]]["color1"]["g"];
        var red2 = data[sol[photoA]]["color2"]["r"] - data [sol[photoB]]["color2"]["r"];
        var blue2 = data[sol[photoA]]["color2"]["b"] - data [sol[photoB]]["color2"]["b"];
        var green2 = data[sol[photoA]]["color2"]["g"] - data [sol[photoB]]["color2"]["g"];

        var tot = red1 + blue1 + green1 + red2 + blue2 + green2;
        var res = ((tot * 100) / 555);

        if (res < 50) {
            res = res * 1,5;
        }
        console.log('SCORE COLOR : ' + res);
        return res;

    };

    this.evalDistance = function (photoA, photoB) {
//             // number on the first page
//	    int size = (int) (long) pageSize.get(0);
//	    // total number of photo in the album
//	    for(var i = 0; i < pageSize.size(); i++) 
//		nbPhoto += (int) (long) pageSize.get(i);
//
//	    albumInvDist = new double[nbPhoto][nbPhoto];
//
//	    // compute the distance
//	    for(var i = 0; i < nbPhoto; i++) {
//		for(var j = 0; j < nbPhoto; j++){ 
//		    albumInvDist[i][j] = inverseDistance(size, i, j);
//                }
//            }       
//        var distA = data[sol[photoA]["ahashdist"]];
//        var distB = data[sol[photoB]["ahashdist"]];
//        console.log("distance A " + distA);
    };
    
    this.inverseDistance = function(size, i, j){
        var pagei = i / size;
	var pagej = j / size;

	if (pagei != pagej)
	    // not on the same page: distance is infinite. Another choice is possible of course!
	    return 0;
	else {
	    // positions in the page
	    var posi = i % size;
	    var posj = j % size;

	    // coordinate on the page
	    var xi = posi % 2;
	    var yi = posi / 2;
	    var xj = posj % 2;
	    var yj = posj / 2;

	    // Manhatthan distance
//	    return ((double) 1) / (double) (Math.abs(xi - xj) + Math.abs(yi - yj));
	}
    }

    this.evalTags = function (photoA, photoB) {
        console.log("photos A : " + data[sol[photoA]]);
        var photoATags = data[sol[photoA]]["tags"]["classes"];
        var photoBTags = data[sol[photoB]]["tags"]["classes"];
        var res = 0;

        for (var key in photoATags) {
            if (photoBTags.indexOf(photoATags[key]) == -1) {
                res += 1;
            }
        }
        res = (res * 100) / 20;

        console.log('SCORE TAG : ' + res);
        return res;
    };




    //Calcul les scores
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

    //Copie le résultat d'une solution des évaluations
    this.copyResultat = function (solution) {
        var copyRes = solution.getSol();
        for (var res in copyRes) {
            solution[res] = copyRes[res];
        }
        val = solution.getVal();
        console.log(solution);
        return solution;
    };

    //On constuit le tableau de photos résultat
    this.setSolution = function () {
        //Initialisation du tableau
        for (var i = 0; i < numberOfPhoto; i++) {
            tabPhoto.push(i);
        }
        console.log("Tableau de photos : " + tabPhoto);
        //Trie aléatoire
        tabPhoto.sort(function () {
            return Math.floor(Math.random() * 3) - 1;
        });

        for (var i = 0; i < tabPhoto.length; i++) {
            sol[i] = tabPhoto[i];
        }
        console.log("Tableau de résultat RANDOM : " + sol);
    };


    this.mainEval = function () {
        for (page = 0; page < nbOfPage; page++) {
            val = val + this.calculScores(page * nbPhotoByPage);
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