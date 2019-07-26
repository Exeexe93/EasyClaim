import React, { Component } from 'react';
import { View, TextInput, Text, ScrollView} from 'react-native';
import { Avatar, Header, Image } from 'react-native-elements';
import MenuButton from '../component/MenuButton';
import BackIcon from '../component/BackIcon';
import SaveIcon from '../component/SaveIcon';
import Styles from '../style/ProfileStyle';
import ImagePicker from 'react-native-image-picker';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class EditProfile extends Component{

   constructor() {
        super();

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
   }

   state = {
        name: ' ',
        company: ' ',
        position: ' ',
        gender: ' ',
        picUrl: ' ',
        selectedPic: null,
        alert: false,
        errorMessage: '',
   }

   componentDidMount() {
        this.updateStatus();
   }

   updateStatus() {
        const { navigation } = this.props;
        const profile = navigation.getParam('profile');
        this.setState({
            name: profile.name,
            picUrl: profile.picture,
            company: profile.company,
            position: profile.position,
            gender: profile.gender,
        })
   }

   selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

   ImagePicker.showImagePicker(options, (response) => {

     if (response.didCancel) {
     } else if (response.error) {
        this.setState({ errorMessage: response.error });
        this.setState({ alert: true });
     } else if (response.customButton) {
     } else {
        this.setState({
            selectedPic: response.uri,
        });
     }
   });
 }

  render() {
        return (
                <ScrollView keyboardDismissMode = "on-drag" overScrollMode = "always"
                    style = { Styles.container }>
                    <Header
                        containerStyle = {{ height: 50, paddingVertical: 20 }}
                        leftComponent = { <BackIcon/> }
                        rightComponent = { <SaveIcon
                                                name = { this.state.name }
                                                company = { this.state.company }
                                                position = { this.state.position }
                                                gender = { this.state.gender }
                                                picUrl = { this.state.picUrl }
                                                selectedPic = { this.state.selectedPic }
                                         /> }
                    />
                    <Avatar
                        rounded
                        source = {{ uri: this.state.selectedPic == null?
                                            this.state.picUrl: this.state.selectedPic }}
                        size = { 180 }
                        containerStyle = {{ marginTop: 50, alignSelf: 'center' }}
                        editButton = {{ size: 40 }}
                        onEditPress = { this.selectPhotoTapped.bind(this) }
                        showEditButton = { true }
                    />
                    <View style = {{marginTop: 50}}>
                        <Text style = { Styles.text }>
                            Name:
                        </Text>
                        <TextInput
                            underlineColorAndroid = 'blue'
                            style = {Styles.editText}
                            onChangeText={ (name) => this.setState({name}) }
                            value = { this.state.name }/>
                        <Text style = {Styles.text}>
                            Company:
                        </Text>
                        <TextInput
                            underlineColorAndroid = 'blue'
                            style = {Styles.editText}
                            onChangeText={ (company) => this.setState({company}) }
                            value = { this.state.company }/>
                        <Text style = {Styles.text}>
                            Position:
                        </Text>
                        <TextInput
                            underlineColorAndroid = 'blue'
                            style = {Styles.editText}
                            onChangeText={ (position) => this.setState({position}) }
                            value = { this.state.position }/>
                        <Text style = {Styles.text}>
                            Gender:
                        </Text>
                        <TextInput
                            underlineColorAndroid = 'blue'
                            style = {Styles.editText}
                            onChangeText={ (gender) => this.setState({gender}) }
                            value = { this.state.gender }/>
                    </View>
                    <ConfirmDialog
                        messageStyle = {{ alignSelf: 'center', color: "black" }}
                        dialogStyle = {{ borderRadius: 20 }}
                        message = { this.state.errorMessage }
                        visible = { this.state.alert }
                        onTouchOutside = {() => this.setState({alert: false}) }
                        positiveButton = {{
                            fontSize: 70,
                            title: "Confirm",
                            onPress: () => {
                                this.setState({ alert: false });
                            }
                        }}
                    />
                </ScrollView>
        );
  }
}

