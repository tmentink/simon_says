
// ===========================================
// Simon - Animation
// ===========================================

  var simon = (function(simon) {
    "use strict";

    var animate = function(id) {
      var square = $cache("[data-id='"+ id +"']");

      $cache(".square", $cache("#gameboard")).removeClass("animating");
      square.addClass("clicked animating");

      setTimeout(function(){
        square.removeClass("clicked");
      }, config.animation.time / 2);
    };

    var playSequence = function() {
      var i = 0;
      var sequence = simon.sequence;

      var interval = setInterval(function() {
        animate(sequence[i]);
        i++;

        if (i >= sequence.length) {
          clearInterval(interval);
          simon.events.on();
        }
      }, config.animation.time);
    };


    // Public Methods
    // =======================================
    simon.animate = animate;
    simon.playSequence = playSequence;


    return simon;
  })(simon || {});

