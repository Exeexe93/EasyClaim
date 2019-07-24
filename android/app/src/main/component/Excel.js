/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
import XLSX from 'xlsx';

import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { AppRegistry, StyleSheet, Text, View, Button, Alert, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import Mailer from 'react-native-mail';
import {PermissionsAndroid} from 'react-native';

// react-native-fs
import { writeFile, readFile, ExternalDirectoryPath } from 'react-native-fs';
const EDP = ExternalDirectoryPath + "/"

/*const make_cols = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1},
                                            (x,i) => XLSX.utils.encode_col(i));
const make_width = refstr => Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1},
                                            () => 60);*/

export default class Excel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
            header: {header:["Date","Time","Amount","Link"], cellDates: true},
            month: this.props.month,
            totalAmt: this.props.totalAmt,
		};
		this.exportFile = this.exportFile.bind(this);
	};

    checkPermission = async(path) => {
        let hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (!hasPermission) {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'write_storage_permission',
                message: 'write_storage_permission_message',
                buttonNegative: 'cancel',
                buttonPositive: 'ok',
            },);
            hasPermission = granted !== PermissionsAndroid.RESULTS.GRANTED;
        }

        if (!hasPermission) {
            Alert.alert('Access denied', 'Pleases allows the application to read and write file !');
        }

        this.handleEmail(path);
    }

    handleEmail = (path) => {
        Mailer.mail({
          subject: 'Claim Summary',
          recipients: ['engxuanen@gmail.com'],
          ccRecipients: [''],
          bccRecipients: [''],
          body: '<b> Hi\n this is the claim summary</b>',
          isHTML: true,
          attachment: {
            path: path,  // The absolute path of the file from which to read data.
            type: 'xlsx',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            //name: 'Claims',   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
            if (error) {
                if (error == 'not_available') {
                    Alert.alert('No mail detected', 'Please install a email application');
                }
            }
        });
      }

	exportFile() {
	    /* build new workbook */
        var wb = XLSX.utils.book_new();

        // Creating worksheet
        for (month in this.state.data) {
            var ws = XLSX.utils.json_to_sheet(this.state.data[month], this.state.header);
            XLSX.utils.sheet_add_json(ws, [
              { Date: "Total Amount: ", Amount: this.state.totalAmt[month] }
            ], {header: this.state.header.header, skipHeader: true, origin: -1});
            XLSX.utils.book_append_sheet(wb, ws, this.props.month[month]);
        }

		/* write file */
		const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
		const file = EDP + "Claims Summary - " + this.props.name + ".xlsx";

		writeFile(file, wbout, 'ascii').then((res) =>{
                this.checkPermission(file);
		}).catch((err) => { Alert.alert("exportFile Error", "Error " + err.message);});
	};
	render() {
	    return (
	        <View style = {{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Icon
                  name = 'send'
                  type = 'font-awesome'
                  color = 'black'
                  onPress = { this.exportFile } />
            </View>
	); };
};