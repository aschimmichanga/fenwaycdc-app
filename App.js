import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, ScrollView, FlatList, Image, Text, View, TextInput, Pressable, SafeAreaView, Linking, Alert, Dimensions } from "react-native";
import Logo from './src/assets/logo.png';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { login, signup } from './src/AuthenticationService';
import { getDeals, createDeal, updateDeal, createDiscount } from './src/DealService';
import axios from 'axios';
import { updateDiscount } from './src/DiscountService';
import { v4 as uuidv4 } from 'uuid';

const width = Dimensions.get('window').width;

const userId = 'USER_ID';
const userToken = 'USER_JWT_TOKEN';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="AdminDashboard">
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
                  <Pressable onPress={() => navigation.navigate('Home')}>
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
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} options={{ title: 'Admin Login' }} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={({ navigation }) => ({
              title: 'Admin Dashboard', headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Ionicons
                    name="log-out-outline"
                    size={28}
                    color="black"
                  />
                </Pressable>
              )
            })} />
            <Stack.Screen name="AddOrganization" component={AddOrganizationScreen} options={({ navigation }) => ({
              title: 'Add Organization',
              headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('AdminDashboard')}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
            })} />
            <Stack.Screen name="EditOrganization" component={EditOrganizationScreen} options={({ navigation }) => ({
              title: 'Edit Organization',
              headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('AdminDashboard')}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
            })} />
            <Stack.Screen name="CreateDiscount" component={CreateDiscountScreen} options={({ navigation }) => ({
              title: 'Create Discount',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
            })} />
            <Stack.Screen name="EditDiscount" component={EditDiscountScreen} options={({ navigation }) => ({
              title: 'Edit Discount',
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
            })} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider >
  );
}

function EditDiscountScreen({ route, navigation }) {
  const id = route.params?.id;
  const discount = route.params?.discount ?? "";
  const expiry = route.params?.expiry ? new Date(route.params.expiry) : new Date();

  const [deal, setDeal] = useState(discount);
  const [date, setDate] = useState(expiry);
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    try {
      updateDiscount(id, { discount: deal, expiry: date });
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      deleteDiscount(id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="px-8 bg-white h-full flex justify-between">
      <View className="flex flex-col pt-4">
        <View className="flex flex-col pb-2">
          <Text className="text-left justify-start pb-2">Discount Description</Text>
          <View className="flex flex-row justify-between w-full pr-6">
            <TextInput
              className={`flex-1 ${!editMode && "bg-gray-100"} border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md`}
              onChangeText={setDeal}
              value={deal}
              placeholder="Enter a sentence describing the discount here."
              editable={editMode}
            />
            {editMode ? (
              <TouchableOpacity className="pt-2 pl-2" onPress={() => setEditMode(false)}>
                <Ionicons name="checkmark-outline" size={25} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="pt-2 pl-2" onPress={() => setEditMode(true)}>
                <Ionicons name="create-outline" size={25} color="blue" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="flex flex-row pt-4 ">
          <Text className="text-lg">Set Expiry Date:</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={false}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setDate(currentDate);
            }}
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <Pressable onPress={handleSave} className="bg-blue-800 rounded-lg shadow-sm">
          <Text className="text-white p-3 text-lg rounded-md text-center w-full">Save</Text>
        </Pressable>
        <Pressable onPress={handleDelete} className="border-2 border-red-200 bg-white rounded-lg shadow-sm">
          <Text className="text-red-500 p-3 text-lg rounded-md text-center w-full">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CreateDiscountScreen({ navigation }) {
  const [deal, setDeal] = useState('')
  const [date, setDate] = useState(new Date());

  const handleSave = async () => {
    await createDiscount({ discount: deal, expiry: date });
    navigation.goBack();
  };

  return (
    <View className="pt-4 px-8 bg-white h-full flex justify-between">
      <View className="flex flex-col gap-2 pb-6">
        <Text className="text-left justify-start">Discount Description</Text>
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md"
          onChangeText={setDeal}
          value={deal}
          placeholder="Enter a sentence describing the discount here."
        />
        <View className="flex flex-row pt-4 ">
          <Text className="text-lg">Set Expiry Date:</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={false}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;  // Fallback to current date if no date is selected
              setDate(currentDate);
            }}
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <Pressable onPress={handleSave} className="bg-blue-800 rounded-lg shadow-sm">
          <Text className="text-white p-3 text-lg rounded-md text-center w-full">Save</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.goBack() }} className="border-2 border-red-200 bg-white rounded-lg shadow-sm">
          <Text className="text-red-500 p-3 text-lg rounded-md text-center w-full">Delete</Text>
        </Pressable>
      </View>
    </View>
  )
}

function EditOrganizationScreen({ navigation, route }) {
  const organizationId = route.params?.id;
  const deal = route.params?.deal;

  const [organization, setOrganization] = useState(deal);

  const [editMode, setEditMode] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setOrganization({ ...organization, imageUrl: result.assets[0].uri });
    }
  };

  const saveOrganization = async () => {
    try {
      if (organizationId) {
        await updateDeal(organizationId, organization)
      } else {
        await createDeal(organization)
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="pt-4 px-8 pb-[20] bg-white h-full flex-1 justify-between">
      <ScrollView>
        <Text className="text-lg font-bold pb-2">Organization Banner</Text>
        <TouchableOpacity onPress={pickImage} className="flex flex-col">
          <Image
            className="rounded-md mx-5"
            source={{ uri: organization.imageUrl }}
            resizeMode="cover"
            style={{ height: 180 }}
          />
        </TouchableOpacity>
        <View className="flex flex-col gap-2 py-6">
          <Text className="text-left justify-start">Organization Name</Text>
          <View className="flex flex-row justify-between w-full pr-6">
            <TextInput
              className={`flex-1 ${!editMode && "bg-gray-100"} border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md`}
              onChangeText={name => setOrganization({ ...organization, name })}
              value={organization.name}
              placeholder="Enter your organization name here."
              editable={editMode}
            />
            {editMode ? (
              <TouchableOpacity className="pt-2 pl-2" onPress={() => setEditMode(false)}>
                <Ionicons name="checkmark-outline" size={25} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="pt-2 pl-2" onPress={() => setEditMode(true)}>
                <Ionicons name="create-outline" size={25} color="blue" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {organization.deals.length > 0 && (
          <View>
            <Text className="text-lg font-bold pb-2">Current Deals</Text>
            <View className="rounded-t-lg max-h-[270]" style={{ borderWidth: 2, borderColor: '#EDEDED' }}>
              <ScrollView className="flex pt-2">
                {organization.deals.map((deal, dealId) => (
                  <Pressable
                    key={dealId}
                    onPress={() => navigation.navigate('EditDiscount', { id: deal._id, deal })}
                    style={{ backgroundColor: "white", width: '75%' }}
                    className="bg-white w-3/4 h-auto p-2 pt-0">
                    <View className="flex flex-row">
                      <Image
                        className="mt-1 rounded-lg"
                        source={{ uri: deal.imageUrl }}
                        style={{ height: 40, width: 40 }}
                        resizeMode='cover'
                      />
                      <View className="flex flex-col pl-4">
                        <Text className="font-bold text-lg">{deal.name}</Text>
                        <Text className="text-blue-800 font-bold">{deal.details}</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
        <Pressable onPress={() => navigation.navigate("CreateDiscount")} className={`bg-white ${organization.deals.length > 0 ? "rounded-b-lg" : "rounded-lg"} shadow-sm`} style={{ borderWidth: 1, borderColor: '#EDEDED' }}>
          <Text className="text-gray-600 p-3 text-lg text-center w-full">Create deal +</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.goBack() }} className="mt-4 border-2 border-red-200 bg-white rounded-lg shadow-sm mb-10">
          <Text className="text-red-500 p-3 text-lg rounded-md text-center w-full">Delete</Text>
        </Pressable>
      </ScrollView>
      <Pressable onPress={saveOrganization} className="bg-blue-800 rounded-md shadow-sm">
        <Text className="text-white p-3 text-lg rounded-md text-center w-full">Save</Text>
      </Pressable>
    </View>
  );
}

function AddOrganizationScreen({ navigation }) {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationDescription, setOrganizationDescription] = useState('');
  const uploadPlaceholder = "https://res.cloudinary.com/dguy8o0uf/image/upload/v1715907999/Screenshot_2024-05-16_at_9.06.27_PM_xsec9p.png"
  const [image, setImage] = useState(uploadPlaceholder);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: `${uuidv4()}_organization_banner.jpg`,
      type: 'image/jpeg'
    });
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(process.env.CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const saveOrganization = async () => {
    try {
      let imageUrl = image;
      if (image !== uploadPlaceholder) {
        imageUrl = await uploadImage(image);
      }

      createDeal({
        name: organizationName,
        details: organizationDescription,
        imageUrl: imageUrl,
      })
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save organization:', error);
    }
  };

  return (
    <View className="pt-4 px-8 pb-[20] bg-white h-full flex-1 justify-between">
      <View>
        <Text className="text-lg font-bold pb-2">
          Organization Banner
        </Text>
        <TouchableOpacity onPress={pickImage} className="flex flex-col">
          <Image
            className="rounded-md mx-5"
            source={{ uri: image }}
            resizeMode="cover"
            style={{ height: 180 }}
          />
        </TouchableOpacity>
        <View className="flex flex-col gap-2 py-6">
          <Text className="text-left justify-start">Organization Name</Text>
          <TextInput
            className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md"
            onChangeText={setOrganizationName}
            value={organizationName}
            placeholder="Enter your organization name here."
          />
          <Text className="text-left justify-start">Organization Description</Text>
          <TextInput
            className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md"
            onChangeText={setOrganizationDescription}
            value={organizationDescription}
            placeholder="Enter your organization description here."
          />
        </View>
        <Text className="text-lg font-bold pb-2">Current Deals</Text>
        <Pressable onPress={() => navigation.navigate("CreateDiscount")} className="bg-white rounded-md shadow-sm" style={{ borderWidth: 1, borderColor: '#EDEDED', borderRadius: 8 }}>
          <Text className="text-gray-600 p-3 text-lg rounded-md text-center w-full">Create deal +</Text>
        </Pressable>
      </View>
      <Pressable onPress={saveOrganization} className="bg-blue-800 rounded-md shadow-sm">
        <Text className="text-white p-3 text-lg rounded-md text-center w-full">Save</Text>
      </Pressable>
    </View>
  )
}

function AdminDashboardScreen({ navigation }) {
  const top_ad = "https://res.cloudinary.com/dguy8o0uf/image/upload/v1714426043/Taste_of_The_Fenway_logo_3_3_oop4zg.jpg"
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchDeals();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="pt-4 px-8 pb-[100] bg-white h-full">
      <View className="flex flex-row justify-between pb-2">
        <Text className="text-lg font-bold">
          Current Organizations
        </Text>
      </View>
      <View className="rounded-2xl" style={{ height: 270, borderWidth: 2, borderColor: '#EDEDED', borderRadius: 8 }} >
        <ScrollView className="flex">
          {deals.map((deal, index) => (
            <Pressable
              key={index}
              onPress={() => { navigation.navigate('EditOrganization', { id: deal._id, deal }) }}
              style={{ backgroundColor: "white", width: width * 0.75 }}
              className="bg-white w-3/4 h-auto p-2">
              <View className="flex flex-row">
                <Image
                  source={{ uri: deal.imageUrl }}
                  style={{ height: 50, width: 50, borderRadius: 18 }}
                  resizeMode='cover'
                />
                <View className="flex flex-col pl-4">
                  <Text className="font-bold text-lg">{deal.name}</Text>
                  <Text className={(deal.discounts.length > 0) ? "text-blue-800" : "text-gray-500"}>{deal.discounts.length} promotion{(deal.discounts.length != 1) && "s"}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Pressable onPress={() => { navigation.navigate('AddOrganization') }} className={"bg-blue-800 active:bg-blue-700 rounded-md mt-4"}>
        <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Add Organization</Text>
      </Pressable>
      <View className="flex flex-row justify-between pt-4 pb-2">
        <Text className="text-lg font-bold">
          Current Banner
        </Text>
        <Pressable className="flex flex-row pt-2" onPress={pickImage}>
          <Text className="text-blue-800 text-md font-semibold">Edit</Text>
        </Pressable>
      </View>
      <Image
        className="rounded-md"
        source={{ uri: top_ad }}
        resizeMode="cover"
        style={{ height: 180 }}
      />
    </View >
  )
}

function HomeScreen({ navigation }) {
  const top_ad = "https://res.cloudinary.com/dguy8o0uf/image/upload/v1714426043/Taste_of_The_Fenway_logo_3_3_oop4zg.jpg"
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchDeals();
  }, []);

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
            deal.discounts.map((discount, discountId) => (
              <Pressable
                key={index}
                onPress={() => { navigation.navigate('DealDetails', { deal, discountId }) }}
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
                      <Text className="text-md font-semibold">{discount}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))))}
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

function AdminLoginScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const correctPin = '1234';  // This should ideally be stored and managed more securely

  const handleUnlock = () => {
    if (pin === correctPin) {
      navigation.navigate('AdminDashboard')
    } else {
      Alert.alert("Access Denied", "Incorrect PIN entered.");
      setPin('');  // Reset PIN on failure
    }
  };

  return (
    <View className="flex-1 py-[24] px-[36]">
      <View className="flex flex-col gap-2 pb-6 w-full">
        <Text className={"text-left justify-start"}>Pin</Text>
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-700 p-3 rounded-md mb-"
          onChangeText={setPin}
          value={pin}
          placeholder="Enter your pin here."
          autoComplete="current-password"
          secureTextEntry={true}
        />
      </View>
      <Pressable onPress={() => { handleUnlock() }} className={"bg-blue-800 active:bg-blue-700 rounded-md"}>
        <Text className="text-white font-bold p-3 text-lg rounded-md text-center w-full">Continue</Text>
      </Pressable>
    </View>
  );
}

function SettingsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      await axios.put(`/users/${userId}`, { name, email, password }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      Alert.alert('Success', 'Your settings have been updated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings.');
    }
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
    discounts: [{ description: 'Buy 1 Get 1', expiry: new Date(2025, 4, 3) }],
    imageUrl: 'https://res.cloudinary.com/dguy8o0uf/image/upload/v1713049742/sushi_jvq1fd.jpg'
  };

  const discountId = route.params?.discountId ?? 0

  return (
    <View className="flex flex-col justify-between h-full bg-gray-100" >
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
          <Text className="text-lg text-green-600 pb-1">{deal.discounts[discountId][0]}</Text>
          {deal.discounts[discountId][1] && <Text className="text-md text-gray-500 italic">Expires {deal.discounts[discountId][1].toString()}</Text>}
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
    </View >
  );
}

function DealsScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getDeals();
        setDeals(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchDeals();
  }, []);

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

  const onSignUp = async () => {
    try {
      const data = await signup(email, password);
      console.log(data)
      Alert.alert('Sign Up Successful', 'Welcome!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  }

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
      <Pressable disabled={isSignUpDisabled} onPress={onSignUp} className={`${isSignUpDisabled ? "bg-blue-200" : "bg-blue-800"} active:bg-blue-700 rounded-md`}>
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

  const onLogin = async () => {
    try {
      const data = await login(email, password);
      Alert.alert('Login Successful', 'Welcome!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
    console.log(email, password);
    navigation.navigate('Home')
  }

  const handleLogoTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    if (newTapCount === 15) {
      setTapCount(0);
      navigation.navigate("AdminLogin");
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
