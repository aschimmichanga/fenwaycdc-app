import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View, TextInput, Pressable, SafeAreaView, Linking, Alert } from "react-native"
import Logo from "./src/assets/logo.png"

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

function BuyTicketsScreen({ hasTicket, buyTicket }) {
  const openURL = () => {
    const url = 'https://www.fenwaycdc.org/events/fenway-ball/';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open this URL: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <View className="flex-1 px-10 justify-center items-center bg-gray-100">
      <View className="bg-white rounded-lg shadow-md w-full max-w-sm p-5">
        <Text className="text-xl font-semibold mb-2">Fenway Ball Tickets</Text>
        <Text className="text-gray-700 mb-4">Experience the magic of the Fenway Ball! Your generous participation will enable Fenway CDC to improve the economic and social well-being of over 2,500 residents.</Text>
        <Text className="text-gray-700 mb-4 font-bold">You must buy a ticket to access the rest of the app.</Text>
        <Text className="font-bold text-gray-900 mb-5">Date: April 30th, 2024</Text>
        <Pressable onPress={buyTicket} className={`bg-blue-800 active:bg-blue-700 rounded-md py-2 ${!hasTicket ? "" : "bg-gray-400"}`} disabled={hasTicket}>
          <Text className="text-white text-center font-bold">{hasTicket ? "Ticket Purchased" : "Buy Ticket"}</Text>
        </Pressable>
        <Pressable onPress={openURL}>
          <Text className="text-blue-500 mt-4">Learn more about the Fenway Ball →</Text>
        </Pressable>
      </View>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [hasTicket, setHasTicket] = React.useState(false);

  const buyTicket = () => {
    // Simulate ticket purchase process
    console.log("Buying ticket...");
    // For demonstration, we'll assume the ticket is bought successfully.
    setHasTicket(true);
    Alert.alert("Ticket Purchased", "You have successfully bought a ticket! You can now access the rest of the app.", [{ text: "OK" }]);
  };

  return (
    hasTicket ?
      <Text>Rest of App</Text>
      : <BuyTicketsScreen hasTicket={hasTicket} buyTicket={buyTicket} />
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
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const isSignUpDisabled = false

  return (
    <View className="flex-1 py-[24] px-[36] ">
      <View className="flex flex-col gap-2 pb-6 w-full">
        <Text>Name</Text>
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md mb-2"
          onChangeText={setName}
          value={name}
          placeholder="Enter your name here."
          autoComplete="name"
        />
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
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md mb-"
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password here."
          autoComplete="current-password"
          secureTextEntry={true}
        />
      </View>
      <Pressable disabled={isSignUpDisabled} onPress={() => { navigation.navigate('Home') }} className={`${isSignUpDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md`}>
        <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Continue</Text>
      </Pressable>
    </View >
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const isLoginDisabled = !email || !password;

  const onLogin = () => {
    // TODO: Add firebase authentication here
    console.log(email, password);
    navigation.navigate('Home')
  }

  return (
    <View className="flex pt-[48] px-[48] justify-center items-center w-full">
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
        <Pressable onPress={() => { navigation.navigate('ForgotPassword') }}>
          <Text className="font-bold text-blue-800 active:text-blue-200 mb-3">Forgot password</Text>
        </Pressable>
        <Pressable disabled={isLoginDisabled} onPress={onLogin} className={`${isLoginDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md`}>
          <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Login</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.navigate('Signup') }}>
          <Text className="font-bold  active:text-gray-200 mb-3 mt-2">New to Fenway CDC? <Text className="text-blue-800 active:text-blue-200">Sign up here →</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}