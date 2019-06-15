import React, { Component } from 'react';
import { TextInput, Text, ScrollView} from 'react-native';
import { Avatar, Header, Image } from 'react-native-elements';
import MenuButton from '../component/MenuButton';
import BackIcon from '../component/BackIcon';
import SaveIcon from '../component/SaveIcon';
import Styles from '../style/ProfileStyle';

export default class EditProfile extends Component{

   state = {
        name: '',
        company: '',
        position: ''
   }

  render() {
        return (
                <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                    style = { Styles.container }>
                    <Header
                        containerStyle = {{ height: 50, paddingVertical: 20 }}
                        leftComponent = { <BackIcon/> }
                        rightComponent = { <SaveIcon/> }
                    />
                    <Avatar
                        rounded
                        source = {{
                        uri:
                          'https://previews.123rf.com/images/vadymvdrobot/vadymvdrobot1509/vadymvdrobot150900446/45025475-closeup-portrait-of-a-handsome-man-at-gym.jpg'
                        }}
                        size = { 180 }
                        containerStyle = {{ marginTop: 20, alignSelf: 'center' }}
                    />
                    <Text style = { Styles.name }>
                        Name:
                    </Text>
                    <TextInput style = {Styles.editText}>
                        Admin
                    </TextInput>
                    <Text style = {Styles.text}>
                        Company:
                    </Text>
                    <TextInput style = {Styles.editText}>
                        EasyClaim Pte Ltd
                    </TextInput>
                    <Text style = {Styles.text}>
                        Position:
                    </Text>
                    <TextInput style = {Styles.editText}>
                        Senior Technician
                    </TextInput>
                </ScrollView>
        );
  }
}

