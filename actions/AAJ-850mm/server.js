function(properties, context) {


        const options = {
            uri: properties.url + "/api/1.1/wf/check_app_location",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                code: properties.code
            },
            json: true
        };


    //  return {"error": "test"}
    var response;
    var valid = false;
    var attempts = 0;
    try {
        // send request
        // january 19 2021: adding polling here (checking multiple times if response is not "valid")
        while (valid === false && attempts < properties.max_poll_time) {
            response = context.request(options);

            valid = (response.body === undefined) ? false : response.body.response.valid;
            
            // only check once if "poll_for_response" is false
            if (properties.poll_for_response === false)
                break;
            
			if (valid === false) {
                context.async(async callback => {
                    // wait while polling
                    
                     await new Promise(resolve => setTimeout(callback, 800));
                });
            }
            
            attempts++;
        }
    } catch (error) {
        return {
            "success": false,
            "error" : "Request failed: " + JSON.stringify(options) + JSON.stringify(error),
            "valid" : false,
        }
    }
    
        
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

        var valid = (response.body === undefined) ? false : response.body.response.valid;

        return {
            "error": error,
            "success": success,
            "responseCode": response.statusCode,
            "responseDump" : JSON.stringify(response),
            "valid" : valid
        };

}