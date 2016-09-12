import React, { Component,  PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
   TouchableHighlight
} from 'react-native';

import properties  from '../../../util/properties';
import rest from '../../../rest/http';

export default class Recipes extends Component{
	static propTypes = {
		navigator: PropTypes.object.isRequired,
		url: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			recipe: {}
		};
	}

	render() {
		if(this.state.recipe.img){
			let img = this.state.recipe.img.split('@')[0];
			return (
				<View style={styles.container}>
					<Image style={styles.gallery} source={{uri: img}} />
					
				</View>
			);
		}else{
			return(
				<View style={styles.container}>
				</View>
			);
		}
	}

	componentWillMount() {

		rest.get(properties.zuofa, {url: this.props.url}).then((response) => {
			this.setState({
				recipe: response.data.content
			});
		}).catch((err) => {
			console.error(err);
		});
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#f5fcff'
  },
  gallery: {
  	marginTop: 70,
  	marginLeft: 10,
  	marginRight: 10,
  	marginBottom: 30,
  	height: 150
  },
  title: {
  	fontWeight: 'bold',
  	flex: 1,
  	fontSize: 14,
  	margin: 5
  }
});