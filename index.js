var Valichain = require('valichain');

/*
var params = req.valichain(rules.create, req.allParams());
if (!params) {
	console.log(req.valichain.result)
	return res.badRequest();
}
*/

function VVE(rules) {
	// console.log("at VVE");
	// console.log(rules);
	// console.log(rules.name);
	// console.log("rules.name == Valichain => ", rules.name.constructor.name === "Valichain");
	var req = this.req;

	console.log(req.valichain);

	var params = req.allParams();

	// console.log("==========================================================");
	// console.log("before validate: ", params);
	// console.log(_.keys(rules), _.keys(params));
	var result = req.valichain.result = Valichain.validate(rules, params);
	// console.log("after validate: ", result);

	// console.log("before extract: ");
	var params = Valichain.extract(result);
	// console.log("after extract: ", params);

	return params;
}




module.exports = function(sails) {

  return {

    initialize: function(cb){

      sails.on('router:route', function(requestState) {

        requestState.req['valichain'] = VVE.bind(requestState);

      });

      return cb();
    }

  }

};