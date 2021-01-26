$(document).ready(function() {

  $('#tweet-text').on('input', function(event) {
  const charsLeft = (140 - $(this).val().length); //val is getting the text from text area - not setting new value 
  
  $(this).siblings().children(".counter").text(charsLeft);

  })

});


