
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.angularpage = function(req, res){
	res.sendfile(__dirname + '/index.html')
}