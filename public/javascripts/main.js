
/* Main JS -- For Formatting Tweets */

$(document).ready(function() {  
  //Formatting Tweet Text
  var tweetElements = $(".tweet-card section p");
  for(var i=0; i<tweetElements.length;i++){
    var cleanText = clean(tweetElements[i].innerHTML);
    tweetElements[i].innerHTML = cleanText;
  }

  //Tweet Item Hours Ago Formatting from Created Date
  var timeElements = $('.timeAgo');
  for(var i=0; i<timeElements.length;i++){
    var timeAgoText = timeAgo(timeElements[i].innerHTML);
    timeElements[i].innerHTML = timeAgoText;
  }
  
  //Tweet Item Image Set
  var tweetImgDivs = $('.tweet-img');
  for(var i=0; i<tweetImgDivs.length;i++){
    var imgUrl = $(tweetImgDivs[i]).attr("data-src");
    $(tweetImgDivs[i]).css({
      'background':'url('+ imgUrl +') no-repeat center center',
      'background-size': '50px 50px'
    }).removeAttr('data-src');
  }
});

function link(tweet) {
  return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
    var http = m2.match(/w/) ? 'http://' : '';
    return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
  });
}

function at(tweet) {
  return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
    return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
  });
}

function list(tweet) {
  return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
    return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
  });
}

function hash(tweet) {
  return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
    return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
  });
}

function clean(tweet) {
  return this.hash(this.at(this.list(this.link(tweet))));
}

function timeAgo(dateString) {
    var rightNow = new Date();
    var then = new Date(dateString);
    
    var diff = rightNow - then;

    var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

    if (isNaN(diff) || diff < 0) {
      return ""; // return blank string if unknown
    }

    if (diff < second * 2) {
      // within 2 seconds
      return "right now";
    }

    if (diff < minute) {
      return Math.floor(diff / second) + " seconds ago";
    }

    if (diff < minute * 2) {
      return "about 1 minute ago";
    }

    if (diff < hour) {
      return Math.floor(diff / minute) + " minutes ago";
    }

    if (diff < hour * 2) {
      return "about 1 hour ago";
    }

    if (diff < day) {
      return  Math.floor(diff / hour) + " hours ago";
    }

    if (diff > day && diff < day * 2) {
      return "yesterday";
    }

    if (diff < day * 365) {
      return Math.floor(diff / day) + " days ago";
    }

    else {
      return "over a year ago";
    }
  }// timeAgo()
