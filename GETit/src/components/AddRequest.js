import React, {Component} from 'react';
import {Text, View} from 'react-native';
import paperTheme from './common/paperTheme'
import {Button, Provider as PaperProvider, Surface, TextInput} from 'react-native-paper';
import firebase from "firebase";

class AddRequest extends Component {

    state = {
        user: {},
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        addresses: {},
        photoURL: '',
        address: '',
        item: '',
        price: '',
        description: ''
    };

    componentWillMount(): void {

        const u = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + u + '/').once('value')
            .then(response => {
                this.setState({
                    user: response.val(),
                    email: response.val().email,
                    firstName: response.val().firstName,
                    lastName: response.val().lastName,
                    phoneNumber: response.val().phoneNumber,
                    photoURL: response.val().photoURL,
                    address: response.val().address,
                    addresses: response.val().addresses,

                });

        
            });

    }

    addRequest = () => {
        var userRef = firebase.database().ref("requests/" + this.state.item + "/");

        userRef.set({
            item: this.state.item,
            price: this.state.price,
            description: this.state.description,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
        }).then((data) => {
            console.log('Synchronization succeeded');
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {

        return (
            <PaperProvider theme={paperTheme}>
                <View style={{ flexDirection: 'row', margin: 10}}>
                    <TextInput
                        style={{flex: 3, margin:10}}
                        label='Item'
                        mode='outlined'
                        value={this.state.item}
                        onChangeText={textString => this.setState({item: textString})}
                    />
                    <TextInput
                        style={{flex: 1, margin:10}}
                        label='Price'
                        mode='outlined'
                        value={this.state.price}
                        onChangeText={textString => this.setState({price: textString})}
                    />
                </View>
                <TextInput
                    style={{margin:10}}
                    label='Description'
                    mode='outlined'
                    value={this.state.description}
                    onChangeText={textString => this.setState({description: textString})}
                />
                <Button onPress =  {this.addRequest}>
                    Add Request
                </Button>
            </PaperProvider>
        );
    }
}

export default AddRequest;