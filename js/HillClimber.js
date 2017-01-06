var HillClimber = function (maxEval) {
    var m = maxEval;
    var eval = new Evaluation();
    var evalPrime = new Evaluation();
    var nbEval = 0;
    var bestVal = 1000;
    var resultatHC;


    //Test
//    eval.mainEval();


    //Algo du hill climber
    this.evalHC = function (e) {
        eval.copyResultat(e);
        evalPrime.copyResultat(eval);

        while (nbEval < maxEval) {
            if (eval.getVal() != evalPrime.getVal()) {
                evalPrime.copyResultat(eval);
            }
//            evalPrime.swap();
            evalPrime.mainEval();
            console.log(evalPrime.mainEval());

            if (evalPrime.getVal() < bestVal) {
                bestVal = evalPrime.getVal();
                resultatHC = eval.copyResultat(evalPrime);
            }
            nbEval += 1;
            console.log("Nombre d'évaluation HC : " + nbEval);
        }
        return resultatHC;
    };



    //Méthode principale
    this.run = function (evalSol) {
//        var resHC = this.evalHC(evalSol);
//        var LS = new LocalSearch(resHC, 10);
//        var resILS = LS.ILS(resHC);
//        return resILS;
//        return resHC;
        console.log('nbEvalMax : ' + m);
    };
};