angular.module('tripeaks').factory('Score', function(localStorageService, Options){
    "use strict";
    var scoreObj = {
        score: 0,
        thisRun: 0,
        bestRun: 0,
        allTimeBestRun: 0,
        incrementer: 0
    };

    var incrementer = 1;
    var peaksHit = 0;

    var options = Options.getOptions();

    var smooshScore = function(savedScore){
        return $.extend(scoreObj, savedScore);
    };

    return {
        getScore: function(){
            var savedScore = localStorageService.get('score');
            if(savedScore){
                // smoosh the objects together! Sweet!
                scoreObj = smooshScore(savedScore);
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
                peakScore;

            if(isPeak){
                peaksHit++;
                peakScore = peaksHit * options.peakBaseValue;
                amtToAdd = peakScore;
            }

            amtToAdd += incrementer;
            incrementer++;

            scoreObj.incrementer = incrementer;
            scoreObj.score += amtToAdd;
            scoreObj.thisRun += amtToAdd;
            scoreObj.bestRun = (scoreObj.thisRun > scoreObj.bestRun) ? scoreObj.thisRun : scoreObj.bestRun;
            scoreObj.allTimeBestRun = (scoreObj.thisRun > scoreObj.allTimeBestRun) ? scoreObj.thisRun : scoreObj.allTimeBestRun;

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
        },
        resetScore: function(){
            scoreObj = {
                score: 0,
                thisRun: 0,
                bestRun: 0,
                allTimeBestRun: 0
            };

            return this.saveScore();
        }

    };
});
