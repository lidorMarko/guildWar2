import React , { Component } from 'react';
import './guild.css';
import TableCreator from './tableCreator';


export default class Guild extends Component 
{
	   // Initialize state
	  state = { passwords: [] }

	  // Fetch passwords after first mount
	  componentDidMount() {
		this.getPasswords();
	  }

	  getPasswords = () => {
		// Get the passwords and store them in state
		fetch('/api/passwords')
		  .then(res => res.json())
		  .then(passwords => this.setState({ passwords }));
	  }
	 
    render() {
		const { passwords } = this.state;
			
	    return (
			  <div id="background-wrap">
				<div className="bubble x1"></div>
				<div className="bubble x2"></div>
				<div className="bubble x3"></div>
				<div className="bubble x4"></div>
				<div className="bubble x5"></div>
				<div className="bubble x6"></div>
				<div className="bubble x7"></div>
				<div className="bubble x8"></div>
				<div className="bubble x9"></div>
				<div className="bubble x10"></div>
				
				<div className="row" dir="rtl">
					<div className="col-lg-2 col-md-1 col-sm-1"></div>
				    <div className="col-lg-8 col-md-10 col-sm-10"> <h1> Thracians </h1>  </div>
					<div className="col-lg-2 col-md-1 col-sm-1"></div>
				</div>	
				
				  
				<TableCreator data={passwords}/>

			</div>
	  );
    }
}





























