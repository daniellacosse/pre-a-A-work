// JavaScript Document
 $(function(){
            
            $('dd').hide();
            
            $('dt').on("click", function () {
                                      
                $(this)
                    .next().slideDown()
                    .siblings('dd').slideUp();
                                      
                });
                  
        })();