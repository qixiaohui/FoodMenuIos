import React, { Component,  PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
   TouchableHighlight
} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Badge, Spinner } from 'native-base';

import properties  from '../../../util/properties';
import rest from '../../../rest/http';
import _ from 'underscore';

export default class Recipes extends Component{
	static propTypes = {
		navigator: PropTypes.object.isRequired,
		url: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			recipe: {}
		};
	}

	render() {
		if(this.state.recipe.img){
			let img = this.state.recipe.img.split('@')[0];
			console.log(this.state.recipe.content);
			return (
	            <Container style={{ marginTop: 70}}>
	                <Content>
	                    <Card>
	                        <CardItem cardBody> 
	                            <Image style={{ resizeMode: 'cover', height: 180 }} source={{uri: img}} /> 
		   						{_.map(this.state.recipe.content, (recipe) => {
									return (
										<View>
										<Badge style={{marginTop: 15}} primary>{recipe.subtitle}</Badge>
										{_.map(recipe.list, (list) => {
											return (<Text style={styles.recipe} key={list}>{list}</Text>);
										})}
										</View>
									);
								})}
	                            <Button transparent textStyle={{color: '#87838B'}}>
	                                389 Stars
	                            </Button>
	                        </CardItem>
	                   </Card>
	                </Content>
	            </Container>
			);
		}else{
			return (
	            <View style={styles.containerLoading}>
                    <Spinner color='#45D56E' />
	            </View>
			);
		}
	}

	componentWillMount() {

		rest.get(properties.zuofa, {url: this.props.url}).then((response) => {
			let data = response.data.content;
			let titleLen = data.subtitle.length;
			let init = 0;
			let content = [];
			for(let i = 0; i< data.content.length; i++) {
				if(init === titleLen) break;
				if(data.content[i].list.length === 0){
					continue;
				}else{
					content.push({subtitle: data.subtitle[init],list: data.content[i].list});
					init++;
				}
			}
			data.content = content;
			delete data.subtitle;
			this.setState({
				recipe: data
			});
		}).catch((err) => {
			console.error(err);
		});
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#f5fcff'
  },
  gallery: {
  	marginTop: 70
  },
  title: {

  	flex: 1,
  	fontSize: 14,
  	paddingLeft: 20,
  	paddingTop: 10,
  	paddingBottom: 10,
  	backgroundColor: '#fefefe'
  },
  recipe: {
  	backgroundColor: '#ffffff',
  	fontSize: 12,
  	paddingLeft: 30,
  	paddingRight: 20,
  	paddingTop: 5,
  	paddingBottom: 5
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});