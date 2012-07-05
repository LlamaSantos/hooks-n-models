var Hook = require("hook.io").Hook;
var ecstatic = require("ecstatic");
var connect = require("connect");
var flatiron = require("flatiron");
var app = flatiron.app;

var vanilla = new Hook({
    name: "vanilla",
    debug: true
});
vanilla.start();

// -- Setup handlers
vanilla.on("*::*::*::complete", function (data){
    console.info(data);
});

vanilla.on("disco::person::create", function (data){
    console.info(data);
    vanilla.on("disco::person::create::complete", { success: true });
});

app.use(flatiron.plugins.http, {
    before : [
        ecstatic(__dirname + "/public", {showDir: false}),
        connect.bodyParser()
    ]
});

app.router.post("/proxy", function (next){
    var body = JSON.parse(this.req.body);
    vanilla.emit(body.event, body);
    this.json({success: true});
});

app.router.attach(function (){
    this.log = app.log;
    this.config = app.config;
    this.view = function (body){
        var self = this;
        self.res.writeHead(200, {"Content-Type" : "text/html"});
        self.res.write(body);
        self.res.end();
    };
    this.json = function (data){
        var self = this;
        self.res.json(data);
    };
});

app.start(process.env.PORT || 9000, function (err){
    if (err){
        app.log.error(err);
    }
    else{
        app.log.info("Application successfully started up");
    }
});