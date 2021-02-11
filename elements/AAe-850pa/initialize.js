function(instance, context) {
    
    function addToPage() {
        var canvas = instance.canvas;
        var iframeCode = `<iframe src="https://airdevco.s3-us-west-1.amazonaws.com/serve_files/3rd-party-cookies-check/start.html"
    style="display:none" />`;
        $(canvas).append(iframeCode);
    }
    

    var receiveMessage = function (evt) {
        console.log(evt);
        if (evt.data === 'MM:3PCunsupported') {
            instance.publishState("3rd_party_cookies_blocked", true);
            instance.triggerEvent("3rd_party_cookies_blocked", function(err) {
                console.error(err);
            });
        } else if (evt.data === 'MM:3PCsupported') {
            instance.publishState("3rd_party_cookies_blocked", false);
        }
    };
    window.addEventListener("message", receiveMessage, false);

    addToPage();

}