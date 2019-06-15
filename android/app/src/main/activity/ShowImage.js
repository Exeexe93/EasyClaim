import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

export default class ShowImage extends Component{
  render() {
        return (
                <View style = {{ flex: 1 }}>
                    <Image
                        source = {{ uri:
                             'https://mothership.sg/wp-content/uploads/2015/02/10169165_10203599641304216_69228669637295842_n.jpg'
                        }}
                        style = {{ width: '100%', height: '100%' }}/>
                </View>
        );
  }
}

