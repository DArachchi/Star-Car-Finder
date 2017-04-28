// Include React as a dependency
import React, {Component, PropTypes as T } from 'react';
import Login from './Login';
import {amber700, deepOrangeA400, indigo900, lightBlueA400} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { Jumbotron } from 'react-bootstrap';

// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

function openNaviDrawer() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
	center: {
		textAlign: 'center'
	},
	drawerItem: {
		marginLeft: '50px',
		marginTop: '20px',
		width: '150px'
	},
	navibar: {
		position: 'fixed'
	},
  title: {
    cursor: 'pointer',
  },
}

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: deepOrangeA400,
		accent1Color: amber700
	}
});

// Create the Main component
class Main extends Component {

	static contextTypes = {
		router: T.object
	};

	// Constructor and states for Navi Drawer
	constructor(props) {
		super(props);
		this.state = {open: false};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	};

	handleToggle() {
		return (this.setState({open: !this.state.open}));
	};
	handleClose() {
		return(this.setState({open: false}));
	};

	render() {
		let children = null;
		if (this.props.children) {
			children = React.cloneElement(this.props.children, {
				auth: this.props.route.auth //sends auth instance to children
			})
		}

		return (
			// Main container includes material-ui theme
			<MuiThemeProvider muiTheme={muiTheme}>
				<div className="main-container">
					<AppBar title={<span style={styles.title}>Star Car Finder</span>} style={styles.navibar} onLeftIconButtonTouchTap={this.handleToggle} iconElementRight={<FlatButton label="About Us" />} />
					<Drawer docked={false} width={300} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
						<AppBar title="Star Car Finder" style={styles.navibar} iconElementLeft={<IconButton onTouchTap={this.handleClose}><NavigationClose /></IconButton>}> </AppBar>
						<MenuItem style={styles.drawerItem} onTouchTap={this.handleClose}>Sign In</MenuItem>
						<MenuItem style={styles.drawerItem} onTouchTap={this.handleClose}>Register</MenuItem>
						<Link to="/Results"><MenuItem style={styles.drawerItem} onTouchTap={this.handleClose}>Show All Vehicles</MenuItem></Link>
					</Drawer>

					<div className="container">
						{/* Here we will deploy the sub components (Search or Saved */}
						{/* These sub-components are getting passed as this.props.children */}
						{this.props.children}



						<footer>
							<hr />
							<p className="pull-right">
								<i className="fa fa-github" aria-hidden="true"></i>
								Proudly built using React.js
							</p>
						</footer>

					</div>
				</div>
			</MuiThemeProvider>
		);
	}
};

// Export the module back to the route
export default Main;
