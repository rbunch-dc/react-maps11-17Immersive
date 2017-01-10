// Create the google map
var map = new google.maps.Map(
    document.getElementById('map'), 
    {
        center: {lat: 39.8282, lng: -98.5795},
        zoom: 4
    }
);

var markers = [];
var infoWindow = new google.maps.InfoWindow({});

function createMarker(city){
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
	// if(city.yearRank == 1){
	// 	icon = 'img/1.png';
	// }else if(city.yearRank == 39){
	// 	icon = 'img/atl.png';
	// }
	// console.log(city);
	var cityLatlng = {lat: city.lat, lng: city.lon};
	var marker = new google.maps.Marker(
	  	{
	    	position: cityLatlng,
	    	map: map,
	    	title: city.city,
	    	icon: icon
	  	}
	);

	google.maps.event.addListener(marker, 'click', function(){
		infoWindow.setContent(`<h2> ${city.city} </h2><div>${city.state}</div><div>${city.yearEstimate}</div>`);
		infoWindow.open(map, marker);
	});
	markers.push(marker);
}

// Create a Component for each City
var GoogleCity = React.createClass({
	handleClickedCity: function(){
		google.maps.event.trigger(markers[this.props.cityObject.yearRank-1],"click");		
	},
	render: function(){
		return(
			<tr>
				<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
				<td>{this.props.cityObject.yearRank}</td>
			</tr>
		)
	}
});

// Create the main cities component
var Cities = React.createClass({
	getInitialState: function() {
		return{
			currCities: this.props.cities
		}
	},
	handleInputChange: function(event){
		var newSearchValue = event.target.value;
		var filteredCitiesArray = [];
		// if(newSearchValue.length >= 3){
			this.state.currCities.map(function(currCity, index){
				console.log(currCity.city)
				if(currCity.city.indexOf(newSearchValue) !== -1){
					filteredCitiesArray.push(currCity);
				}
			});
			// NOT!!! 
			// this.state.currCities = filteredCitiesArray;
			this.setState({
				currCities: filteredCitiesArray	
			})
		// }
	},
	updateMarkers: function(event){
		event.preventDefault();
		console.log("Update!!")

		// for(var i=0; i < markers.length; i++){
		// 	markers[i].setMap(null);
		// }

		markers.map(function(marker, index){
			marker.setMap(null);
		});

		// for(var i = 0; i< this.state.currCities.length; i++){
		// 	createMarker(this.state.currCities[i], this.state.markers);
		// }

		this.state.currCities.map(function(city,index){
			createMarker(city, markers);
		});


	},
	render: function(){
		var cityRows = [];
		this.state.currCities.map(function(currentCity,index){
			// console.log(currentCity.city)
			// console.log(cities[index].city)
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});

		// var string = "Hello, World. I\'m cold."
		// Return the table HTML, with the cityRows built above
		return(
			<div>
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange}/>
					<input type="submit" value="Update Markers" />
				</form>
				<table>
					<thead>
						<tr>
							<th>City Name</th>
							<th>City Rank</th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>
				</table>
			</div>
		)
	}
});

ReactDOM.render(
	<Cities cities={cities} map={map} />,
	document.getElementById('cities-container')
)