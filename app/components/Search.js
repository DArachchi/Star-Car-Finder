import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import helpers from '../utils/helpers';


const items = [];
for (let i = 0; i < 100; i++ ) {
  items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

const styles = {
	button: {
		margin: '50px'
	},
	center: {
		textAlign: 'center'
	},
	panelHeader: {
		backgroundColor: '#1A237E'
	},
	panelTitle: {
		color: '#FFFFFF',
		fontSize: '20pt'
	}
}

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			make: null,
			makes: [],
			makeMenuItems: [],
			vehicles: ""
		};
	}

	componentDidMount() {
		helpers.getVehicles().then(function(vehicleData) {
			this.setState({ vehicles: vehicleData.data });
			// Fill the 'makes' array with all the makes without duplicates and sort in alphabetical order
			for(let i=0;i<this.state.vehicles.length;i++) {
				if(this.state.makes.indexOf(this.state.vehicles[i].make) == -1) {
					this.state.makes.push(this.state.vehicles[i].make);
				}
				this.state.makes.sort();
			}
			// Create menu items for each make
			for(let i=0;i<this.state.makes.length;i++) {
					this.state.makeMenuItems.push(<MenuItem value={this.state.makes[i]} key={i} primaryText={this.state.makes[i]} />);
			}
		}.bind(this));
	}

	handleChange = (event, index, value) => {
		this.setState({make: value});
	}

	render() {
		return(
			<div className="main-container">
				<div className="row">
					<div className="col-lg-12">
						<Paper zDepth={2}>
							<div className="panel-heading" style={styles.panelHeader}>
								<h1 className="panel-title" style={styles.panelTitle}>
									<strong>
										<i className="fa fa-list"></i>Search for a Vehicle
									</strong>
								</h1>
							</div>
							<div className="panel-body">
								<SelectField
								value={this.state.make}
								onChange={this.handleChange}
								floatingLabelText="Vehicle Make"
								>
								{this.state.makeMenuItems}
								</SelectField>
								<RaisedButton>Search by Vehicle Make</RaisedButton>
							</div>
						</Paper>
					</div>
				</div>
			</div>
		)
	}
};

export default Search;