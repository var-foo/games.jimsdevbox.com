angular.module('tripeaks').factory('Score', function(){
    "use strict";
    var scoreObj = {
        score: 0,
        thisRun: 0,
        bestRun: 0,
        allTimeBestRun: 0
    };

    var incrementer = 1;
    var peaksHit = 0;

    return {
        getScore: function(){
            return scoreObj;
        },
        addToScore: function(isPeak){
            var amtToAdd = 0,
                peakScore = (peaksHit + 1) * 15;
            //console.log('adding to score');
            if(isPeak){
                scoreObj.score += + peakScore;
                amtToAdd = peakScore;
                peaksHit++;
            }

            amtToAdd += incrementer;
            scoreObj.score += amtToAdd;
            scoreObj.thisRun += amtToAdd;

            scoreObj.bestRun = (scoreObj.thisRun > scoreObj.bestRun) ? scoreObj.thisRun : scoreObj.bestRun;
            scoreObj.allTimeBestRun = (scoreObj.thisRun > scoreObj.allTimeBestRun) ? scoreObj.thisRun : scoreObj.allTimeBestRun;

            incrementer++;
        },
        decrementScore: function(amt){
            incrementer = 1;
            scoreObj.score -= amt;
            scoreObj.thisRun = 0;
        }

    };
});
