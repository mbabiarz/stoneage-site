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

var MasterSliderShowcase3 = function () {

    return {

        //Master Slider
        initMasterSliderShowcase3: function () {
		    var slider = new MasterSlider();
		     
		    slider.control('bullets', {autohide:false , overVideo:true, dir:'v', align:'left', space:10 , margin:00});
		 
		    slider.setup('homeslider' , {
		        width           : 1366,
                height          : 450,
                minHeight       : 0,
                space           : 0,
                start           : 1,
                grabCursor      : true,
                swipe           : true,
                mouse           : true,
                keyboard        : true,
                layout          : "fullwidth",
                wheel           : true,
                autoplay        : true,
                instantStartLayers:true,
                mobileBGVideo:false,
                loop            : false,
                shuffle         : false,
                preload         : 0,
                heightLimit     : true,
                autoHeight      : false,
                smoothHeight    : true,
                endPause        : false,
                overPause       : true,
                fillMode        : "fill",
                centerControls  : true,
                startOnAppear   : false,
                layersMode      : "center",
                autofillTarget  : "",
                hideLayers      : false,
                fullscreenMargin: 0,
                speed           : 20,
                dir             : "v",
                parallaxMode    : 'swipe',
                view            : "fadeBasic"
		    });
        }

    };

}();