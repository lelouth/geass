var zoom = 15;
var latitude = 41.038966;
var longitude = 28.984451;


        
        
$(document).ready(function() {
    
    $('body').width($(window).width());
    $('body').height($(window).height());
    
   
  
  
  
  
  
    openSection($('.section-home'),true);
  
    $('.close-btn').click(function(event){
        event.preventDefault();
     
        closeSection($($(this).attr('data-closing-id')),$('.section-home'));
    });
  
    $('.menu-item a').click(function(event){
        event.preventDefault();
     
        closeSection($('.section-home'),$($(this).attr('href')));
    });
  
  $('.readmore').click(function(event){
        event.preventDefault();
     
        closeSection($('.section-blog'),$($(this).attr('href')));
    });
  
  
    function openSection(selector,isHome){
        
      
        var counter=1;
        var elementCount= selector.find('.init').length;
       
        selector.find('.init').each(function(){
            var el=$(this);
        
            var delay=counter*120;
            counter = counter<elementCount ? counter+1 : counter;
         
            el.removeClass('animated');
            setIn(el,delay,elementCount,isHome,selector);
           
 
        });
    }
  
  
 
  
    function closeSection(closeSelector,toOpen){
      
        var counter=1;
        var elementCount= closeSelector.find('.init').length;
        closeSelector.find('.init').each(function(){
            var el=$(this);
        
            var delay=counter*160;
            counter = counter<elementCount ? counter+1 : counter;
         
         
            setOut(el,delay,elementCount,toOpen,closeSelector);
           
 
        });
    }
  
    var inCounter=0;
    function setIn(element,delay,maxElements,isHome,openingSection){
      
        inCounter=maxElements <inCounter ? 0 : inCounter;
 
  
        setTimeout(function() {
              
           
           
        if($('html').hasClass('ie')){
            element.removeClass('hidden').css('opacity',0);
            element.animate({opacity:1});
        }else{
             element.addClass('animated bounceInDown'); 
             element.removeClass('hidden');
        }
            
        
            inCounter++;
            if(inCounter==maxElements){
                inCounter=0;
                openingSection.addClass('current');
                if(isHome){
                    
                     $('.menu-portfolio').orbit($('.avatar-holder'), {
                            orbits:  100, 
                            period:  120000,
                            clockwise:false,
                            offset:0
                        });
                 
                    
                    $('.menu-about').orbit($('.avatar-holder'), {
                        orbits:  100, 
                        period:  80000,
                        clockwise:false,
                        offset:400
                    });
                     $('.menu-blog').orbit($('.avatar-holder'), {
                        orbits:  100, 
                        period:  90000,
                        clockwise:true,
                        offset:200
                    });
                    $('.menu-contact').orbit($('.avatar-holder'), {
                        orbits:  100, 
                        period:  70000,
                        offset:900
                    });
                    $('.menu-skills').orbit($('.avatar-holder'), {
                        orbits:  100, 
                        period:  90000,
                        offset:600
                    });
                    
                    $('.menu-item').delay(100).animate({opacity:1});
                
                }
                  setupSkills();
                    checkContactForm();
                    setupPortfolio();
                    setupMap();
            }
        
        
        }, delay);


    }
    
    
    var outCounter=0;
    function setOut(element,delay,maxElements,openSec,closeSection){
        outCounter=maxElements <outCounter ? 0 : outCounter;
 
  
        setTimeout(function() {
              
         if($('html').hasClass('ie')){
           
            element.animate({opacity:0});
        }else{
              element.addClass('animated bounceOutUp'); 
        }
        
           
             
            outCounter++;
           
               
       
            if(outCounter==maxElements){
                
                setTimeout(function() {
                    outCounter=0;
                    closeSection.addClass('hidden').removeClass('current');
                    closeSection.removeClass('animated').removeClass('bounceOutUp');
                    closeSection.find('.animated').removeClass('animated');
                    closeSection.find('.init').addClass('hidden');
                    closeSection.find('.bounceOutUp').removeClass('bounceOutUp');
                    closeSection.find('.bounceInDown').removeClass('bounceInDown');
                
                   
                    openSec.addClass('animated bounceInUp'); 
                    openSec.removeClass('hidden');
                    openSection(openSec,false);
                }, 500);
            }
        
        }, delay);


    }
  

   


    function setupSkills(){
        if($('.page.current').find('.skill').length>0){
            

            var opts = {
                lines: 12, // The number of lines to draw
                angle: 0, // The length of each line
                lineWidth: 0.4, // The line thickness
                pointer: {
                    length: 0.5, // The radius of the inner circle
                    strokeWidth: 0.035, // The rotation offset
                    color: '#000000' // Fill color
                },
                colorStart: '#CE3306',   // Colors
                colorStop: '#CE3306',    // just experiment with them
                strokeColor: '#EEEEEE'   // to see which ones work best for you

            };



            $('.skill').gauge(opts);


        
        }
    }

 




    function checkContactForm(){
        if($('.page.current').find('.contact-form').length>0){
   
            //  triggers contact form validation
            var formStatus=$(".contact-form").validate();
            //   ===================================================== 

            //sending contact form
            $(".contact-form").submit(function(e){
                e.preventDefault();
                if(formStatus.errorList.length===0)
                { 
                    $(".contact-form .submit").fadeOut(function(){
                        $('#loading').css('visibility','visible');
                        $.post('submit.php',$(".contact-form").serialize(),
				
                            function(data){
                                $(".contact-form input,.contact-form textarea").not('.submit').val('');
                                
                                $('.message-box').html(data);
						
						
                                $('#loading').css('visibility','hidden');
                                $(".contact-form .submit").removeClass('disabled').css('display','block');
                            }
				
                            ); 
                    });     
 
				
                }
			
            });	
        }
    }
    

    function setupPortfolio(){

        if($('.page.current').find('#grid').length>0){
            
            $("a[data-rel^='prettyPhoto']").prettyPhoto();
            $('#grid > .portfolio-item').each( function() {
                $(this).hoverdir({
                    hoverDelay :400
                });
            } );
            $('.filter-options li').on('click', function() {
                var $this = $(this),
                $grid = $('#grid');

                // Hide current label, show current label in title
                $('.filter-options .active').removeClass('active');
                $this.addClass('active');

                // Filter elements
                $grid.shuffle($this.data('group'));
            });

            // instantiate the plugin
            $('#grid').shuffle({
                group : 'all',
                speed : 1000,
                easing: 'ease-in-out'
            });
    
            setTimeout(function(){
                $('#grid').parent().animate({
                    opacity:1
                },function(){
                    $(this).removeClass('init');
                });
    
    
            },500);
        }
    
    }
    var mapIsActive=false;
    function setupMap(){
      
        if($('.page.current').find('.map-holder').length>0 && !mapIsActive){
            mapIsActive=true;
            $('.map').gmap3({
                map:{
                    options:{
                        center:[latitude, longitude],
     
                        zoom:zoom,
                        mapTypeControl: true,
   
                        navigationControl: true,
                        scrollwheel: true,
                        streetViewControl: false
                    }
                },
                marker:{
                    latLng:[latitude, longitude]
                }
            });
        }
    }
    
  
});

$(window).resize(function(){
    $('body').width($(window).width());
    $('body').height($(window).height());
})




$.fn.orbit = function(s, options){
    var settings = {
        orbits:    1     // Number of times to go round the orbit e.g. 0.5 = half an orbit
        ,
        period:    3000  // Number of milliseconds to complete one orbit.
        ,
        maxfps:    25    // Maximum number of frames per second. Too small gives "flicker", too large uses lots of CPU power
        ,
        clockwise: true  // Direction of rotation.
        ,
        offset:0
    };
         
    $.extend(settings, options);  // Merge the supplied options with the default settings.

    return(this.each(function(){
        var p        = $(this);

        /* First obtain the respective positions */
        var  p_top    = p.css('top' );
        var  p_left   = p.css('left');
      
        if($('html').hasClass('webkit')){
           
            var   s_top    = s.css('margin-top' );
            var   s_left   = s.css('margin-left');
        }else{
           
            var   s_top    = s.css('top' );
            var   s_left   = s.css('left');
        }
       
        /* Then get the positions of the centres of the objects */

        var p_x      = parseInt(p_top ) + p.height()/2,
        p_y      = parseInt(p_left) + p.width ()/2,
        s_x      = parseInt(s_top ) + s.height()/2,
        s_y      = parseInt(s_left) + s.width ()/2;

        /* Find the Adjacent and Opposite sides of the right-angled triangle */
        var a        = s_x - p_x,
        o        = s_y - p_y;
 
        /* Calculate the hypotenuse (radius) and the angle separating the objects */

        var r        = Math.sqrt(a*a + o*o);
        var theta    = Math.acos(a / r)+settings.offset;

        /* Calculate the number of iterations to call setTimeout(), the delay and the "delta" angle to add/subtract */

        var niters   = Math.ceil(Math.min(4 * r, settings.period, 0.001 * settings.period * settings.maxfps));
        var delta    = 2*Math.PI / niters;
        var delay    = settings.period  / niters;
        if (! settings.clockwise) {
            delta = -delta;
        }
        niters      *= settings.orbits;

        /* create the "timeout_loop function to do the work */

        var timeout_loop = function(s, r, theta, delta, iter, niters, delay, settings){
                   
            setTimeout(function(){

                /* Calculate the new position for the orbiting element */

                var w = theta + iter * delta;
                var a = r * Math.cos(w);
                var o = r * Math.sin(w);
                        
                if($('html').hasClass('webkit')){
                    var x = parseInt(s.css('margin-left')) + (s.height()/2) - a;
                    var y = parseInt(s.css('margin-top' )) + (s.width ()/2) - o;
                }else{
                    var x = parseInt(s.css('left')) + (s.height()/2) - a;
                    var y = parseInt(s.css('top' )) + (s.width ()/2) - o;
                }
                        
                       

                /* Set the CSS properties "top" and "left" to move the object to its new position */

                p.css({
                    top:  (y - p.height()/2),
                    left: (x - p.width ()/2)
                });
 
                /* Call the timeout_loop function if we have not yet done all the iterations */
  
                if (iter < (niters - 1))  timeout_loop(s, r, theta, delta, iter+1, niters, delay, settings);
            }, delay);
        };

        /* Call the timeout_loop function */

        timeout_loop(s, r, theta, delta, 0, niters, delay, settings);
    }));
}

$.fn.gauge = function(opts) {
 $('.skill').each(function(){
     
    var $this = $(this),
        data = $this.data();
 var level=$this.attr('data-level');

    if (data.gauge) {
      data.gauge.stop();
      delete data.gauge;
    }
    if (opts !== false) {
      data.gauge = new Gauge(this).setOptions(opts);
data.gauge.maxValue = 100; // set max gauge value
data.gauge.animationSpeed = 100; // set animation speed (32 is default value)
data.gauge.set(level); // set actual value
    }
 })
  return this;
};