# sails-hook-valichain

Adds valichain functionality to sails requests.


# Installation

npm install sails-hook-valichain --save


# Usage

## Create reusable rules:

~~~javascript
var rules = {
    create : {
        name : new Valichain()
                   .s$trim()
                   .v$matches(/^[a-z\. ]+$/i)
                   .msg("Name must have only letters, spaces and dots"),
        address : new Valichain().default(null).s$trim().v$blacklist("'\""),
    },
    //...
};
~~~


**NOTE:** see [valichain](https://github.com/expedit85/valichain) and its [documentation](https://github.com/expedit85/valichain/blob/master/doc.md) for details about usage.



## Use inside a controller method:


~~~javascript
// returns the same object of Valichain.extract()
var params = req.valichain(rules.create);
if (!params) {
    sails.log.debug(
        "Validation failed. Results:",
        req.valichain.result        // result of Valichain.validate()
    );
    return res.badRequest();
}

console.log("validation succeeded: ", params);

var user = yield User.create({
    name: params.name,  // validate and sanitized value
    address: params.address  // validate and sanitized value
});

//...
~~~

**NOTE:** see [Valichain.extract()](https://github.com/expedit85/valichain/blob/master/doc.md#Valichain.extract) and [Valichain.validate()](https://github.com/expedit85/valichain/blob/master/doc.md#Valichain.validate) for details about result structures.


# License

MIT
