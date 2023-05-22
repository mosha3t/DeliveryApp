import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";
import {
  ArrowLeftIcon,
  PaperClipIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { Entypo } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketPopUp from "../components/BasketPopUp";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {
    params: {
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
    },
  } = useRoute();
  useEffect(() => {
    dispatch(setRestaurant({
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
    }))
  }, [dispatch])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
    <BasketPopUp/>
    <ScrollView>
      <View className="relative bg-black">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-64 bg-gray-300 p-4"
        />
        <View className="absolute top-10 left-2 p-2 bg-gray-300 rounded-full">
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={30} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white">
        <View className="px-3 pt-3">
          <Text className="text-4xl font-bold">{title}</Text>
          <View className="flex-row space-x-3 my-2">
            <View className="flex-row item-center space-x-1">
              <StarIcon color="green" opacity={0.6} size={24} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> . {genre}
              </Text>
            </View>
            <View className="flex-row item-center space-x-1">
              <Entypo name="location" color="gray" opacity={0.6} size={19} />
              <Text className="text-xs text-gray-400">
                <Text className="text-xs text-gray-400">
                  Nearby . {address}
                </Text>
              </Text>
            </View>
          </View>
          <Text className="text-gray-400 mt-1 pb-3">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row  items-center space-x-3 p-4 border-y  border-gray-200">
          <AntDesign
            name="questioncircle"
            color="gray"
            opacity={0.7}
            size={21}
          />
          <Text className="pl-2 flex-1 text-md font-bold">
            Do You Have a food allergy?
          </Text>
          <AntDesign name="caretright" color="#00CC88" />
        </TouchableOpacity>
      <View className="pb-20">
        <Text className="pt-5 mb-4 font-bold text-xl"></Text>
        {/*Dish Row*/}
        {dishes.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
      </View> 
    </ScrollView>
    </>
  );
};

export default RestaurantScreen;

/*Short description not working */
