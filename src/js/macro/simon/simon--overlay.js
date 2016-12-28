
// ===========================================
// Simon - Overlay
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var show = function() {
      $cache(".overlay").removeClass("overlay--hidden");
    };

    var hide = function() {
      $cache(".overlay").addClass("overlay--hidden");
    };


    // Public Methods
    // =======================================
    simon.overlay = {
      show: show,
      hide: hide
    };

    return simon;
  })(simon || {});

