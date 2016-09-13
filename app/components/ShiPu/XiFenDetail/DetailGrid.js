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
import properties  from '../../../util/properties'
import rest from '../../../rest/http';
import Recipe from './Recipe';

export default class DetailGrid extends Component{
	static propTypes = {
		navigator: PropTypes.object.isRequired,
		url: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			})
		};
	}

	componentWillMount() {
		rest.get(properties.caipufeilei, {url: this.props.url}).then((response) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(response.data.list)
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	renderRow = (row) => {
		let img = row.img.split('@')[0];
		let value = row.value;
		if(row.value.length >= 9){
			value = value.slice(0,8)+'...';
		}
		return (
			<View style={styles.item}>
				<TouchableHighlight  onPress={() => {this.forward(row)}}>
	            	<Image style={styles.thumb} source={{uri: img}} />
	            </TouchableHighlight>
	            <Text style={styles.text}>
	              {value}
	            </Text>
			</View>
		);
	}

	forward = (row) => {
		this.props.navigator.push({
			title: row.value,
			component: Recipe,
			navigationBarHidden: false,
			passProps: {url: row.href}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
				contentContainerStyle={styles.list}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				style={styles.listview}
				 />
			</View>
		);
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  listview: {
  	margin: 5
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    justifyContent: 'center',
    padding: 3,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 95,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 90,
    height: 64
  },
  text: {
  	fontSize: 10,
    flex: 1,
    marginTop: 7,
    fontWeight: 'bold'
  }
});