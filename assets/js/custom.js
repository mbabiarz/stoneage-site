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
  
  $(".tabs").fadeIn(2000);
  
  // Tool tips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  
  // Table filters
  (function(document) {
      'use strict';

      var LightTableFilter = (function(Arr) {

          var _input;

          function _onInputEvent(e) {
              _input = e.target;
              var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
              Arr.forEach.call(tables, function(table) {
                  Arr.forEach.call(table.tBodies, function(tbody) {
                      Arr.forEach.call(tbody.rows, _filter);
                  });
              });
          }

          function _filter(row) {
              var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
              row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
          }

          return {
              init: function() {
                  var inputs = document.getElementsByClassName('light-table-filter');
                  Arr.forEach.call(inputs, function(input) {
                      input.oninput = _onInputEvent;
                  });
              }
          };
      })(Array.prototype);

      document.addEventListener('readystatechange', function() {
          if (document.readyState === 'complete') {
              LightTableFilter.init();
          }
      });

  })(document);
  
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
})
  
//***** Smooth page to Bedrock *****//
$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $("a.bedrock").on('click', function(event) {

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
 }) 
  

//***** Animate home page CTA's *****//
//var pointsArray = document.getElementsByClassName("point");

//var animatePoints = function(points) {
  
//  var revealPoints = function(index) {
//    points[index].style.opacity = 1;
//    points[index].style.transform = "translateX(0)";
//    points[index].style.msTransform = "translateX(0)";
//    points[index].style.WebkitTransform = "tanslateX(0)";
//  };
//  
//  for (var i = 0; i < points.length; i++) {
//    revealPoints(i);
//  }
//};
//window.onload = function() {
//  // Automatically animate on tall screens
//  if (window.innerHeight > 750) {
//    animatePoints(pointsArray);
//  }
//  // Animate on scroll
//  var sellingPoints = document.getElementsByClassName('cta')[0];
//  var scrollDistance = sellingPoints.getBoundingClientRect().top -window.innerHeight + 50;
//  window.addEventListener('scroll', function(event) {
//    if (document.body.scrollTop >= scrollDistance) {
//      animatePoints(pointsArray);
//    }
//  });
//}

//***** Tipue Search *****//
$(document).ready(function() {
   $('#tipue_search_input').tipuesearch();
})

//***** Home mobile dropdown *****//
// https://css-tricks.com/convert-menu-to-dropdown //
$(".home-filter select").change(function() {
  window.location = $(this).find("option:selected").val();
});