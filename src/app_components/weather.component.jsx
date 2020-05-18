import React from 'react'

const Weather = (props) =>{
	return(
		<div className="container text-light">
			<div className="cards pt-4">
				<h1> {props.city}</h1>
				<h5 className="py-4">
				 <i className={`wi ${props.weatherIcon} display-1`}/>
				</h5>
				{props.temp_celsius?<h1 className="py-2">{props.temp_celsius}&deg;</h1>:null}
			{/** show max and min temperatures **/}
				{maxminTemp(props.temp_min, props.temp_max)}
				{props.description?<h4 className="py-4"> {props.description} </h4>:null}
			</div>
		</div>
		)
}


function maxminTemp(max,min){
	if(max && min){
		return(
		<h3>
		<span className="px-4">{max}&deg; </span>
		<span className="px-4">{min}&deg; </span>
		</h3>
		)	
	} else{
		return null
	}
	
}

export default Weather;