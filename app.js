var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.my');

var app = express();
var log=console.log;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use('/assets',express.static(__dirname + '/views/assets'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {

  var query=`select * from experiment`;
  httpreq(query,(rows)=>{
  	log(rows);
  	res.render('index.html',{rows:rows});

  },()=>{res.send('fail');})
  
});

app.get('/experiment/insert', function (req, res) {
  res.render('insert_experiment.html');
});

app.get('/experiment/update/:id', function (req, res) {
	var id=req.params.id;
	var query=`select * from experiment where id=${id}`;
	httpreq(query,(rows)=>{

		res.render('update_experiment.html',{rows:rows});

	},()=>{
		res.send('fail');
	})
  
});

app.post('/db/experiment/item/update',function(req,res){
	var tb=req.body.tb;
	var id=req.body.id;
	var vals=req.body.vals;


	var query=`update experiment_${tb} set ${vals} where id=${id}`;
	httpreq(query,()=>{
		res.send('success');
	},()=>{res.send('fail');});
});


app.post('/db/experiment/item/delete',function(req,res){
	var tb=req.body.tb;
	var id=req.body.id;

	
	var query=`delete from experiment_${tb} where id=${id}`;
	httpreq(query,()=>{
		res.send('success');
	},()=>{res.send('fail');});
});




app.get('/experiment/:id',function(req,res){

	var id=req.params.id;
	var query=`select * from experiment where id=${id}`;
	httpreq(query,(rows)=>{
		var s=rows[0].experiment_attribute;
		s=decodeURIComponent(s);
		var j=JSON.parse(s);
		var exp_name=rows[0].experiment_name;
		//res.render('insert_data.html',{j:j,exp_name:exp_name});	

		var query2=`select * from experiment_${j.table_name}`;
		httpreq(query2,(rows)=>{

			res.render('list_data.html',{
				id:id,
				rows:rows,
				j:j,
				exp_name:exp_name,
			});		

		},()=>{res.send('fail');});

	},()=>{res.send('fail');});


	
});

app.get('/experiment/:id/item/insert',function(req,res)
{
	var id=req.params.id;
	var query=`select * from experiment where id=${id}`;
	httpreq(query,(rows)=>{
		var s=rows[0].experiment_attribute;
		s=decodeURIComponent(s);
		var j=JSON.parse(s);
		var exp_name=rows[0].experiment_name;
		res.render('insert_data.html',{j:j,exp_name:exp_name,id:id});	
	},()=>{res.send('fail');});
	
});

app.get('/experiment/:id/item/:item_id/update',function(req,res)
{
	var id=req.params.id;
	var item_id=req.params.item_id;
	var query=`select * from experiment where id=${id}`;
	httpreq(query,(rows)=>{
		var s=rows[0].experiment_attribute;
		s=decodeURIComponent(s);
		var j=JSON.parse(s);
		var exp_name=rows[0].experiment_name;
		//res.render('insert_data.html',{j:j,exp_name:exp_name,id:id});	
		var query2=`select * from experiment_${j.table_name} where id=${item_id}`;

		httpreq(query2,(rows2)=>{

			res.render('update_data.html',{
				rows:rows2,
				id:id,
				item_id:item_id,
				j:j,
				exp_name:exp_name,
			});

		},()=>{res.send('fail');});

	},()=>{res.send('fail');});
	
});

app.post('/db/experiment/item/insert',function(req,res){
	var tb=req.body.tb;
	var attr=req.body.attr;
	var query=item_insert_query_generator(tb,attr);
	httpreq(query,()=>{
		res.send('success');
	},()=>{
		res.send('fail');
	});
});

function item_insert_query_generator(tb,attr){
	var query=`insert into ${tb} values(null`;
	for(var i=0;i<attr.length;i++)
	{
		query=query+`,'`+attr[i]+`'`;
	}
	query=query+')';
	return query;
}

app.get('/table', function (req, res) {
  res.render('table-example.html');
});

app.post('/db/experiment/insert',function(req,res){
	var plant=req.body.plant;
	var exp_name=req.body.exp_name;
	var exp_attr=req.body.exp_attr;


	var query=`insert into experiment values(null,${plant},'${exp_name}','${exp_attr}')`;
	var query2=``;
	httpreq(query,
		()=>{

			query2=create_table_query_generate(exp_attr);
			

			httpreq(query2,
				()=>{
					res.send('success');
				},
				()=>{
					res.send('fail');
				});


		},()=>{
			res.send('fail');
		});
	
});


app.post('/db/experiment/delete',function(req,res){
	var tb=req.body.tb;
	var id=req.body.id;
	var query=`delete from experiment where id=${id}`;
	var query2=`drop table experiment_${tb}`;

	httpreq(query,()=>{

		httpreq(query2,()=>{

			res.send('success');

		},()=>{res.send('fail');});

	},()=>{res.send('fail');});
});



function create_table_query_generate(attr)
{
	var query=``;
	attr=decodeURIComponent(attr);
	attr=JSON.parse(attr);
	tb_name=attr.table_name;
	attr_str_list=attr.attr_str;

	query=`create table experiment_${tb_name}(id int primary key auto_increment`;
	for(var i=0;i<attr_str_list.length;i++)
	{
		query=query+`,${attr_str_list[i]} varchar(255)`;
	}
	query=query+`)`;

	return query;

}


function httpreq(query,passcallback,failcallback){
	log(query);

	var connection = mysql.createConnection(config);
  	connection.connect();
  	connection.query(query, function(err, rows, fields) {
	  if (!err){
	  	passcallback(rows);
	  }
	  else{
	  	failcallback();
	  }
	});
  	connection.end();

}


app.listen(52080, function () {
  console.log('smartfarm v2.1.0');
});