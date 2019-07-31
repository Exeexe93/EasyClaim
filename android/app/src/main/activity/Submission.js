import React, { Component } from 'react';
import { SectionList, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Header, Divider, CheckBox } from 'react-native-elements'
import MenuButton from '../component/MenuButton';
import Icon from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';
import Excel from '../component/Excel';

export default class Submission extends Component{

    state = {
        result: [],
        done: false,
        loading: false,
        checked: false,
        sendDetails: [],
        month: [],
        totalAmt: [],
        profile: null,
    };

    componentDidMount() {
        this.refresh = this.props.navigation.addListener("didFocus", this.getJsonFile);
    }

    componentWillUnmount() {
        this.refresh.remove();
    }

    updateScreen = () => {
        this.getJsonFile();
    }

    getJsonFile = () => {
        if (this.props.navigation.getParam('refresh')) {
            this.setState({result: [], done: false});
            firebase.database().ref("Transport Claim/" + global.currentId)
            .orderByChild('Submitted').equalTo(false)
            .once('value').then((data) => {
                    this.getInfo(data.toJSON());
                }
            );

            firebase.database().ref('Users/' + global.currentId )
                .once('value').then((data) => this.getProfile(data.val()));
        }
    };

    getProfile(value) {
         this.setState({ profile: value });
    }

    getInfo = (info) => {
        const months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        // Structure for the section
        for (date in info) {
            // Finding the month for the date
            const current = new Date(date.split(" ")[0]);
            const month = months[current.getMonth()];
            const year = current.getFullYear();
            var item = {"data": [], "title": {date: "", amount: "", checked: false, month: ""}};
            let result = this.state.result;
            var containTitle = false;
            for (each in result) {
                if (result[each].title.month == month + " " + year) {
                   result[each].data.push(this.processData(info[date]));
                   result[each].title.amount =
                        this.sumPrice(result[each].title.amount, info[date].Amount);
                   containTitle = true;
                }
            }
            // Create new array for the month
            if (containTitle == false) {
                item.title.month = month + " " + year;
                item.title.date = year + "/" + this.convertString(current.getMonth() + 1) + "/01";
                item.title.amount = info[date].Amount;
                item.data.push(this.processData(info[date]));
                result.push(item);
            }
            this.setState({ result:  result });
        }
        this.setState({ done: true });
    }

    processData(data) {
        let output = data;
        delete output["Submitted"];
        output = this.convertDate(output);
        return output;
    }

    convertString(month) {
        let output = month
        if ((output + "").length == 1) {
            output = "0" + output;
        }
        return output;
    }

    convertDate(data) {
        let value = data;
        value.Date = value.Date.split('-').reverse().join('/');
        return value;
    }

    sumPrice = (first, second) => {
        var result = parseFloat(first.substr(1, 4));
        const addValue = parseFloat(second.substr(1, 4));
        result += addValue;
        result = result.toFixed(2);
        return "$" + result ;
    }

    addOrRemoveInfo = (Info) => {
        Info.title.checked = !Info.title.checked
        this.setState({checked: !this.state.checked});
        let result = this.state.sendDetails;
        let month = this.state.month;
        let totalAmt = this.state.totalAmt;
        if (Info.title.checked == true) {
            // This is for two months submissions as they should be no submissions for later than 15 days
            if (result.length > 0) {
                let checkDate = result[0][0].Date.split('/').reverse().join('/');
                if (Info.title.date < checkDate) {
                    result.unshift(Info.data);
                    month.unshift(Info.title.month);
                    totalAmt.unshift(Info.title.amount);
                } else {
                    result.push(Info.data);
                    month.push(Info.title.month);
                    totalAmt.push(Info.title.amount);
                }
            } else {
                result.push(Info.data);
                month.push(Info.title.month);
                totalAmt.push(Info.title.amount);
            }
            this.setState({sendDetails: result});
            this.setState({month: month});
            this.setState({totalAmt: totalAmt});
        } else {
            for (data in result) {
                if (result[data] == Info.data) {
                    result.splice(data, 1);
                    month.splice(data, 1);
                }
            }
            this.setState({sendDetails: result});
        }
    }

    keyExtractor = (item, index) => item + index;

    renderHeader = ({ section }) => (
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style = {{ flexDirection: 'column' }}>
                <Text style = {{ fontSize: 20, marginLeft: 10 }}>
                    { section.title.month }
                </Text>
                <Text style = {{ marginLeft: 10, fontSize: 15 }}>
                    Total claim: { section.title.amount }
                </Text>
            </View>
            <CheckBox
                right
                checkedIcon = 'check-circle-o'
                uncheckedIcon = 'circle-o'
                checked = { section.title.checked }
                onPress = { () => this.addOrRemoveInfo(section) }/>
        </View>
    )

    renderItem = ({ item }) => (
       <>
      <View style = {{ backgroundColor: '#F1F9FF', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style = {{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style = {{ fontSize: 18 }}>
                { item.Date }
            </Text>
            <Text style = {{ fontSize: 15 }}>
                { item.Amount }
            </Text>
        </View>
        <View style = {{ alignSelf: 'center', marginRight: 10 }}>
                                         <Icon
                                             name = "arrow-right" size = { 15 }
                                             onPress = {() => this.props.navigation.navigate('ReviewClaim', {
                                                             item: item,
                                                             editing: true,
                                                       })}
            />
        </View>
      </View>
      <Divider/>
      </>
    )

    render () {
        return (
            <>
                <Header
                    containerStyle = {{ height: 50, paddingVertical: 20}}
                    leftComponent = {<MenuButton/>}
                    rightComponent = {<Excel
                                        data = {this.state.sendDetails}
                                        month = {this.state.month}
                                        totalAmt = {this.state.totalAmt}
                                        profile = {this.state.profile}
                                        refresh = {this.updateScreen}/>}
                />
                { this.state.done == false &&
                    <View style = {{ height: 600, justifyContent: 'center', flexDirection: 'column' }}>
                        <ActivityIndicator size = { 100 }/>
                        <Text style = {{ fontSize: 15, textAlign: 'center' }}> Getting information </Text>
                    </View>
                }
                { (this.state.done && this.state.result.length < 1) &&
                        <View style = {{ height: 600, justifyContent: 'center' }}>
                            <Text style = {{ textAlign: 'center', fontSize: 20 }}>
                                No claims required to submit !
                            </Text>
                        </View>
                }
                { this.state.done && this.state.checked &&
                    <SectionList
                        renderItem = { this.renderItem }
                        renderSectionHeader = { this.renderHeader }
                        sections = { this.state.result }
                        keyExtractor = { this.keyExtractor }
                    />
                }
                { this.state.done && !this.state.checked &&
                  <SectionList
                      renderItem = { this.renderItem }
                      renderSectionHeader = { this.renderHeader }
                      sections = { this.state.result }
                      keyExtractor = { this.keyExtractor }
                  />
                }

            </>
        );
    }
}