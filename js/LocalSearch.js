var LocalSearch = function (localSearch, p) {
    console.log(localSearch);
    var eval = new Evaluation();
    var ls = localSearch;
    
    //Iterated Local Search 
    this.ILS = function (evaluation) {
        var resultatILS = new Evaluation();
        var nbEval = 0;
        
        eval.copyResultat(evaluation);
        eval.copyResultat(this.ILS(eval));
        resultatILS.copyResultat(eval);
        var bestVal = resultatILS.getVal();

        while (nbEval < p) {
            
            eval.copyResultat(ls.ILS(eval));

            if (eval.getValue() < bestVal) {
                resultatILS.copyResultat(eval);
                bestVal = resultatILS.getVal();
            } else {
                nbEval++;
                eval.clone(resultatILS);
            }
        }
        
        console.log("Résultat ILS : " + resultatILS);
        return resultatILS;
    };
};

