if (!app){
    var app = {
        bus : new EventEmitter2()
    };
}

(function ($){
    "use strict";

    $("#btn").live("click", function (){
        app.bus.emit("disco::person::create", {
            first: "james",
            last : "white"
        });
    });

    app.bus.on("disco::person::create", function (data){
        $.post("/proxy", {
            event: this.event,
            data : JSON.stringify(data)
        }, function (data){
            $("#output").append("<li>" + data.success + "</li>");
        });
    });
})(jQuery);