
// ===========================================
// Config
// ===========================================

  var config = (function(config) {
    "use strict";

    config = {
      maxScore: "simon.maxScore",
      animation: {
        time: 500
      },
      keys: {
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9'
      }
    };

    return config;

  })(config || {});



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



// ===========================================
// Simon - Core
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var init = function() {
      simon.score.setMax();
      simon.newGame();
    };

    var newGame = function() {
      simon.sequence = [];
      simon.current = [];
      simon.debug = false;
      nextRound();
    };

    var nextRound = function() {
      simon.events.off();
      simon.score.set();
      simon.sequence.push(utility.randomNumber());
      simon.current = simon.sequence.slice();

      setTimeout(function(){
        simon.playSequence();
      }, 500);
    };

    var userClick = function(userInput) {
      simon.animate(userInput);

      if (!simon.debug) {
        canContinue(userInput);
      }
    };

    var canContinue = function(userInput) {
      if (correctNumber(userInput)) { 

        if (lastNumber()) {
          nextRound();
        }
      } 
      else {
        endGame();
      }
    };

    var correctNumber = function(userInput) {
      var nextNumber = simon.current.shift();
      return (userInput == nextNumber);
    };

    var lastNumber = function() {
      return simon.current.length === 0;
    };

    var endGame = function() {
      simon.events.off();
      simon.score.saveMax();
      simon.overlay.show("#gameover");
    };


    // Public Methods
    // =======================================
    simon.init = init;
    simon.newGame = newGame;
    simon.userClick = userClick;


    return simon;
  })(simon || {});



// ===========================================
// Simon - Countdown
// ===========================================

  var simon = (function(simon) {
    "use strict";

    var start = function() {
      setHTML(3);

      var i = 2;
      var interval = setInterval(function() {
        setHTML(i);
        i--;

        if (i < 0) {
          clearInterval(interval);
          simon.overlay.hide("#countdown");
          simon.init();
        }
      }, 800);
    };

    var setHTML = function(number) {
      $cache("#countdown .overlay__content").html(number);
    };


    // Public Methods
    // =======================================
    simon.countdown = {
      start: start
    };

    return simon;
  })(simon || {});



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



// ===========================================
// Simon - Game Over
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var show = function() {
      $cache("#gameover").removeClass("overlay--hidden");
    };

    var hide = function() {
      $cache("#gameover").addClass("overlay--hidden");
    };


    // Public Methods
    // =======================================
    simon.gameover = {
      show: show,
      hide: hide
    };

    return simon;
  })(simon || {});



// ===========================================
// Simon - Music
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var on = function() {
      simon.audio = $cache("#audio")[0];
      simon.audio.play();
    };

    var off = function() {
      simon.audio.pause();
      simon.audio.currentTime = 0;
    };

    var mute = function() {
      simon.audio.muted = !simon.audio.muted;
    };


    // Public Methods
    // =======================================
    simon.music = {
      on: on,
      off: off,
      mute: mute
    };

    return simon;
  })(simon || {});



// ===========================================
// Simon - Overlay
// ===========================================

  var simon = (function(simon) {
    "use strict";
  
    var show = function(id) {
      $cache(id).removeClass("overlay--hidden");
    };

    var hide = function(id) {
      $cache(id).addClass("overlay--hidden");
    };


    // Public Methods
    // =======================================
    simon.overlay = {
      show: show,
      hide: hide
    };

    return simon;
  })(simon || {});



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



// ===========================================
// Page - Init
// ===========================================

  !(function(simon) {
    "use strict";

    $cache("#btnPlayMusic").on("click", function(){
      simon.music.on();
      simon.countdown.start();
      simon.overlay.hide("#music");
    });

    $cache("#btnNoMusic").on("click", function(){
      simon.countdown.start();
      simon.overlay.hide("#music");
    });

    $cache("#btnPlayAgain").on("click", function() {
      simon.overlay.hide("#gameover");
      simon.newGame();
    });

  })(simon);

