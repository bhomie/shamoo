String.prototype.rightChars = function(n){
  if (n <= 0) {
    return "";
  }
  else if (n > this.length) {
    return this;
  }
  else {
    return this.substring(this.length, this.length - n);
  }
};

(function($) {
  var
    options = {
      highlightSpeed          : 0,
      typeSpeed               : 100,
      clearDelay              : 750,
      typeDelay               : 200,
      clearOnHighlight        : true,
      typerDataAttr           : 'data-typer-targets',
      typerInterval           : 2000,
      color                   : '#ffffff',
      backgroundColor         : '#ffffff',
      backgroundColorOpacity  : 0,
      pickWordsRandomly       : true,
    },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute,
    getHighlightInterval,
    getTypeInterval,
    typerInterval,
    getColor,
    getBackgroundColor,
    typeTracker = [],         // Keeps track of which words have been typed. Used when words are picked at random.
    typePosition = 0,         // Keeps track of which word will be typed next.
    numOfWords,
    direction = $('html').attr('dir');

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgb(255, 255, 255)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    // BADHACK: TODO: jquery 1.5.1 does not allow removeData with a list argument.
    $e.removeData('typePosition');
    $e.removeData('highlightPosition');
    $e.removeData('leftStop');
    $e.removeData('rightStop');
    $e.removeData('primaryColor');
    $e.removeData('backgroundColor');
    $e.removeData('text');
    $e.removeData('typing');
    $e.removeData('typePosition');
  };

  type = function ($e) {
    var
      // position = $e.data('typePosition'),
      text = $e.data('text'),
      oldLeft = $e.data('oldLeft'),
      oldRight = $e.data('oldRight');

    // if (!isNumber(position)) {
      // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }

    // LTR typing
    if (direction !== 'rtl') {
      $e.text(
        oldLeft +
        text.charAt(0) +
        oldRight
      ).data({
        oldLeft: oldLeft + text.charAt(0),
        text: text.substring(1)
      });
    }
    else { // RTL typing
      $e.text(
        oldLeft +
          text.charAt(text.length - 1) +
          oldRight
      ).data({
        oldRight: text.charAt(text.length - 1) + oldRight,
        text: text.substring(0, text.length-1)
      });
    }

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    // Index starts at 0.
    // oldLeft: The characters on the left of the old word that don't need to be highlighted (because they are the same
    //    as the characters in the new word).
    // oldRight: The characters on the right of the old word that don't need to be highlighted (because they are the same
    //    as the characters in the new word).
    // leftStop: Highlighting stops at leftStop characters (counted from the left).
    // rightStop: Highlighting starts at rightStop characters (counting starts from the left).
    // primaryColor: Color of highlighted text.
    // backgroundColor: Background color of highlighted text.
    // text: The substring that the typer will transition to.

    var
      position = $e.data('highlightPosition'),
      leftText,
      highlightedText,
      rightText;

    // Left-to-right highlighting
    if (direction !== 'rtl') {
      if (!isNumber(position)) {
        position = $e.data('rightStop') + 1;
      }

      if (position <= $e.data('leftStop')) {
        setTimeout(function () {
          clearText($e);
        }, clearDelay());
        return;
      }

      leftText = $e.text().substring(0, position - 1);
      highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
      rightText = $e.text().substring($e.data('rightStop') + 1);

      $e.html(leftText)
        .append(
          spanWithColor(
            getColor(),
            getBackgroundColor()
          )
            .append(highlightedText)
        )
        .append(rightText);

      $e.data('highlightPosition', position - 1);

      setTimeout(function () {
        return highlight($e);
      }, getHighlightInterval());
    }
    else { // Right-to-left highlighting

      if (!isNumber(position)) {
        position = $e.data('leftStop');
      }

      if (position > $e.data('rightStop')) {
        setTimeout(function () {
          clearText($e);
        }, clearDelay());
        return;
      }

      leftText = $e.text().substring(0, $e.data('leftStop'));
      highlightedText = $e.text().substring($e.data('leftStop'), position + 1);
      rightText = $e.text().substring(position + 1, $e.text().length);

      $e.html(leftText)
        .append(
          spanWithColor(
            getColor(),
            getBackgroundColor()
          )
            .append(highlightedText)
        )
        .append(rightText);

      $e.data('highlightPosition', position + 1);

      setTimeout(function () {
        return highlight($e);
      }, getHighlightInterval());
    }
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data('typing')) {
      return;
    }

    try {
      targets = JSON.parse($e.attr($.typer.options.typerDataAttr)).targets;
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map($e.attr($.typer.options.typerDataAttr).split(','), function (e) {
        return $.trim(e);
      });
    }

    numOfWords = targets.length;

    if ($.typer.options.pickWordsRandomly === true) {
      $e.typeTo(targets[typePosition]);
      randomizeTyperPosition();
    }
    else {
      $e.typeTo(targets[typePosition]);
      advanceTyperPosition();
    }
  };

  // Expose our options to the world.
  $.typer = (function () {
    return { options: options };
  })();

  $.extend($.typer, {
    options: options
  });

  //-- Methods to attach to jQuery sets

  $.fn.typer = function() {
    var $elements = $(this);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr($.typer.options.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newString) {
    var
      $e = $(this),
      currentText = $e.text(),
      i = 0, // The last character (on the left) where the animation stops. Numbering starts on the left side.
      j = 0; // The first character from the right where the animation starts. Numbering starts on the right side.

    if (currentText === newString) {
      //console.log("Our strings our equal, nothing to type");
      return $e;
    }

    if (currentText !== $e.html()) {
      console.error("Typer does not work on elements with child elements.");
      return $e;
    }

    $e.data('typing', true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    while (currentText.rightChars(j) === newString.rightChars(j)) {
      j++;
    }

    newString = newString.substring(i, newString.length - j + 1); // The substring that the typer will transition to.

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: $e.css('color'),
      backgroundColor: $e.css('background-color'),
      text: newString
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return $.typer.options.highlightSpeed;
  };

  getTypeInterval = function () {
    return $.typer.options.typeSpeed;
  },

  clearDelay = function () {
    return $.typer.options.clearDelay;
  },

  typeDelay = function () {
    return $.typer.options.typeDelay;
  };

  typerInterval = function () {
    return $.typer.options.typerInterval;
  };

  getColor = function () {
    var rgb_color = hexToRgb($.typer.options.color);
    return 'rgb(' + rgb_color.r + ', ' + rgb_color.g + ', ' + rgb_color.b + ')';
  };

  getBackgroundColor = function () {
    var rgb_color = hexToRgb($.typer.options.backgroundColor);
    var opacity = $.typer.options.backgroundColorOpacity;

    // if not ie8 or ie9, allow transparency
    if ($('#ie8').length == 0 && $('#ie9').length == 0) {
      return 'rgba(' + rgb_color.r + ', ' + rgb_color.g + ', ' + rgb_color.b + ', ' + opacity + ')';
    }
    else {
      return 'rgb(' + rgb_color.r + ', ' + rgb_color.g + ', ' + rgb_color.b + ')';
    }
  };

  randomizeTyperPosition = function () {
    // BADHACK: TODO: IE limitations
    var all_words_used = true;

    $.each(typeTracker, function(index, word_is_typed) {
      if (!word_is_typed) {
        all_words_used = false;
      }
    });

    if (all_words_used) {
      initializeTyperPosition();
    }

    // BADHACK: TODO: IE limitations, can't use
    /*if (typeTracker.every(function(word_is_typed) { return word_is_typed === true })) { // if every word has been typed
      initializeTyperPosition();
    }*/

    do {
      typePosition = Math.floor(Math.random()*numOfWords);
    }
    while (typeTracker[typePosition] === true);

    typeTracker[typePosition] = true;
  };

  initializeTyperPosition = function () {
    typeTracker = [];
    for (var i = 0; i < numOfWords; i++) {
      typeTracker.push(false);
    }
  }

  advanceTyperPosition = function () {
    typePosition++;
    if (typePosition >= numOfWords) {
      typePosition = 0;
    }
  };

  var hexToRgb = function (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

})(jQuery);