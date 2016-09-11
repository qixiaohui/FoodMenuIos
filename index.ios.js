/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import BaseComponent from  './app/components/BaseComponent'
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

class FoodMenu extends Component {
  render() {
    const {nav} = this.props;
    return (
      <NavigatorIOS style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{
          title: 'base',
          component: BaseComponent,
          passProps: {nav}
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('FoodMenu', () => FoodMenu);
