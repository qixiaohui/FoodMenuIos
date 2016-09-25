import React, { Component,  PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
   TouchableHighlight
} from 'react-native';
import DetailGrid from './XiFenDetail/DetailGrid';
import {ListItem} from 'native-base';

export default class Xifen extends Component{
	static propTypes = {
		navigator: PropTypes.object.isRequired,
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
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.props.data)
		});
	}

	renderRow = (row) => {
		return (
            <ListItem button onPress={() => {this.forward(row)}}>
                <Text>{row.value}</Text>
            </ListItem>
		);
	}

	forward = (row) => {
		this.props.navigator.push({
			title: row.value,
			component: DetailGrid,
			navigationBarHidden: false,
			passProps: {url: row.href}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				 />
			</View>
		);
	}
};

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5fcff',
  }
});




