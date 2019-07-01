import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class EditIcon extends Component {

   updateProfile(name, position, company, picture, gender) {
       const id = firebase.auth().currentUser.uid;
       firebase.database()
           .ref('Users/' + id)
           .update(
           {
               name: name,
               position: position,
               company: company,
               picture: picture,
               gender: gender,
           }
       );
   }

    render() {
        return (
                <Icon
                    name = 'done'
                    type = 'material'
                    size = { 25 }
                    onPress = { () => {
                        this.updateProfile(this.props.name, this.props.position,
                            this.props.company, this.props.picUrl, this.props.gender);
                        this.props.navigation.navigate('Profile');
                }}/>
        );
    }
}

export default withNavigation(EditIcon);