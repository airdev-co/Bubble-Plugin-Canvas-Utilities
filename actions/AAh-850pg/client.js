function(properties, context) {
    
    $('input, select, textarea, button').each(function() { 
        
        this.type != 'hidden' ? $(this).attr("tabindex", 0) : '';
        
    });

}