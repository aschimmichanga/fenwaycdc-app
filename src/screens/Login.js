import React from 'react';
import { Image, Text, View, TextInput, Button, useColorScheme, Pressable } from "react-native"
import Logo from "../assets/logo.png"

export default function Login() {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? 'text-white' : 'text-black';
    const isLoginDisabled = !email || !password;

    const onLogin = () => {
        // TODO: Add firebase authentication here
        console.log(email, password);
    }

    return (
        <View className="flex pt-[100] px-[48] justify-center items-center w-full">
            <Image source={Logo} className="h-24 w-56" />
            <Text className="text-3xl text-blue-400 font-bold pt-4 pb-2">Fenway CDC</Text>
            <Text className={`text-md text-center ${textColor} font-bold pb-4`}>Improving Lives and Building Community</Text>
            <View className="flex gap-2 justify-start w-full">
                <Text className={`${textColor}`}>Email</Text>
                <TextInput
                    className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md mb-2"
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Enter your email here."
                    keyboardType="email-address"
                    autoComplete="email"
                />
                <Text className={`${textColor} text-left justify-start`}>Password</Text>
                <TextInput
                    className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md"
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter your password here."
                    autoComplete="current-password"
                    secureTextEntry={true}
                />
                <Pressable>
                    <Text className="font-bold text-blue-800 active:text-blue-700 mb-3">Forgot password</Text>
                </Pressable>
                <Pressable disabled={isLoginDisabled} onPress={onLogin} className={`${isLoginDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md`}>
                    <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Login</Text>
                </Pressable>
            </View>
        </View>
    );
}