import React, { Component,  PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
   TouchableHighlight
} from 'react-native';

export default class Xifen extends Component{
	static propTypes = {
		title: PropTypes.string.isRequired,
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
			<TouchableHighlight onPress={() => {}}>
				<View style={styles.category}>
					<Text>{row.value}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				style={styles.listview}
				 />
			</View>
		);
	}
};

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  listview: {
  	margin: 5
  }
});




