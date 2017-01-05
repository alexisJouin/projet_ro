$(document).ready(function () {

    var HillClimber = function (maxEval) {
        var m = maxEval;
        var eval = new Evaluation();
        var evalPrime = new Evaluation();

        var solution;

        var nbEval = 0;
        var bestVal = 1000;

        //Algo du hill climber
        this.evalHC = function (e) {

            eval.clone(e);
            evalPrime.clone()

            while (nbEval < maxEval) {

                if (evalPrime.getValue() != evalPrime.getValue()) {
                    evalPrime.clone(eval);
                }

                evalPrime.swap();
                evalPrime.eval();

                if (evalPrime.getValue() < bestVal) {
                    solution = eval.clone(evalPrime);
                    bestVal = evalPrime.getValue();
                }


                nbEval += 1;
            }
        };




        //Iterated Local Search 
        this.ILS = function () {

        };

        //Méthode principale
        this.run = function () {
            console.log('nbEval : ' + m);
        };
        return m;
    };
});