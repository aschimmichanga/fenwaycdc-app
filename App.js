import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View, TextInput, useColorScheme, Pressable } from "react-native"
import Logo from "./src/assets/logo.png"

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = React.useState();
  const isSubmitDisabled = !email;
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  return (
    isEmailSent ? (
      // View to show after email has been sent
      <View className="flex pt-[56] px-10 justify-center items-center w-full">
        <Text className="text-md text-center text-black font-bold pb-4">An email has been sent to {email} with instructions to reset your password.</Text>
        <Pressable onPress={() => { navigation.navigate('Login') }} className="bg-blue-800 active:bg-blue-700 rounded-md">
          <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Back to Login</Text>
        </Pressable>
      </View>
    ) : (
      // View to show initially to input email
      <View className="flex pt-[24] justify-center items-center w-full">
        <Text className="text-md text-gray-500 w-full pb-4 px-6">Enter the email address you used to register with Fenway CDC. You will receive an email to create a new password.</Text>
        <View className="w-full pb-4 pl-3 pr-10 flex flex-col gap-6">
          <TextInput
            className="border-2 border-gray-300 focus:border-blue-700 p-2 pb-4 text-lg rounded-md w-full"
            placeholder="Enter your email here."
            keyboardType="email-address"
            autoComplete="email"
            onChangeText={setEmail}
            value={email}
          />
          <Pressable disabled={isSubmitDisabled} onPress={() => setIsEmailSent(true)} className={`${isSubmitDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md w-full px-4`}>
            <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Create new password</Text>
          </Pressable>
        </View>
      </View>
    )
  )
}

function SignUpScreen({ navigation }) {
  return (
    <View>
      <Text>Sign Up</Text>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const isLoginDisabled = !email || !password;

  const onLogin = () => {
    // TODO: Add firebase authentication here
    console.log(email, password);
    navigation.navigate('SignUp')
  }

  return (
    <View className="flex pt-[56] px-[48] justify-center items-center w-full">
      <Image source={Logo} className="h-24 w-56" />
      <Text className="text-3xl text-blue-400 font-bold pt-4 pb-2">Fenway CDC</Text>
      <Text className={`text-md text-center font-bold pb-4`}>Improving Lives and Building Community</Text>
      <View className="flex gap-2 justify-start w-full">
        <Text>Email</Text>
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md mb-2"
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email here."
          keyboardType="email-address"
          autoComplete="email"
        />
        <Text className={`text-left justify-start`}>Password</Text>
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md"
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password here."
          autoComplete="current-password"
          secureTextEntry={true}
        />
        <Pressable className="p-2" onPress={() => { navigation.navigate('ForgotPassword') }}>
          <Text className="font-bold text-underline text-blue-800 active:text-blue-200 mb-3">Forgot password</Text>
        </Pressable>
        <Pressable disabled={isLoginDisabled} onPress={onLogin} className={`${isLoginDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md`}>
          <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Login</Text>
        </Pressable>
      </View>
    </View>
  );
}