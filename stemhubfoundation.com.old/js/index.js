/* When your mouse cursor enter the background, the fading won't pause and keep playing */ 
$('.carousel').carousel({
	pause: "false" /* Change to true to make it paused when your mouse cursor enter the background */
});

function scrollTo (id) {
	// if (id !== "") {
 //      event.preventDefault();
 //      $('html, body').animate({
 //      	scrollTop: $(id).offset().top
 //      }, 800, function(){
 //        window.location.hash =  id
 //    });
 	console.log('he')
 	console.log(id)
 	var aTag = $(id);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
  }
