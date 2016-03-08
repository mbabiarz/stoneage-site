//***** Smooth page to Top *****//
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $("a[href='#top']").on('click', function(event) {

  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top
  }, 900, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
    });
  });
})

//***** Smooth page to Rotary *****//
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $("a[href='#rotary']").on('click', function(event) {

  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 88
  }, 900, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
    });
  });
})

//***** Smooth page to dealers by region *****//
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $("a.region").on('click', function(event) {

  // Prevent default anchor click behavior
  event.preventDefault();

  // Store hash
  var hash = this.hash;

  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 100
  }, 900, function(){

    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = hash;
    });
  });
  
//***** Info table filter *****//
  (function ($) {

          $('#filter').keyup(function () {

              var rex = new RegExp($(this).val(), 'i');
              $('.searchable tr').hide();
              $('.searchable tr').filter(function () {
                  return rex.test($(this).text());
              }).show();

          })

      }(jQuery));
  
  
})
//***** Animate home page CTA's *****//
var pointsArray = document.getElementsByClassName("point");

var animatePoints = function(points) {
  
  var revealPoints = function(index) {
    points[index].style.opacity = 1;
    points[index].style.transform = "translateX(0)";
    points[index].style.msTransform = "translateX(0)";
    points[index].style.WebkitTransform = "tanslateX(0)";
  };
  
  for (var i = 0; i < points.length; i++) {
    revealPoints(i);
  }
};

window.onload = function() {
  // Automatically animate on tall screens
  if (window.innerHeight > 750) {
    animatePoints(pointsArray);
  }
  // Animate on scroll
  var sellingPoints = document.getElementsByClassName('cta')[0];
  var scrollDistance = sellingPoints.getBoundingClientRect().top -window.innerHeight + 50;
  window.addEventListener('scroll', function(event) {
    if (document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  });
}

