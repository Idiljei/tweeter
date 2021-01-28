/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1611592370145,
  },

  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1611678770146,
  },
];

//  takes in tweet object and returns tweet <article>
createTweetElement = function (tweetData) {
  // Make variable that targets html property using jquery
  //target article in index --> once you have target and append the html
  // return

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
<div class="tweet-body">${tweetData.content.text}css</div>
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

renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweets-containers").append(createTweetElement(tweet));
  }
};

$(document).ready(function () {
  renderTweets(tweetData);

  // For Form
  $("#formtweet").submit(function (event) {
    event.preventDefault();
    let seralizedData = $("#tweet-text").serialize();
    
    $.ajax( {
      method: "POST",
      url: "/tweets",
      data: seralizedData,
     }).then(console.log("itworked!"));

  });
});
