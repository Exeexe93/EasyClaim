import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import { ConfirmDialog } from 'react-native-simple-dialogs';

class EditIcon extends Component {

    state = {
        noName: false,
        noCompany: false,
        noPosition: false,
        noGender: false,
        wrongGender: false,
    }

    checkInput = () => {
        if (this.props.name == '') {
            this.setState({ noName: true });
        } else if (this.props.company == '') {
            this.setState({ noCompany: true });
        } else if (this.props.position == '') {
            this.setState({ noPosition: true });
        } else if (this.props.gender == '') {
            this.setState({ noGender: true });
        } else if (this.props.gender != 'Male' && this.props.gender != 'Female') {
            this.setState({ wrongGender: true });
        } else {
            this.updateStatus();
        }
    }

    updateProfile(id, picUrl) {
       if (picUrl != this.props.picUrl) {
           firebase.database()
               .ref('Users/' + id)
               .set(
               {
                   name: this.props.name,
                   position: this.props.position,
                   company: this.props.company,
                   picture: picUrl,
                   gender: this.props.gender,
               }
           ).then(this.props.navigation.navigate('Profile'));
       } else {
            firebase.database()
               .ref('Users/' + id)
               .update(
               {
                   name: this.props.name,
                   position: this.props.position,
                   company: this.props.company,
                   gender: this.props.gender,
               }
           ).then(this.props.navigation.navigate('Profile'));
       }
    }

    updatePhoto(id, picUrl) {
        firebase.storage()
            .ref('Profile Picture/' + id + '/image.jpg')
            .putFile(picUrl).on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        this.getImageUrl(id, picUrl);
                    }
                },
            );
    }

    getImageUrl(id, picUrl) {
            firebase.storage()
                .ref('Profile Picture/' + id + '/image.jpg')
                .getDownloadURL().then((url) => this.updateProfile(id, url));
    }

    updateStatus() {
        const id = firebase.auth().currentUser.uid;
        const picUrl = this.props.selectedPic;
        if (picUrl != null) {
            this.updatePhoto(id, picUrl);
        } else {
            this.updateProfile(id, this.props.picUrl);
        }
    }

    render() {
        return (
                <>
                <Icon
                    name = 'done'
                    type = 'material'
                    size = { 25 }
                    onPress = { this.checkInput }/>
                <ConfirmDialog
                   messageStyle = {{ alignSelf: 'center', color: "black"}}
                   dialogStyle = {{ borderRadius: 20 }}
                   buttonsStyle = {{ alignItems: 'center' }}
                   message = 'Please input your name'
                   visible = { this.state.noName }
                   onTouchOutside = {() => this.setState({ noName: false }) }
                   positiveButton = {{
                       fontSize: 70,
                       title: "Confirm",
                       onPress: () => {
                           this.setState({ noName: false });
                       }
                   }}
               />
               <ConfirmDialog
                  messageStyle = {{ alignSelf: 'center', color: "black"}}
                  dialogStyle = {{ borderRadius: 20 }}
                  buttonsStyle = {{ alignItems: 'center' }}
                  message = 'Please input your position'
                  visible = { this.state.noPosition }
                  onTouchOutside = {() => this.setState({ noPosition: false }) }
                  positiveButton = {{
                      fontSize: 70,
                      title: "Confirm",
                      onPress: () => {
                          this.setState({ noPosition: false });
                      }
                  }}
              />
             <ConfirmDialog
                messageStyle = {{ alignSelf: 'center', color: "black"}}
                dialogStyle = {{ borderRadius: 20 }}
                buttonsStyle = {{ alignItems: 'center' }}
                message = 'Please input your company'
                visible = { this.state.noCompany }
                onTouchOutside = {() => this.setState({ noCompany: false }) }
                positiveButton = {{
                    fontSize: 70,
                    title: "Confirm",
                    onPress: () => {
                        this.setState({ noCompany: false });
                    }
                }}
             />
            <ConfirmDialog
              messageStyle = {{ alignSelf: 'center', color: "black"}}
              dialogStyle = {{ borderRadius: 20 }}
              buttonsStyle = {{ alignItems: 'center' }}
              message = 'Please input your gender'
              visible = { this.state.noGender }
              onTouchOutside = {() => this.setState({ noGender: false }) }
              positiveButton = {{
                  fontSize: 70,
                  title: "Confirm",
                  onPress: () => {
                      this.setState({ noGender: false });
                  }
              }}
            />
             <ConfirmDialog
                messageStyle = {{ alignSelf: 'center', color: "black"}}
                dialogStyle = {{ borderRadius: 20 }}
                buttonsStyle = {{ alignItems: 'center' }}
                message = 'Please input either Male or Female for gender'
                visible = { this.state.wrongGender }
                onTouchOutside = {() => this.setState({ wrongGender: false }) }
                positiveButton = {{
                    fontSize: 70,
                    title: "Confirm",
                    onPress: () => {
                        this.setState({ wrongGender: false });
                    }
                }}
            />
        </>
        );
    }
}

export default withNavigation(EditIcon);