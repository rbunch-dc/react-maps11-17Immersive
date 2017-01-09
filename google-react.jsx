function GoogleCity(props){
	return(
		<div className="cityName">
			<table border=1>
				<tr>
					<td>{props.cityObject.city}</td>
					<td>{props.cityObject.yearRank}</td>
				</tr>
			</table>
		</div>
	)
}

var Cities = React.createClass({
	render: function(){
		var cityRows = [];
		this.props.cities.map(function(currentCity,index){
			// console.log(currentCity.city)
			// console.log(cities[index].city)
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		})
		var string = "Hello, World. I\'m cold."
		return(
			<div>
				{cityRows}
			</div>
		)
	}
});

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
)