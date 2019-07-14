var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var config = require('./config.my');

var multer = require('multer');
var path = require('path');

let storage=multer.diskStorage({
	destination: function(req,file,callback){
		callback(null,"views/assets/uploads/");
	},
	filename: function(req,file,callback){
		let extension = path.extname(file.originalname);
		let basename = path.basename(file.originalname,extension);
		callback(null,basename+"-"+Date.now()+extension);
	}
});
var upload = multer({storage:storage});

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

app.post('/db/upload/delete',function(req,res){
	var id=req.body.id;
	var qry=`delete from upload where id=${id}`;
	httpreq(qry,(rows)=>{
		res.send('success');
	},()=>{res.send('fail');});
});

app.get('/upload/:exp_id/:item_id',function(req,res){
	var exp_id=req.params.exp_id;
	var item_id=req.params.item_id;
	var qry=`select * from upload where exp_id=${exp_id} and item_id=${item_id}`;
	httpreq(qry,(rows)=>{
		res.render('list_upload.html',{rows:rows,exp_id:exp_id,item_id:item_id});		
	},()=>{res.send('fail');});
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

app.post('/experiment/data/upload',upload.fields([{name:'datafile1',maxCount:100},{name:'datafile2',maxCount:100},{name:'datafile3',maxCount:100}]),function(req,res){
	var itemid=req.body.itemid;
	var expid=req.body.expid;
	console.log(req.files);
	var fs=[];
	if(req.files.datafile1!=undefined){
		for(var i=0;i<req.files.datafile1.length;i++)
		{
			fs.push(req.files.datafile1[i].filename);
		}
	}
	if(req.files.datafile2!=undefined){
		for(var i=0;i<req.files.datafile2.length;i++)
		{
			fs.push(req.files.datafile2[i].filename);
		}
	}
	if(req.files.datafile3!=undefined){
		for(var i=0;i<req.files.datafile3.length;i++)
		{
			fs.push(req.files.datafile3[i].filename);
		}
	}
	if(fs.length==0)return;
	console.log(fs);
	var qry=`insert into upload values`;
	var v=``;
	for(var i=0;i<fs.length;i++){
		v=v+`(null,${expid},${itemid},'${fs[i]}')`;
		if(i!=fs.length-1)v=v+',';
	}
	qry=qry+v;
	httpreq(qry,()=>{
		res.send(`<script>location.replace('/experiment/${expid}');</script>`);
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
	httpreq(query,(ret)=>{

		res.send({msg:'success',insertId:ret.insertId});
	},()=>{
		res.send({msg:'fail'});
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