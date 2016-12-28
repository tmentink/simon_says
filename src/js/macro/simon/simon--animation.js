
// ===========================================
// Simon - Animation
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var animate = function(id) {
      var square = $cache("[data-id='"+ id +"']");
      
      square.addClass("clicked");
      setTimeout(function(){
        square.removeClass("clicked");
      }, 250);
    };

    var playSequence = function() {
      var i = 0;
      var sequence = simon.sequence;

      var interval = setInterval(function() {
        animate(sequence[i]);
        i++;

        if (i >= sequence.length) {
          clearInterval(interval);
          simon.start();
        }
      }, 500);
    };


    // Public Methods
    // =======================================
    simon.animate = animate;
    simon.playSequence = playSequence;


    return simon;
  })(simon || {});

