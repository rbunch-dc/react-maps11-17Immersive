
function calculate(){

}

// class Calculator extends React.Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {}
// 	}
// }

function Year(props){
	return(
		<p>{props.age}</p>
	)
}

var Calculator = React.createClass({

	getInitialState: function() {
		return{
			value: 2016
		}
	},

	handleChange: function(event){
		// BAD!! We want a re-render
		// this.state.value = event.target.value;
		this.setState({
			value: (2016 - event.target.value)
		})
	},

	render: function(){
		var age = calculate();
		return(
			<div>
				<form>
					<input type="text" placeholder="Birthyear" onChange={this.handleChange} />
					<input type="submit" value="Click Me!!" onChange={this.handleChange} />
					<Year age={this.state.value} />
				</form>
			</div>
		)
	}
});

ReactDOM.render(
	<Calculator />,
	document.getElementById('age-calc')
)