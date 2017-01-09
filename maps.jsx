var map = new google.maps.Map(
    document.getElementById('map'), 
    {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    }
);

function GoogleCity(props){
    return(
        <div className="cityName">
            {props.cityObject.city}
        </div>
    )
}


var Cities = React.createClass({
    render: function(){
        var cityRows = [];
        this.props.cities.map(function(city, index){
            cityRows.push(<GoogleCity key={index} cityObject={city} />)
        })
        return(
            <div className="cities">
                {cityRows}
            </div>
        )
    }    
})

  
ReactDOM.render(
    <Cities cities={cities} />,
    document.getElementById('cities-container')
)

