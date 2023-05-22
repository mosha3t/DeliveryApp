import { View, Text,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from "react-native-maps";
import * as Progress from 'react-native-progress';
const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant= useSelector(selectRestaurant);

  return (
    <View className="bg-white flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-6">
            <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
            <AntDesign name="closecircle" size={35} color="black" />
            </TouchableOpacity>
            <Text className="font-light text-black text-lg">Order Help</Text>
        </View>
        <View className="bg-gray-200 mx-5 my-3 rounded-md p-4 z-50 shadow-md">
            <View className="flex-row justify-between">
            <View>
            <Text className="text-lg text-black">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">20-30 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://media3.giphy.com/media/cmCHuk53AiTmOwBXlw/200w.gif?cid=6c09b9526nq6dclym9720247p2gq3sfe9iqprq87rckhfs01&rid=200w.gif&ct=g",
              }}
              className="h-20 w-20"
            />
            </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
        </View>
        </SafeAreaView>
            <MapView
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={restaurant?.title}
          description={restaurant?.short_description}
          identifier="origin"
          pinColor="#00CC88"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-4 h-33">
        <Image
          source={{
            uri: "https://thumbs.dreamstime.com/b/delivery-man-ride-scooter-motorcycle-box-food-delivery-service-concept-character-design-isolaed-white-background-flat-160451039.jpg",
          }}
          className="h-15 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Mohamed Essam</Text>
          <Text className="text-gray-300">Your Rider</Text>
        </View>
        <Text className="text-[#00CC88] text-lg mr-4">Call</Text>
      </SafeAreaView>
    </View>
  );
}


export default DeliveryScreen