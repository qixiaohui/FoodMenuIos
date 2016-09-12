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
			<TouchableHighlight style={styles.row} onPress={() => {this.forward(row)}}>
				<View style={styles.category}>
					<Text>{row.value}</Text>
				</View>
			</TouchableHighlight>
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
				renderSeparator={this._renderSeparator}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				 />
			</View>
		);
	}

	_renderSeparator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
		return (
		  <View
		    key={`${sectionID}-${rowID}`}
		    style={{
		      height: adjacentRowHighlighted ? 4 : 1,
		      backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
		    }}
		  />
		);
	}
};

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  category: {
  	margin: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f5fcff',
  }
});




