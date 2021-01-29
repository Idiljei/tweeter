/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//DOC READY - call functions
$(document).ready(function () {
  // Form submitter handler
  $("#formtweet").submit(function (event) {
    event.preventDefault();
    let seralizedData = $("#tweet-text").serialize();
    let value = $("#tweet-text").val().length;
    let empty = $("#tweet-text").val().trim() === "";

    console.log(seralizedData.length);

    if (value > 140) {
      $("#over-error").slideDown();
      return;
    }

    if (empty) {
      $("#empty-error").slideDown();
      return;
    }

    // Ajax Post request
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: seralizedData,
    }).then(() => {
      $(".counter").text("140");
      $("#tweet-text").val("");
      return loadtweets();
    });
  });
});

//  Function takes in tweet object and returns tweet <article>
createTweetElement = function (tweetData) {
  // escape function for cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // // // Date updated variables 
  // const time = new Date(tweetObjects.created_at);
  // const currentTime = Date.now();
  // const Diff = Math.floor((currentTime-time) /1000 / 60 /60 / 24)


  const tweetElement = `
<div class="tweet-container">
<!-- first div -->
<div class="tweet-container-userinfo">
  <div class="tweet-profile">
    <img src=${tweetData.user.avatars} alt="Profile Image" />
    <p> ${tweetData.user.name}</p>
  </div>
  <div class="tweet-username">${tweetData.user.handle}</div>
</div>
<!-- body div -->
<div class="tweet-body">${escape(tweetData.content.text)}</div>
<!-- tweet action div  -->
<div class="tweet-actions">
  <div class="tweet-timestamp">${tweetData.created_at}</div>
  <div class="tweet-icons">
    <i class="fas fa-flag"></i>
    <i class="far fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    <i class="far fa-heart"></i>
  </div>
</div>
`;
  return tweetElement;
};

// render tweets
renderTweets = function (tweets) {
  $(".tweets-containers").empty();
  for (let tweet of tweets) {
    $(".tweets-containers").prepend(createTweetElement(tweet));
  }
};

//AJAX  GET request for /tweets
loadtweets = function () {
  $.ajax({
    method: "GET",
    url: "/tweets",
  }).then(function (results) {
    renderTweets(results);
  });
};
