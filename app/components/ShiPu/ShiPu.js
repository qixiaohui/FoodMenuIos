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

import {Container, Content, Spinner, ListItem, Badge} from 'native-base';

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
            <ListItem button onPress={() => {this.forward(row)}}>
                <Text>{row.category}</Text>
                <Badge primary>{row.subCategory.length}</Badge>
            </ListItem>
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
		if(this.state.dataSource._dataBlob) {
			return (
				<View style={styles.container} >
					<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					style={styles.listview} />
				</View>
			);
		} else {
			return (
	            <View style={styles.containerLoading}>
                    <Spinner color='#45D56E' />
	            </View>
			);
		}
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listview: {
  	paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5fcff',
  }
});