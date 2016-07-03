require('./server1').start(result=>
	result?console.log(result):console.log('started')
);
