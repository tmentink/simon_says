
// ===========================================
// Simon - Events
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var start = function() {
      $cache("#game-board").on("click", ".square", function() {
        var id = $(this).attr("data-id");
        simon.userClick(id);
      });
    };

    var stop = function() {
      $cache("#game-board").off("click", ".square");
    };

    simon.start = start;
    simon.stop = stop;

    return simon;
  })(simon || {});

