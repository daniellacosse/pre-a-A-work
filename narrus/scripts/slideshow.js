function slideAdvance() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    $active.addClass('last-active');
        
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 300, function() {
            $active.removeClass('active last-active');
        });
}

function slideRetreat() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:first');

    var $next =  $active.prev().length ? $active.prev()
        : $('#slideshow IMG:last');

    $active.addClass('last-active');
        
    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 300, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    
    $('#arrow_right').on('click', function() {
    	
		slideAdvance();
    	
    });
    
    $('#arrow_left').on('click', function() {
    	
		slideRetreat();
    	
    });

});