function(properties, context) {

        const options = {
            uri: properties.url + "/api/1.1/wf/delete_page",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                page: properties.page,
                private_token: properties.private_token	
            },
            json: true
        };


    //  return {"error": "test"}
    var response;
    try {
        response = context.request(options);
    } catch (error) {
        return {
            "success": false,
            "error" : "Request failed: " + JSON.stringify(options),
            "valid" : false
        }
    }
    
    	/* return {
            "responseDump": JSON.stringify(response)
        }*/
    	
    
    
        // check if response is 2XX
        // else, return error
        var success = false;
        var error = null;
        if (response.statusCode > 199 && response.statusCode < 300) {
            success = true;
        }
        else {
            error = "Status Code: " + response.statusCode + " \nbody: " + JSON.stringify(response.body);
        }
    
        return {
            "error": error,
            "success": success,
            "responseCode": response.statusCode,
            "responseDump" : JSON.stringify(response)
        }



}