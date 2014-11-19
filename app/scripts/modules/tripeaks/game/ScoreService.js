angular.module('tripeaks').factory('Score', function(localStorageService){
    "use strict";
    var scoreObj = {
        score: 0,
        thisRun: 0,
        bestRun: 0,
        allTimeBestRun: 0
    };

    var incrementer = 1;
    var peaksHit = 0;

    var smooshScore = function(savedScore){
        return $.extend(scoreObj, savedScore);
    }

    return {
        getScore: function(){
            var savedScore = localStorageService.get('score');
            if(savedScore){
                console.log('savedScore', savedScore);
                // smoosh the objects together! Sweet!
                scoreObj = smooshScore(savedScore);
                console.log('new ScoreObj', scoreObj);
            }
            return scoreObj;
        },
        saveScore: function(){
            localStorageService.set('score', {
                score: scoreObj.score,
                allTimeBestRun: scoreObj.allTimeBestRun
            });

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

            return this.saveScore();
        },
        decrementScore: function(amt){
            incrementer = 1;
            scoreObj.score -= amt;
            scoreObj.thisRun = 0;

            return this.saveScore();
        },
        resetForNewHand: function(){
            scoreObj.thisRun = 0;

            return this;
        }

    };
});
