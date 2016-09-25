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
import { Container, Content, Card, CardItem, Thumbnail, Icon, Spinner } from 'native-base';
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
			}),
			menuIndex: 2
		};
	}

	componentDidMount() {
		rest.get(properties.caipufeilei, {url: this.props.url}).then((response) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(response.data.list)
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	fetchMoreMenu = () => {
		if(!this.state.dataSource._dataBlob) return;
		rest.get(properties.caipufeilei, {url: `${this.props.url}?page=${this.state.menuIndex}`}).then((response) => {
			// concat more menu list from current menu list and increment page index
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.state.dataSource._dataBlob.s1.concat(response.data.list)),
				menuIndex: this.state.menuIndex+1
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
            <Card >
                <CardItem button onPress={() => {this.forward(row)}}>                       
                    <Image style={{ resizeMode: 'cover' }} source={{uri: img}} /> 
                </CardItem>
                <CardItem>
                    <Text style={{textAlign: 'center'}}>{value}</Text>
                </CardItem>
           </Card>
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
		if(this.state.dataSource._dataBlob) {
			return (
				<View style={styles.container}>
					<ListView
					onEndReached={this.fetchMoreMenu()}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					style={styles.listview}
					 />
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
  	flex: 1,
  	backgroundColor: '#f5fcff'
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listview: {
  	margin: 3
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
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});