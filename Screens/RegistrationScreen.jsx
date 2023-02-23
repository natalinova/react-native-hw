import React, {useState, useCallback} from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image } from "react-native";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const initialState = {
    login: "",
    email: "",
    password: ""
};

export default function RegistrationScreen() {
    const [fontsLoaded] = useFonts({'Roboto-Regular':require('../fonts/Roboto-Regular.ttf')})
    const [user, setUser] = useState(initialState);
    const [showPassword, setShowOPassword] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const [showInFocus, setShowInFocus] = useState(false);

   
    const onSubmit = () => {
        Keyboard.dismiss();
        console.log(user.login);
        console.log(user.email);
        console.log(user.password);
        setUser(initialState),
        setShowButton(false),
        setShowInFocus(false)
    }
    const hideKeyboard = () => {
        Keyboard.dismiss();
        setShowInFocus(false)
    };

    const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
    return <View
        style={styles.container}
        onLayout={onLayoutRootView}
    >
        <TouchableWithoutFeedback onPress={hideKeyboard}>
        <ImageBackground source={require("../images/background.jpg")} resizeMode="cover" style={styles.image}>
            {/* <View> */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
                    <View style={styles.form}>
                        <View style={styles.photoBlock}>
                            <View style={styles.photo}></View>
                            <TouchableOpacity
                            style={styles.buttonAdd}>
                                <Image
                                source={require('../images/add.png')}/>
                            </TouchableOpacity>
                        </View>
                    <Text style={styles.title }>Реєстрація</Text>
                <TextInput style={styles.input}
                            placeholder="Логін"
                            value={user.login}
                            onFocus={() => setShowInFocus(true)}
                            onChangeText={(value) => setUser((prevState) => ({ ...prevState, login: value }))}
                    />
                <TextInput style={styles.input}
                            placeholder="Адреса електронної пошти"
                            value={user.email}
                            onFocus={() => { setShowInFocus(true) }}
                        onChangeText={(value) => setUser((prevState) => ({...prevState, email:value}))}/>
                        <TextInput style={{ ...styles.input, position:'relative' }}
                    placeholder="Пароль"
                            secureTextEntry={showPassword}
                            value={user.password}
                            onFocus={() => {
                                setShowButton(true);
                                setShowInFocus(true);
                                console.log(showInFocus)
                        
                            }}
                            onChangeText={(value) => setUser((prevState) => ({ ...prevState, password: value }))} />
                        <TouchableOpacity
                            style={styles.showPassword}
                            onPress={() => {
                                setShowOPassword((prevState) => (!prevState));
                            }}>
                            <Text>{showButton ? (showPassword? "Показати": "Сховати" ) : ""}</Text>
                            </TouchableOpacity>
                <TouchableOpacity
                            style={{ ...styles.button,  display: showInFocus ? "none" : "block" }}
                        activeOpacity={0.6}
                        onPress={onSubmit}
                >
                            <Text style={styles.buttonText}> Зареєструватися</Text>
                        </TouchableOpacity>
                        <Text style={{ ...styles.haveAccount, display: showInFocus ? "none" : "block" }}>
                            <Text>Вже є акаунт? Зайти</Text>
                        </Text>
            </View>
                </KeyboardAvoidingView>
         
        </ImageBackground>
        </TouchableWithoutFeedback>
       
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
  image: {
    flex: 1,
      justifyContent: 'flex-end'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 33,
        fontFamily:'Roboto-Regular'
  },
    block: {
        backgroundColor: '#ffffff',
        borderRadius:25,
    },
    form: {
        backgroundColor: '#ffffff',
        borderRadius:25,
    },
    photoBlock: {
        height: 120,
        borderRadius: 16,
        backgroundColor: "transparent",
        top: -60,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonAdd: {
        width: 25,
        height:25,
        top: -30,
      left:55  
    },
    photo: {
        width: 120,
        height:120,
        borderRadius: 16,
        backgroundColor: "#f6f6f6",
    },
    
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor:'#F6F6F6',
        height: 50,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 16,
        paddingLeft: 16
    },
    showPassword: {
        width:70,
        position: 'relative',
        bottom: 35,
        right:-330,
        alignItems: 'flex-end',
        marginRight: 25,
        backgroundColor:'transparent'
    },
    button: {
        marginHorizontal: 16,
        marginTop: 43,
        height: 51,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText: {
        color:'#ffff'
    },
    haveAccount: {
        marginTop: 16,
        marginBottom: 78,
        textAlign:'center'

    }
})