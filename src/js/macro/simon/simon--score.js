
// ===========================================
// Simon - Score
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var setScore = function() {
      $cache(".score").html(simon.sequence.length);
    };

    var setMaxScore = function() {
      var maxScore = getMaxScore();
      $cache(".max-score").html(maxScore);
    };

    var saveMaxScore = function() {
      var score = simon.sequence.length - 1;
      var prevMax = getMaxScore();

      if (prevMax < score) {
        localStorage.setItem(config.maxScore, score);
        simon.score.setMax();
      }
    };

    var getMaxScore = function() {
      var maxScore = localStorage.getItem(config.maxScore);
      if (!maxScore) {
        maxScore = 0;
        localStorage.setItem(config.maxScore, 0);
      }

      return parseInt(maxScore);
    };


    // Public Methods
    // =======================================
    simon.score = {
      set: setScore,
      setMax: setMaxScore,
      saveMax: saveMaxScore
    };

    return simon;
  })(simon || {});

