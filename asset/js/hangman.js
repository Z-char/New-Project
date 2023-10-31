"use strict";
$(function() {
  let word = null, lives = 10;
  const livesuptodate = ()=> {
    if (lives == 0) {
      for (let i = 0; i < word.length; ++i) {
        $("#gb" + i).text(word[i]);
      }
      $("#livesbar").text("Died");
    }
    else { 
      $("#livesbar").text(lives + " Lives Left");
    }
  };
  const alphabarreset = ()=> {
    $("#ul_for_alphabar").empty();
    for (let i = 0; i < 26; ++i) {
      $(document.createElement("li")).html(String.fromCharCode(65 + i)).css("display", "inline-block").addClass("ListItem").click(function() {
        if (!$(this).hasClass("active") && lives) {
          $(this).addClass("active");
          let cnt = 0;
          for (let j = 0; j < word.length; ++j) {
            if (word[j] == String.fromCharCode(65 + i)) {
              $("#gb" + j).text(word[j]);
              cnt += 1;
            }
          }
          if (cnt == 0) { // well incorrect at all;
            lives -= 1;
            livesuptodate();
          }
        }
      }).appendTo("#ul_for_alphabar");
    }
  };
  const possiblecluereset = ()=> {
    $("#possibleclue").hide();
  };
  const guessreset = ()=> {
    $("#ul_for_guess").empty();
    $.getJSON("https://random-word-api.herokuapp.com/word", function(data) {
      word = data[0].replace(/\s+/g, "-").toUpperCase();
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== '-') {
          $(document.createElement("li")).html(' ').attr('id', "gb" + i).css("display", "inline-block").addClass("guessblock").appendTo("#ul_for_guess");
        } else {
          $(document.createElement("li")).html('-').css("display", "inline-block").addClass("guessdash").appendTo("#ul_for_guess");
        }
      }
    });
   };
  const livesreset = ()=> {
    lives = 10;
    livesuptodate();
  };
  const buttonsreset = ()=> {
    $("#reset").removeClass().click(function() {
      reset(); // doing reset here;
    });
  };
    
  function reset() {
    guessreset();
    alphabarreset();
    possiblecluereset();
    livesreset();
    buttonsreset();
  }
  reset();
  
});