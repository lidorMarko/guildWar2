import React, { Component } from 'react';
import {PostRequest} from './postRequest.js';
import axios from 'axios';
import ReactDOM from 'react-dom';
import PopUp from "./PopUp.js";

class TableCreator extends Component 
{
	  // Initialize state
	  state = { passwords: [] }
	
	  // Fetch passwords after first mount
	  componentDidMount() 
	  {
		this.getPasswords();
	  }
	  componentWillMount() 
	  {
		this.getPasswords();
	  }
	  // Get the passwords and store them in state	  
	  getPasswords = () => 
	  {
		fetch('/api/passwords')
		  .then(res => res.json())
		  .then(passwords => this.setState({ passwords }));
	  }
	  constructor(props) 
	  {
	    super(props);
	    this.DelCan = this.DelCan.bind(this);
	    this.Del = this.Del.bind(this);
	    this.Edit = this.Edit.bind(this);
	    this.addingToDB = this.addingToDB.bind(this);
	  }	
	
	addingToDB (newName,newTier,e) 
    {
        console.log(newTier+','+newName);
        if(newTier==null||newName==null)
        	alert("empty input !");
        else
        {
        	if(newTier<3 ||newTier>200)
            	alert("invalid tier number");
            else
        	{
            	var body = newTier+','+newName;
                axios.post('/add',body)
                .then(function (response) {
                  console.log(response); 
                })
                .catch(function (error) {
                  console.log(error);
                  alert("eror-cant reach the server");
                });
                
                //checking if it was added successful 
                axios.post('/check',body)
                .then(function (response) 
                {
                	if(response)
                		{
        	        		if(alert('added successfuly!')){} //when user clicks OK, it will return false and reload will be done!
        	        		else    window.location.reload(); 
                		}
                })
                .catch(function (error) {
                  console.log(error);
                });
        	}            
    	} 
    }
	
	DelCan = value => () => 
	{
		var number,x;
	    if(document.getElementById(value.id).style.visibility=='visible')
    	{
	    	document.getElementById(value.id).style.visibility = 'hidden';
	    	number=value.id.substring(value.id.indexOf('a')+1);
	    	x=document.getElementsByClassName(number);
	    	for(var i=0;i<x.length;i++)
    		{
	    		x[i].style.display ='none';
    		}
    	}
	    else
    	{
	    	document.getElementById(value.id).style.visibility = 'visible';	    	
	    	number=value.id.substring(value.id.indexOf('a')+1);
			console.log(number);
			console.log('is is about to be deleted/edited');
	    	x=document.getElementsByClassName(number);
	    	for(var i=0;i<x.length;i++)
    		{
	    		x[i].style.display ='inline';
    		}
    	}
	};
	
	Del= value => () =>
    {
		console.log("deleting"+value.name2);
		
    	//sending to back end
    	var body = {name:value.name2};
        axios.post('/delete',body)
        .then(function (response) {
          console.log(response); 
        })
        .catch(function (error) {
          console.log(error);
        });
        //checking whether the new values were added successful 
        axios.post('/check',body)
        .then(function (response) 
        {
        	if(response)
        		{
	        		if(alert('deleted successfuly!')){} //when user clicks OK, it will return false and reload will be done!
	        		else    window.location.reload(); 
        		}
        })
        .catch(function (error) {
          console.log(error);
        });        
  	}
    
    Edit= value => () =>
    {	
    	var x=document.getElementsByClassName(value[0]);
        var newTier=x[0].value;
        if(newTier<3 ||newTier>200)
        	alert("invalid tier number");
        else
        {
        	var body=
        	{
				name:value[1],
        		tier:newTier
        	};
			console.log("data of the edited user:"+value[0]+","+value[1]);
			
			axios.post('/edit',body)
            .then(response => (console.log(response.data)))
            .catch(function (error) {
              console.log(error);
            });        
			
            //checking whether the edition was successful 
            axios.post('/check',body)
            .then(function (response) 
            {
            	if(response)
            		{
    	        		if(alert('edited successfuly!')){} //when user clicks OK, it will return false and reload will be done!
    	        		else    window.location.reload(); 
            		}
				console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
            
        }
    }
    
	render()
	{
		var values=JSON.stringify(this.state.passwords).substring(1);
		values=values.slice(0, -1);
	
		var finallArr=[];
		while(values!==null)
			{
				if(values.indexOf(',')!==-1)
					{
						var temp=values.substring(0,values.indexOf(','));
						if(temp.charAt(0)=='"')
						{
							temp=temp.substring(1);
							temp=temp.substring(0,temp.indexOf('"'));
						}
						finallArr.push(temp);
					}
				if(values.indexOf(',')!==-1)
					values=values.substring(values.indexOf(',')+1);
				else
					{
						finallArr.push(values);
						values=null;
					}
			}
	
		var rows=[];
		var rowsCounter=0;
	    for (var i = 0; i < (Object.keys(finallArr).length)/3; i++)
	    {
	      rowsCounter++;
	  	  var RowTextColor="black";    	
	      let rowID = `row${i}`
	      let cell = [];
	      rows.push(<tr key={i} id={rowID}> {cell} </tr>);
	      for (var idx = 0; idx <4; idx++)
	      {
		    if(rowsCounter%2!==0)
	        	RowTextColor="white";
		    else
	        	RowTextColor="black";	    	
	    	var background="inherit";
	    	var CellTextColor=RowTextColor;    	
	        let cellID = `cell${i}-${idx}`
	        if(idx==2) /*the tier column*/
	    	{
	        	if(finallArr[(idx-1)+3*i]>=3 && finallArr[(idx-1)+3*i]<10)
	        		background="white";
	        	if(finallArr[(idx-1)+3*i]>=10 && finallArr[(idx-1)+3*i]<25)
	        		background="rgb(255,255,0)";
	        	if(finallArr[(idx-1)+3*i]>=25 && finallArr[(idx-1)+3*i]<50)
	        		background="rgb(255,165,0)";
	        	if(finallArr[(idx-1)+3*i]>=50 && finallArr[(idx-1)+3*i]<100)
	        		background="blue";
	        	if(finallArr[(idx-1)+3*i]>=100 && finallArr[(idx-1)+3*i]<200)
	        		background="green";
	        	if(finallArr[(idx-1)+3*i]==200)
	        		background="rgb(255,215,0)";
	    		CellTextColor="black";
	    	}
	        //giving the rank column id property in order to be able to delete the current.
	        var test=JSON.stringify(i+1);
	        var id='lula'+test;
	        var id2='adding '+test
			var name=document.getElementsByClassName("nameOf");
			var name2;
			if(name[i])
				name2=name[i].innerHTML; 
	                
	        if(idx==0) /*the rank column*/
	            cell.push(<td key={cellID} id={cellID} style={{color:RowTextColor}}> <mark style={{'backgroundColor':background,color:CellTextColor}}> <a id={id} className="delete" href="#" onClick={this.Del({name2})}> <i class="fas fa-minus-circle"></i></a> <a href="#" onClick={this.DelCan({id})} >{i+1}</a> </mark> </td>)
	        else if(idx==3)   
	            cell.push(<td key={cellID} id={cellID} style={{color:RowTextColor}}> <mark style={{'backgroundColor':background,color:CellTextColor}}> {finallArr[(idx-1)+3*i]} % <button className={id2} id="addingButton" onClick={this.Edit([test,name2])}>save</button> </mark> </td>)
	        else if(idx==2)
	            cell.push(<td key={cellID} id={cellID} style={{color:RowTextColor}}> <mark style={{'backgroundColor':background,color:CellTextColor}}> {finallArr[(idx-1)+3*i]} <input className={id2}/> </mark> </td>)
	        else
	            cell.push(<td key={cellID} id={cellID} style={{color:RowTextColor}}>  <p className="nameOf" >{finallArr[(idx-1)+3*i]}</p></td>)	        	
	      }
	    }
		
	    
	    let newTier,newName;
	    function input1Value(e)
	    {
	        newTier= e.target.value;
	    }
	    function input2Value(e)
	    {
	        newName= e.target.value;
	    }
	    
	    let cell = [];
	    let cellID = `cell${i}-${idx}`;
		cell.push(<td key={cellID} id={cellID}> </td>);
		cellID = `cell${i}-${idx+1}`;
		cell.push(<td key={cellID} id={cellID}> <input onChange={(e) => {input1Value(e)}} type='text' placeholder="name"  /> </td>);
		cellID = `cell${i}-${idx+2}`;
		cell.push(<td key={cellID} id={cellID}> <input onChange={(e) => {input2Value(e)}} type='text' placeholder="tier" /> </td>);
		cellID = `cell${i}-${idx+3}`;
		cell.push(<td key={cellID} id={cellID}> <button onClick={(e) => {this.addingToDB(newName,newTier,e);}} > add </button> </td>);
		let rowID = `row${i}`;
		rows.push(<tr key={i} id={rowID}>{cell}</tr>);  

///dealing with info button
		function aboutTier()
		{
			document.getElementById("guildTable").style.display = 'none';
			var temp=document.getElementsByClassName("popup")
			temp[0].style.display = 'block';						
		}
		var thead=[];
		thead.push(<th scope="col">Rank</th>);
		thead.push(<th scope="col">Name</th>);
		thead.push(<th scope="col">Tier <a href="#" > <i onClick={() => {aboutTier();}} class="fas fa-info-circle"></i> </a> </th>);
		thead.push(<th scope="col">Next Tier</th>);
		

	  return (
	    <div>		
			<div className="row" >
				<div className="col-lg-2 col-md-1 col-sm-1"></div>
				<div className="col-lg-8 col-md-10 col-sm-10">
					<table style={{'display':'table'}} id="guildTable" className="table table-striped table-light">
					  <thead>
						<tr>
							{thead}
						</tr>
					  </thead>
					  <tbody>
							{rows}
					  </tbody>
				   </table>
			       <PopUp />
				</div>
				<div className="col-lg-2 col-md-1 col-sm-1"></div>
			</div>
	    </div>
	  );
	}
}

export default TableCreator;

