import React, { Component } from 'react';
import Rest from '../../rest/http';
import properties from '../../util/properties';
import Xifen from './XiFen';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS
} from 'react-native';

export default class Shipu extends Component{
	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			})
		};
	}

	componentWillMount = () => {
		Rest.get(properties.caipudaquan, {}).then((response) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(response.data.list)
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	renderRow = (row) => {
		return (
			<TouchableHighlight onPress={() => {this.forward(row)}}>
				<View style={styles.category}>
					<Text>{row.category}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	forward = (row) => {
		this.props.navigator.push({
			title: row.category,
			component: Xifen,
			navigationBarHidden: false,
			passProps: {data: row.subCategory}
		});
	}

	render() {
		return (
			<View style={styles.container} >
				<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				style={styles.listview} />
			</View>
		);
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  listview: {
  	paddingTop: 5,
  },
  category: {
  	margin: 5
  }
});