import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View, StyleSheet} from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';

export default class Notifications extends Component{

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
      <ListItem
        containerStyle = {{backgroundColor: '#F1F9FF'}}
        bottomDivider = {true}
        title = { item.date }
        subtitle = { item.price }
        rightIcon = {<Icon name = "arrow-right" size = {15}
            onPress = {() => this.props.navigation.navigate('ReviewClaim')}/>}
      />
    )

    render () {
        const list = [
            {
                date: '12/08/2016',
                price: '$5.24'
            },
            {
                  date: '15/04/2017',
                  price: '$3.68'
            },
            {
                date: '18/08/2018',
                price: '$15.24'
            },
        ]
      return (
            <ScrollView style = {{ flex:1, backgroundColor: '#F1F9FF'}}>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent={<MenuButton/>}
                />
                <FlatList
                      keyExtractor = { this.keyExtractor }
                      data = { list }
                      renderItem = { this.renderItem }
                />
            </ScrollView>
      )
    }
}

