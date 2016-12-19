var MasterSliderShowcase2 = function () {

    return {

        //Master Slider
        initMasterSliderShowcase2: function () {
		    var slider = new MasterSlider();
		     
		    slider.control('arrows');  
		    slider.control('thumblist' , {autohide:false ,dir:'h',arrows:false, align:'bottom', width:80, height:80, margin:5, space:5});
		 
		    slider.setup('masterslider' , {
		        width:450,
		        height:450,
		        space:5,
		        view:'fade'
		    });
        }

    };

}();        