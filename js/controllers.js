var guestControllers = angular.module("guestControllers", []);

guestControllers.controller("ListController", [
  "$scope",
  "$http",
  "$timeout",
  function($scope, $http, $timeout, analytics) {
    $scope.data = $scope.data ? $scope.data : {};
    $scope.actions = $scope.actions ? $scope.actions : {};
    var d = $scope.data;
    var a = $scope.actions;

    d.portfolioItems = [];

    $http.get("js/projects/projects.json").then(function(response) {
      d.portfolioItems = response.data;

      d.dateString = function() {
        var d = new Date();
        return d.getFullYear();
      };

      a.selectProj = function(ind) {
        d.selectedProj = d.portfolioItems[ind];
        d.loadedProj = true;
      };

      a.scrollTo = function(section) {
        $("html, body").animate(
          {
            scrollTop: $("#" + section).offset().top
          },
          500
        );
      };

      $scope.showListIcon = true;

      $scope.go_back = function() {
        window.history.back();
      };
    });

    let blog = window.location.hash.indexOf("blog");

    // If navigate to blog
    if (blog) {
      $(function() {
        var $content = $("#jsonContent");

        var dateOptions = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        };

        google.load("feeds", "1");

        function initialize() {
          var feed = new google.feeds.Feed("https://medium.com/feed/@uchi");
          feed.load(function(result) {
            d.json = result;
            if (!result.error) {
              var output = "";
              var author = result.feed.description
                .replace("Stories by ", "")
                .replace(" on Medium", "");
              result.feed.entries.forEach(function(item, k) {
                var tagIndex = item.content.indexOf("<img"); // Find where the img tag starts
                var srcIndex =
                  item.content.substring(tagIndex).indexOf('src="') + tagIndex; // Find where the src attribute starts
                var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                var srcEnd =
                  item.content.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends

                var div = document.createElement("div");
                div.innerHTML = item.content;
                var firstImage = div.getElementsByTagName("img")[0];
                var imgSrc = firstImage ? firstImage.src : "";
                // or, if you want the unresolved src, as it appears in the original HTML:
                var rawImgSrc = firstImage
                  ? firstImage.getAttribute("src")
                  : "";
                console.log(firstImage);
                console.log(rawImgSrc);
                if (
                  rawImgSrc.endsWith("png") ||
                  rawImgSrc.endsWith("jpg") ||
                  rawImgSrc.endsWith("jpeg")
                ) {
                  var src = rawImgSrc; //item.content.substring(srcStart, srcEnd); // Extract just the URL
				  output += '<a target="_blank" href="' + item.link + '">';
				  output += '<div class="col-sm-6 col-md-4 col-xs-12">';
				  output += '<div class="blog-post"><header>';
				  output +=
					'<h6 class="date">' +
					(new Date(item.publishedDate).toLocaleDateString(
					  "en-US",
					  dateOptions
					) || "") +
					"</h6>";
                  output +=
                    '<div class="blog-element"><img class="img-responsive" src="' +
                    src +
                    '" style="height: 350px;width: 100%;object-fit: cover;"></div></header>';
                  output +=
                    '<div class="blog-content"  style="background:white !important"><h4><a style="text-overflow:ellipsis;word-wrap:break-word;max-width: inherit;" target="_blank" href="' +
                    item.link +
                    '">' +
                    item.title +
                    "</a></h4>";
                  output +=
                    '<div class="post-meta"><span>By ' +
                    author +
                    "</span></div>";
                  var yourString = div
                    .getElementsByTagName("p")[0]
                    .innerText.replace(/<img[^>]*>/g, ""); //replace with your string.
                  var maxLength = 120; // maximum number of characters to extract
                  //trim the string to the maximum length
                  var trimmedString = yourString.substr(0, maxLength);
                  //re-trim if we are in the middle of a word
                  trimmedString = trimmedString.substr(
                    0,
                    Math.min(
                      trimmedString.length,
                      trimmedString.lastIndexOf(" ")
                    )
                  );
                  output += '<p id="trimStr">';
                  output += trimmedString + "...</p>";

                  output += "</div></div></div></a>";
                }
                return k < 3;
              });
              $content.html(output);
            }
          });
        }
        google.setOnLoadCallback(initialize);
      });
    }
  }
]);
