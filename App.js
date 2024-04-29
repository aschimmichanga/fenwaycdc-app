import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, ScrollView, FlatList, Image, Text, View, TextInput, Pressable, SafeAreaView, Linking, Alert, Dimensions } from "react-native"
import Logo from './src/assets/logo.png';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { deals } from './src/data';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerBackVisible: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'Sign Up' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
            <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
              headerTitle: () => (
                <View>
                  <Image
                    source={{ uri: "https://res.cloudinary.com/dguy8o0uf/image/upload/v1714431263/FenwayCDC-VLockup-800x337-1-removebg-preview_1_uu0074.png" }}
                    style={{ marginTop: -2, width: 80, height: 50, zIndex: 100 }}
                    resizeMode="contain"
                  />
                </View>
              ),
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Ionicons
                    name="log-out-outline"
                    size={28}
                    color="black"
                  />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Settings')}>
                  <Ionicons
                    name="settings-outline"
                    size={24}
                    color="black"
                  />
                </Pressable>
              ),
            })} />
            <Stack.Screen name="Deals" component={DealsScreen}
              options={({ navigation }) => ({
                title: 'Featured Deals',
                headerLeft: () => (
                  <Pressable
                    onPress={() => navigation.navigate('Home')}
                  >
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen name="DealDetails" component={DealDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RedeemDeal" component={RedeemDealScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={({ navigation }) => ({
              title: 'Settings', headerLeft: () => (
                <Pressable
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
            })} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin Dashboard' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

const openLink = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Can't handle URL: " + url);
    }
  }).catch(err => console.error("An error occurred", err));
}

const Hyperlink = ({ url, className = "", children }) => {
  const handlePress = () => {
    openLink(url)
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text className={"text-blue-900 font-bold pl-4 pb-1 " + className}>{children}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width;

function HomeScreen({ navigation }) {
  const top_ad = "https://res.cloudinary.com/dguy8o0uf/image/upload/v1714426043/Taste_of_The_Fenway_logo_3_3_oop4zg.jpg"

  return (
    <ScrollView className="pt-10 pb-[100] bg-white h-full">
      <TouchableOpacity onPress={() => { openLink("https://www.fenwaycdc.org/events/tasteofthefenway/") }} className="flex flex-col">
        <Image
          className="rounded-md mx-5"
          source={{ uri: top_ad }}
          resizeMode="cover"
          style={{ height: 180 }}
        />
      </TouchableOpacity>
      <View className="pl-5 pt-4">
        <View className="flex flex-row pr-5 justify-between">
          <Text className="text-xl font-bold">Latest deals</Text>
          <Pressable className="flex flex-row pt-2" onPress={() => navigation.navigate('Deals')}>
            <Text className="text-blue-800 text-md">View all</Text>
          </Pressable>
        </View>
        <ScrollView horizontal className="flex gap-5 pt-2">
          {deals.slice(0, 5).map((deal, index) => (
            <Pressable
              key={index}
              onPress={() => { navigation.navigate('DealDetails', { deal }) }}
              style={{ backgroundColor: "black", width: width * 0.75, margin: 10, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
              className="bg-white w-3/4 h-auto rounded-lg shadow">
              <Image
                source={{ uri: deal.imageUrl }}
                style={{ height: 160, width: '100%', borderRadius: 8 }}
                resizeMode='cover'
              />
              <View className="absolute bottom-8 pt-10 left-0 right-0 rounded-b-lg">
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.7)']} // Correct format
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{ height: 30, width: '100%' }}>
                  <Text className="text-white text-lg font-bold px-3">
                    {deal.name}
                  </Text>
                </LinearGradient>
              </View>
              <View className="absolute bottom-0 left-0 right-0 px-3 pt-2 bg-white rounded-b-lg">
                <View className="flex flex-row justify-between items-start pb-2">
                  <View>
                    <Text className="text-md font-semibold">{deal.discount}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <View className="flex flex-col gap-4 pr-8 pt-2 justify-between">
          <Text className="text-xl font-bold pb-2">Get involved</Text>
          <Hyperlink url="https://www.fenwaycdc.org/volunteer">
            Volunteer with us
          </Hyperlink>
          <Hyperlink url="https://www.fenwaycdc.org/become-a-member/">
            Become a member
          </Hyperlink>
          <Hyperlink url="https://www.fenwaycdc.org/events/">
            Upcoming events
          </Hyperlink>
          <Hyperlink url="https://www.fenwaycdc.org/supportus/support-fenway-businesses/">
            Support Fenway businesses
          </Hyperlink>
          <Hyperlink url="https://www.paypal.com/donate/?hosted_button_id=ZT3P8XW968RYL">
            Donate to Fenway CDC
          </Hyperlink>
        </View>
      </View >
    </ScrollView >
  )
}

function AdminScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const correctPin = '1234';  // This should ideally be stored and managed more securely

  const handleUnlock = () => {
    if (pin === correctPin) {
      Alert.alert("Access Granted", "Welcome to the Admin Dashboard!");
      // Here you can navigate to actual admin features or unlock them
    } else {
      Alert.alert("Access Denied", "Incorrect PIN entered.");
      setPin('');  // Reset PIN on failure
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-100 justify-center items-center">
      <Text className="text-lg font-bold mb-4">Enter Admin PIN</Text>
      <TextInput
        style={{
          height: 40,
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 18,
        }}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}  // Assuming PIN is 4 digits
        onChangeText={setPin}
        value={pin}
        placeholder="Enter PIN"
      />
      <Pressable
        onPress={handleUnlock}
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Unlock</Text>
      </Pressable>
    </View>
  );
}


function SettingsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    // Here, you would normally update the user's settings via an API call
    Alert.alert('Success', 'Your settings have been updated.');

  };

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
      <Pressable onPress={handleSave} className="bg-blue-800 active:bg-blue-700 rounded-md">
        <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Save</Text>
      </Pressable>
    </View >
  );
}

function RedeemDealScreen({ route, navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timer); // Clear timer when it reaches 0
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format seconds into minutes and seconds for display
  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const redemptionCode = "ABC123XYZ";

  return (
    <View className="flex flex-col justify-between h-full p-4">
      <View className="flex flex-col justify-center items-center bg-gray-100 px-6 pt-16">
        <Text className="text-3xl font-bold text-green-800">Deal Redeemed!</Text>
        <Text className="text-lg text-gray-700 my-4">
          Show this code at the restaurant to get your discount:
        </Text>
        <View className="bg-white p-4 rounded-lg shadow-lg">
          <Text className="text-2xl font-bold text-center text-blue-800">{redemptionCode}</Text>
        </View>
        <Text className="text-md text-gray-500 italic my-2">
          You can use this code once to claim your deal.
        </Text>
        <Text className="text-xl font-bold">
          Time remaining: {formatTime()}
        </Text>
        {secondsLeft === 0 && (
          <Text className="text-lg text-red-600 py-6">
            Your session has expired. Please request a new code.
          </Text>
        )}
      </View>
      <Pressable
        className="mt-6 bg-blue-800 active:bg-blue-700 w-full rounded-md p-3"
        onPress={() => navigation.navigate('Deals')}
      >
        <Text className="text-white font-bold text-lg text-center">Back to Deals</Text>
      </Pressable>
    </View >
  );
}

function DealDetailsScreen({ route, navigation }) {
  const deal = route.params?.deal ?? {
    id: '1',
    name: 'Ichiban Yakitori House',
    discount: 'Buy 1 Get 1',
    expiry: 'Apr 3',
    imageUrl: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713049742/sushi_jvq1fd.jpg'
  };

  return (
    <View className="flex flex-col justify-between h-full bg-gray-100">
      <ScrollView className="flex-1">
        <View>
          <Image
            className="w-full h-[256]"
            source={{ uri: deal.imageUrl }}
          />
          <Pressable
            className="absolute top-4 left-4 p-2 rounded-full"
            onPress={() => navigation.goBack()}
            style={{ zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>

        <View className="p-4">
          <Text className="text-3xl font-bold">{deal.name}</Text>
          <Text className="text-lg text-green-600 pb-1">{deal.discount}</Text>
          {deal.expiry && <Text className="text-md text-gray-500 italic">Expires {deal.expiry}</Text>}
          <Text className="text-md text-gray-700 py-4">
            Enjoy delicious meals at {deal.name} with this exclusive deal! Redeem your offer and save on your next visit.
          </Text>
        </View>
      </ScrollView >
      <View className="p-4">
        <Pressable onPress={() => { navigation.navigate('RedeemDeal') }} className="bg-blue-800 active:bg-blue-700 rounded-md w-full">
          <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Redeem Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DealsScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(deals);

  const updateSearch = (search) => {
    setSearch(search?.toLowerCase());
    const filtered = deals.filter(item =>
      item.discount.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search)
    );
    setFilteredData(filtered);
  };

  return (
    <View className="flex-1 p-4 pt-2 bg-gray-100">
      <FlatList
        ListHeaderComponent={
          <View className="px-2 flex">
            <SearchBar
              lightTheme
              platform='default'
              placeholder="Search for Fenway deals..."
              onChangeText={updateSearch}
              value={search}
              placeholderTextColor="#888"
              searchIcon={{ size: 24 }}
              inputStyle={{
                backgroundColor: '#e1e1e1',  // Light grey for the input field, subtle
                color: '#333',               // Dark grey for text, for readability
                borderRadius: 10,            // Rounded corners
                paddingHorizontal: 10,       // Horizontal padding
              }}
              containerStyle={{
                backgroundColor: 'transparent', // Clear background to blend with any screen
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                padding: 0,
              }}
              inputContainerStyle={{ backgroundColor: '#e1e1e1', borderRadius: 10 }}
            />
          </View>
        }
        ListEmptyComponent={() =>
          <View className="pt-10 items-center px-4">
            <Image
              className="w-40 h-40 mb-2"
              source={{ uri: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713060539/Screenshot_2024-04-13_at_10.08.04_PM-removebg-preview_oucgr5.png' }}
            />
            <Text className="text-lg font-bold text-center pt-2">
              No matching deals found
            </Text>
            <Text className="text-gray-600 text-center pt-2">
              Try checking out other local businesses or come back at a later time.
            </Text>
          </View>
        }
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white m-2 rounded-lg shadow">
            <Image
              source={{ uri: item.imageUrl }}
              style={{ height: 200, width: '100%', borderRadius: 8 }}
              className="w-full"
            />
            <Pressable onPress={() => { navigation.navigate('DealDetails', { deal: item }) }} className="absolute bottom-0 left-0 right-0 px-3 pt-2 bg-white bg-opacity-50 rounded-b-lg">
              <View className="flex flex-row justify-between items-start pb-3">
                <View>
                  <Text className="text-black text-lg font-bold">{item.discount}</Text>
                  <Text className="text-black text-lg italic">{item.name}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        )
        } />
    </View >
  )
}

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState();
  const isSubmitDisabled = !email;
  const [isEmailSent, setIsEmailSent] = useState(false);
  return (
    isEmailSent ? (
      // View to show after email has been sent
      <View className="flex pt-[24] px-6 w-full">
        <Text className="text-md text-black pb-4 w-full">An email has been sent to <Text className="font-bold">{email}</Text> with instructions to reset your password.</Text>
        <Pressable onPress={() => { navigation.navigate('Login') }} className="bg-blue-800 active:bg-blue-700 rounded-md w-full">
          <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Back to Login</Text>
        </Pressable>
      </View>
    ) : (
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
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const isLoginDisabled = !email || !password;
  const [tapCount, setTapCount] = useState(0);

  const onLogin = () => {
    // TODO: Add firebase authentication here
    console.log(email, password);
    navigation.navigate('Home')
  }

  const handleLogoTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount === 15) {
      setTapCount(0);
      navigation.navigate('Admin');
    }
  };

  return (
    <View className="flex pt-[48] px-[48] justify-center items-center w-full">
      <Pressable onPress={handleLogoTap}>
        <Image source={Logo} className="h-24 w-56" />
      </Pressable>
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