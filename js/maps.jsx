/******************* GOOGLE *******************/
// Create the google map
var map = new google.maps.Map(
	document.getElementById('map'),
	{
		center: {lat: 39.8282, lng: -98.5795},
		zoom: 4
	}
);
var infoWindow = new google.maps.InfoWindow({});
var markers = [];


// A function place a marker at a city location
function createMarker(city){
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
	// icon = "http://s2.quickmeme.com/img/0e/0e1bc9ee47057d1886a4f9537e392f1bb675b97d56d719e119903f49339cf0a5.jpg";	
	var cityLL = {
		lat: city.lat,
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	});
	// We only want ONE infowindow!
	// var infoWindow = new google.maps.InfoWindow({});
	google.maps.event.addListener(marker,'click', function(){
		infoWindow.setContent(`<h2> ${city.city}</h2><div>${city.state}</div><div>${city.yearEstimate}</div><a href="">CLick to zoom</a>`);
		infoWindow.open(map, marker)
	});
	// Push the marker just created above onto the global array "markers"
	markers.push(marker);
}

/******************* REACT *******************/

var GoogleCity = React.createClass({
	handleClickedCity: function(event){
		console.log("Someone Clicked on a city!");
		google.maps.event.trigger(markers[this.props.cityObject.yearRank-1],"click");
	},
	render: function(){
		return(
			<tr>
				<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
				<td className="city-rank">{this.props.cityObject.yearRank}</td>
			</tr>
		)
	}
});

var Cities = React.createClass({

	getInitialState: function() {
		return{
			currCities: this.props.cities
		}
	},

	handleInputChange: function(event){
		var newFiltervalue = event.target.value;
		// console.log(newFiltervalue);
		var filteredCitiesArray = [];
		// Loop through the list of cities!!
		this.props.cities.map(function(currCity, index){
			if(currCity.city.indexOf(newFiltervalue) !== -1){
				// hit! I dont care where it's at, but it's in the word
				filteredCitiesArray.push(currCity);
			}
		});
		console.log(filteredCitiesArray);
		// this.state.currCities = filteredCitiesArray;
		this.setState({
			currCities: filteredCitiesArray
		})
		
	},

	updateMarkers: function(event){
		event.preventDefault();
		// console.log("Update Markers!");
		markers.map(function(marker, index){
			marker.setMap(null);
		});
		this.state.currCities.map(function(city,index){
			createMarker(city)
		})

	},

	render: function(event){
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return(
			<div>
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange} />
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
})

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)



