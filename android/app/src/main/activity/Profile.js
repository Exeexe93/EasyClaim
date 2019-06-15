import React, { Component } from 'react';
import { TextInput, Text, View} from 'react-native';
import { Header, Image } from 'react-native-elements';
import MenuButton from '../component/MenuButton';
import EditIcon from '../component/EditIcon';
import Styles from '../style/ProfileStyle';

export default class Profile extends Component{

  render() {
        return (
                <View style = { Styles.container }>
                    <Header
                        containerStyle = {{ height: 50, paddingVertical: 20 }}
                        leftComponent = { <MenuButton/> }
                        rightComponent = { <EditIcon/> }
                    />
                    <Image
                      source = {{ uri: 'https://previews.123rf.com/images/vadymvdrobot/vadymvdrobot1509/vadymvdrobot150900446/45025475-closeup-portrait-of-a-handsome-man-at-gym.jpg' }}
                      style = { Styles.picture }
                    />
                    <Text style = { Styles.name }>
                        Name: Admin
                    </Text>
                    <Text style = { Styles.text }>
                        Company: EasyClaim Pte Ltd
                    </Text>
                    <Text style = { Styles.text }>
                        Position: Senior Technician
                    </Text>
                </View>
        );
  }
}

