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

export default class Xifen extends Component{
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
		return (
			<View style={styles.item}>
	            <Image style={styles.thumb} source={{uri: img}} />
	            <Text style={styles.text}>
	              {row.value}
	            </Text>
			</View>
		);
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
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});