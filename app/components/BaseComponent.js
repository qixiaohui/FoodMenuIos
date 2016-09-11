import React, { Component } from 'react';
import Shipu from './ShiPu/ShiPu';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';

export default class BaseComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'shipu'
		};
	}

	render() {
		return (
	      	<TabBarIOS
	        unselectedTintColor='#929292'
	        tintColor='white'
	        barTintColor='#212121'
	      	>
	      		<TabBarIOS.Item
		        title='食谱'
		        icon={require('../img/icon/ic_restaurant_menu.png')}
		        selected={this.state.selectedTab === 'shipu'}
		        onPress={() => {
		          this.setState({
		            selectedTab: 'shipu'
		          });
		        }}
		        >
		        	<Shipu navigator={this.props.navigator} />
		        </TabBarIOS.Item>
	      	</TabBarIOS>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});