
// ===========================================
// Simon - Events
// ===========================================

  var simon = (function(simon) {
    "use strict";

    var on = function() {
      $cache("#gameboard").on("touchstart.simon", ".square", function(e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        simon.userClick(id);
      });

      $cache("#gameboard").on("click.simon", ".square", function() {
        var id = $(this).attr("data-id");
        simon.userClick(id);
      });

      $cache("html").on("keypress.simon", function(e) {
        var key = e.which ? e.which : e.keyCode;
        var id = config.keys[key];
        simon.userClick(id);
      });
    };

    var off = function() {
      $cache("#gameboard").off(".simon");
      $cache("html").off(".simon");
    };


    // Public Methods
    // =======================================
    simon.events = {
      on: on,
      off: off
    };

    return simon;
  })(simon || {});

