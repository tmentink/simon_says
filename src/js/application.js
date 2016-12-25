
// ===========================================
// Config
// ===========================================

  var page = (function(page) {
    "use strict";

    page.config = {
      
    };

    return page;

  })(page || {});



// ===========================================
// Utility
// ===========================================

  !(function (root) {
    "use strict";

    // Math
    // =======================================
    var randomNumber = function() {
      return Math.floor((Math.random() * 9) + 1);
    };


    // Debounce
    // =======================================
    var debounce = function (fn, delay) {
      if (delay === undefined) { delay = 250; }

      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }


    // Trottle
    // =======================================
    var throttle = function(fn, delay) {
      if (delay === undefined) { delay = 250; }

      var deferTimer,
          last;
      return function () {
        var context = this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + delay) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, delay);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }


    // Selector Cache
    // =======================================
    if (root.jQuery) {
      var selector_cache = function() {
        var elementCache = {};

        var get_from_cache = function( selector, $ctxt, reset ) {
          if ( "boolean" === typeof $ctxt ) {
            reset = $ctxt;
            $ctxt = false;
          }
          var cacheKey = $ctxt ? $ctxt.selector + ' ' + selector : selector;

          if ( undefined === elementCache[ cacheKey ] || reset ) {
            elementCache[ cacheKey ] = $ctxt ? $ctxt.find( selector ) : jQuery( selector );
          }

          return elementCache[ cacheKey ];
        };

        get_from_cache.elementCache = elementCache;
        return get_from_cache;
      }
    }


    // Public Methods
    // =======================================
    root.utility = {
      randomNumber: randomNumber,
      debounce: debounce,
      throttle: throttle
    };

    if (selector_cache) {
      root.$cache = new selector_cache();
    } 

  })(this);





// ===========================================
// Simon - Animation
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var animate = function(id) {
      var square = $cache("#s" + id);

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



// ===========================================
// Simon - Init
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var newGame = function() {
      simon.sequence = [];
      simon.current = [];
      simon.continue = true;
      simon.nextRound();
    };

    
    var nextRound = function() {

      $cache("#score").html(simon.sequence.length);

      simon.sequence.push(utility.randomNumber());
      simon.current = simon.sequence.slice(0);

      setTimeout(function(){
        simon.playSequence();
      }, 500)
    };


    var userClick = function(id) {
      simon.animate(id);

      var number = simon.current.shift();

      simon.continue = (number == id);
      simon.canContinue();
    };


    var canContinue = function() {

      if (simon.current.length === 0 && simon.continue) {
        simon.stop();
        simon.nextRound();
      } 
      else if (!simon.continue) {
        simon.stop();
        simon.saveMaxScore();
      }
    };


    // Public Methods
    // =======================================
    simon.newGame = newGame;
    simon.nextRound = nextRound;
    simon.userClick = userClick;
    simon.canContinue = canContinue;


    return simon;
  })(simon || {});



// ===========================================
// Simon - Score
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var setScore = function() {
      $cache("#score").html(simon.sequence.length);
    };


    var setMaxScore = function() {
      var maxScore = localStorage.getItem("simon-maxScore");
      if (!maxScore) {
        maxScore = 0;
        localStorage.setItem("simon-maxScore", 0);
      }

      $cache("#max").html(maxScore);
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



// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    simon.setMaxScore();
    
    $cache("#new-game").on("click", function() {
      simon.newGame();
    });

  })(simon);

