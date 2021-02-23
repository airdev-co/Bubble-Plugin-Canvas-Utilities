function(properties, context) {


    const options = {
        uri: properties.url,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    };


    //  return {"error": "test"}
    var response;

    try {
        // send request
        response = context.request(options);

    } catch (error) {
        if (response)
            return {
                "success": false,
                "error" : "Request failed: " + JSON.stringify(options) + JSON.stringify(error),
                "responseDump": JSON.stringify(response),
            };
        return {
            "success": false,
            "error" : "Request failed: " + JSON.stringify(options) + JSON.stringify(error),
        };
    }
    

    try {
        
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

        var responseBody = JSON.parse(response.body);
    
        var app_id = (responseBody.app_data.appname === undefined) ? null : responseBody.app_data.appname;
    
        return {
            "error": error,
            "success": success,
            "responseCode": response.statusCode,
            "responseDump" : JSON.stringify(response),
            "app_id" : app_id
        };
    }
    catch (err) {
        return {
            "error": error,
            "success": false,
            "responseCode": response.statusCode,
            "responseDump" : JSON.stringify(response),
        }
    }

}