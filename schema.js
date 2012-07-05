var _ = require("underscore");
var hookio = require("hook.io");

var options = {
    "first" : {
        "type": "string",
        "required": true,
        "default": "James"
    },
    "last" : {
        "type": "string",
        "required": true,
        "default": "James"
    }
};

var Schema = function Schema(name, options){
    var registry = {
    };

    var valueResolver = function (){

    };


    var compile = function (definition){
        var result = {};
        _(_.keys(definition)).each(
            function (key){
                result[key] = valueResolver(definition.type || "string")
            }
        );
    };

    return {

    };
};

