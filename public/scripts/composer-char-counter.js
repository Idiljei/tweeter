$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    const charsLeft = 140 - $(this).val().length; 

    let counter = $(this).siblings().children(".counter").text(charsLeft);

    if (charsLeft < 0) {
      counter.addClass("addColour");
    } else {
      counter.removeClass("addColour");
      $("#over-error").slideUp();
      $("#empty-error").slideUp();
    }
  });
});
