import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

export default class ShowImage extends Component{
  render() {
        return (
                <View style = {{ flex: 1 }}>
                    <Image
                        source = {{ uri:
                             this.props.navigation.getParam('fileUri')
                        }}
                        style = {{ width: '100%', height: '100%' }}/>
                </View>
        );
  }
}

