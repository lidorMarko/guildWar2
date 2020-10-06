const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
var mysql = require('mysql');

const app = express();
const port = process.env.PORT ||5000 ;

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); /*necessary ? */

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var connection = mysql.createPool({
  host: 'remotemysql.com',
  user: process.env.REACT_APP_user,
  password: process.env.REACT_APP_password,
  database: process.env.REACT_APP_database
  
})

app.get('/api/passwords', (req, res) => {
	var outputArray = [];
	connection.query('SELECT * FROM `guildTable` ORDER BY tier DESC', function (error, results, fields) 
	{
			for(var i=0;results!=null && i<results.length;i++)
			{
				outputArray.push(results[i].name);	
				outputArray.push(results[i].tier);
				outputArray.push(results[i].nextTier);
			}
			console.log(outputArray);
			// Return it as json
			res.json(outputArray);
	});	
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

function calNextTier(tier)
{
	var start=0.0,diff=0.0;
    if(tier>=3 && tier<10)
	{
    	start=3;
    	diff=7;
	}
    if(tier>=10 && tier<25)
	{
    	start=10;
    	diff=15;
	}
    if(tier>=25 && tier<50)
	{
    	start=25;
    	diff=25;
	}
    if(tier>=50 && tier<100)
	{
    	start=50;
    	diff=50;
	}
    if(tier>=100 && tier<200)
	{
    	start=100;
    	diff=100;
	}
    if(tier==200)
	{
    	start=200;
    	diff=1;
	}
    var nextTier=0.0;
    var temp=parseFloat(tier,10);
    nextTier=Math.ceil( 100*((temp-start)/diff) );
	console.log("start="+start);
    console.log("next teir"+nextTier);
    return nextTier;
}

//variables for update check
var globalName='';
var globalTier='';

function check(name,tier,callback)
{
	connection.query("select tier FROM guildTable where name='"+name+"' and tier='"+tier+"'", function (error, results, fields) 
    {
    	if (error) 
    		throw error;
    	if(results)
    		return callback(true);
    	else
    		return callback(false);    	
    });	
}

router.post('/check',(request,response) => 
{
    var isUpdate='';
   check(globalName,globalTier,function(result)
   {
	   isUpdate=result;
	   console.log("change detected ? "+isUpdate);
       response.send([isUpdate,globalName,globalTier]);
   });
});

function updateDB(data,callback)
{		
	var newTier=data.tier;
	var name=data.name;
	console.log("the data of the current is:"+name+","+newTier);
	var newNextTier=calNextTier(newTier);
	connection.query("update guildTable set tier='"+newTier+"' ,nextTier='"+newNextTier+"' where name='"+name+"'", function (error, results, fields) 
	{
		if (error) 
			throw error;
		else
			console.log("db updated successfully"); 
	});	
	return callback(name);  	
}

router.post('/edit',(request,response) => 
{
    updateDB(request.body, function(result)
    {
       globalName =result;  
       globalTier=request.body.tier;
    });    
});

function addToDB(data,callback)
{
	var ImprovedData=JSON.stringify(data).substring(2);
    var name=ImprovedData.substring(0,ImprovedData.indexOf(','));
    var tier=ImprovedData.substring(ImprovedData.indexOf(',')+1,ImprovedData.indexOf('"'));
	console.log("the  tier of the current is :"+tier);		
    var nextTier=calNextTier(tier);  //calculating the next tier:
    
    //adding to db:
    connection.query("INSERT INTO `guildTable`(name,tier,nextTier) VALUES('"+name+"','"+tier+"','"+nextTier+"')", function (error, results, fields) 
    {
    	if (error) 
    		throw error;	
    	else
			return callback([name,tier]);
    });
}

router.post('/add',(request,response) => 
{	
	addToDB(request.body, function(result)
    {
       globalName =result[0];  
       globalTier=result[1];
    });
});

function deleteFromDB(data,callback)
{
	console.log("deleting from backend: "+data.name);
	
	//db interacting
	var name=data.name,tier;
	connection.query("select tier from guildTable where name='"+name+"'", function (error, results, fields) 
    {
    	if (error) 
    		throw error; 
    	if(results[0]!=null)
    		{
	        	tier=results[0].tier;
	        	connection.query("delete from guildTable where name='"+name+"'", function (error, results, fields) 
    			{
		    		if (error) 
		        		throw error;
		        	else
		        		{
		        			return callback([name,tier]);
			        		console.log("successfully deleted from db"); 
		        		}
    			});	
    		}
    });	
}

router.post('/delete',(request,response) => 
{   
    deleteFromDB(request.body, function(result)
    {
       globalName =result[0];  
       globalTier=result[1];
       console.log(result[0]);
       console.log(result[1]);
    });
});


// add router in the Express app.
app.use("/", router);

app.listen(port);

console.log(`Password generator listening on ${port}`);
