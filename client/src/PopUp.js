import React , { Component } from 'react';
import './popUp.css';

export default class PopUp extends Component 
{
	
    render() {	
function chanceVisibility()
	{
		var temp=document.getElementsByClassName("popup")
		temp[0].style.display = 'none';
		document.getElementById("guildTable").style.display = 'table';							
	}	
	    return (
			<div className="popup" style={{'display':'none'}}>
			
					<h1 id="tierInfoH1">  <a href="#" onClick={() => {chanceVisibility();}} > <i id="x" class="fas fa-times"></i> </a>  Color Rank  </h1>
					
					<table id="tierInfo" className="table table-striped table-light">
					  <thead>
						<tr>
							<th> White Tier <br/> [ 3 - 10] </th>
							<th> Yellow Tier <br/> [ 10 - 25 ] </th>
							<th> Orange Tier <br/> [ 25 - 50 ] </th>
							<th> Blue Tier <br/> [ 50 - 100 ]  </th>
							<th> Green Tier <br/> [ 100 - 200 ]  </th>
							<th> GOLDEN Tier <br/> [ 200 ]  </th>				
							
						</tr>
					  </thead>
					  <tbody>
						<td> 
							<p > -Regular tier </p> 
							<p > -No eligibility </p> 
						</td>
						<td>  
							<p > - Low tier </p> 
							<p > - No special attributes </p> 
							<p > - Reward </p> 
							<p > - Eligible for 'Veteran Member' </p> 
							<p > - Increassed prize/chance in guild events/lottery </p> 
						</td>
						<td>  
							<p > - Medium tier </p> 
							<p > - Reward </p> 
							<p > - Veteran Members </p> 
							<p > - Eligible for officer bank for 'Veteran Member' </p> 
							<p > - Increassed prize/chance in guild events/lottery </p> 
						</td>
						<td>  
							<p > - High tier </p> 
							<p > - Reward </p> 
							<p > - Eligible for 'Elite Member' </p> 
							<p > - Eligible for officer bank </p> 
							<p > - Increassed prize/chance in guild events/lottery </p> 
							<p > - Eligible for special requests (Schedule, Etc ) </p> 
						</td>
						<td>  
							<p > - Higher tier </p> 
							<p > - Reward </p> 
							<p > - 'Elite Member' </p> 
							<p > - Eligible for officer bank </p> 
							<p > - Increassed chance/prize in lottery and guild events </p> 
							<p > - Eligible for 'Champion Member' </p> 
							<p > - Eligible for special requests (Schedule, Etc ) </p> 
							<p > - Discord access </p> 
						</td>
						<td>  
							<p > -Highest tier </p> 
							<p > -Eligible for everything </p> 
							<p > -'Champion Members' </p> 						
						</td>
					  </tbody>
				   </table>
					
					The color represent the current player level of support towards the guild and dictates the rank. <br/> Obviously it is very hard to track a lot of members therefor the color rank was created.<br/>
					Every guild member who has guild representation over a period of time gains the 'White Tier' automatically. <br/> Every time a player moves between tiers he gains a small token of reward and eligibility for other things.

					<h1 id="tierInfoH1"> How to earn support tier? </h1>
					<p className="infoP">* Activity.</p>
					<p className="infoP">* Guild events attendance.</p>
					<p className="infoP">* Donations.</p>
					<p className="infoP">* Support.</p>
					<p className="infoP">* REP</p>
			
			</div> 
	  );
    }
}





























