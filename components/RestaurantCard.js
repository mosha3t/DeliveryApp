import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{
      navigation.navigate("Restaurant",{id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    }} className="bg-white mr-3 shadow">
      <Image className="h-40 w-40 rounded-sm" source={{ uri:urlFor(imgUrl).url() }} />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
        <AntDesign name="star" opacity={0.6} size={24} color="green" />
        <Text className="text-xs text-gray-400">
        <Text className="text-green-500">{rating}</Text>.{genre}
        </Text>
        </View>
        <View className="flex-row items-center space-x-1">
        <Ionicons opacity={0.5} name="location" size={21} color="gray" />
        <Text className="text-xs text-grey-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
