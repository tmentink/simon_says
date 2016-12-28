
// ===========================================
// Simon - Score
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var setScore = function() {
      $cache(".score").html(simon.sequence.length);
    };


    var setMaxScore = function() {
      var maxScore = localStorage.getItem("simon-maxScore");
      if (!maxScore) {
        maxScore = 0;
        localStorage.setItem("simon-maxScore", 0);
      }

      $cache(".max-score").html(maxScore);
    };

    var saveMaxScore = function() {
      var score = simon.sequence.length - 1;
      var prevMax = parseInt(localStorage.getItem("simon-maxScore"));

      if (prevMax < score) {
        localStorage.setItem("simon-maxScore", simon.sequence.length - 1);
        simon.setMaxScore();
      }
    };


    // Public Methods
    // =======================================
    simon.setScore = setScore;
    simon.setMaxScore = setMaxScore;
    simon.saveMaxScore = saveMaxScore;

    return simon;
  })(simon || {});

