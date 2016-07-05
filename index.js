var Valichain = require('valichain');

global.Valichain = Valichain;

/*
var params = req.valichain(rules, req.allParams());
if (!params) {
	console.log(req.valichain.result)
	return res.badRequest();
}
*/

function VVE(rules) {
	var req = this.req;
	req.valichain.result = Valichain.validate(rules, req.allParams());
	var params = Valichain.extract(req.valichain.result);
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
