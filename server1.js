var PORT = 8080;
var express = require('express'),
	app = express(),
	http = require('http').Server(app)
	captcha = require('captchapng');
	bodyParser = require('body-parser');
	session = require('express-session'),
	
module.exports = (function(){
	function inner(){
		this.start = function(whatToDo){
			let checkCap = (req, res, next)=>{
								res.redirect('/captcha');
				}								
				
			};
			app.use(express.static('public'));
			app.use(bodyParser());
			app.get('/captcha', function(req, res) {
				res.sendFile(__dirname + '/public/captcha.html');
			});
			
			
			var cap;
			req.session.cap = parseInt(Math.random()*9000 + 1000);
			function suspense(req, res) {
				
				if(req.url=='/captcha.png') {
					var p = new captcha(80,30, cap); 
					p.color(0, 0, 0, 0); 
					p.color(80, 80, 80, 255); 
 
					var img = p.getBase64();
					var imgbase64 = new Buffer(img,'base64');
					res.writeHead(200, {
						'Content-Type': 'image/png'
					});
					res.end(imgbase64);
			}else
				res.end('');
			
			}
			app.get('/captcha.png', suspense);
			
			app.post('/captcha', checkCap, function(req, res){
				var entry = req.body.src;
				if(entry == req.session.cap) {
					console.log('S');
					res.json({'answer' : 'Correctly!'});
				   }else{
					res.json({'answer' : 'Try again!'});
					console.log('W');
					res.redirect('/captcha.html');
				}
			});
			
			http.listen(process.env.port || PORT, function(){
			  console.log(PORT);
		  });
		};
	}
	return new inner;
})();