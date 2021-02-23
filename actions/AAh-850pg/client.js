function(properties, context) {
   
    var elements_to_select = "";
    
    if (properties.input === true) {
        elements_to_select += "input";
    }
    
    if (properties.select === true) {
        if (elements_to_select !== "")
            elements_to_select += ", ";
        elements_to_select += "select";
    }
    
    if (properties.textarea === true) {
        if (elements_to_select !== "")
            elements_to_select += ", ";
        elements_to_select += "textarea";
    }
    
    if (properties.button === true) {
        if (elements_to_select !== "")
            elements_to_select += ", ";
        elements_to_select += "button";
    }
    
    if (elements_to_select === "") {
        console.error("No tab values were reset.");
        return;
    }
    
    
    // async (delay running the code)
    if (properties.how_long_to_delay !== null && properties.how_long_to_delay !== undefined && properties.how_long_to_delay > 0) {
        setTimeout(function(){

            $(elements_to_select).each(function() { 

                this.type != 'hidden' ? $(this).attr("tabindex", 0) : '';

            });

        }, properties.how_long_to_delay);
    }
    // synchronous (run now)
    else {
        $(elements_to_select).each(function() { 
        
            this.type != 'hidden' ? $(this).attr("tabindex", 0) : '';

        });
    }
    

}