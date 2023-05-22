import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";
import 'react-native-url-polyfill/auto';

const HomeScreen=()=> {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      });
  }, [navigation]);

  useEffect(() => {
      client.fetch(`
      *[_type == "featured"] {
         ...,
           restaurants[]->{
               ...,
                   dishes[]->,
                       type->{
                           ...,}
               },
       }
      `).then(data => {
          setFeaturedCategories(data);
      }).catch(err => console.error(err));
  }, []);
  return (
    <SafeAreaView className="bg-white" style={styles.container}>
      {/*Header */}
      <View className="flex-row pb-2 items-center mx-5 space-x-3">
        <Image
          source={{
            uri: "https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/330821687_2986870628275454_307798897722419051_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=l3SXXQPYd_oAX9bZASc&_nc_ht=scontent-mrs2-1.xx&oh=00_AfCskYgPEDmJSCAQGSZassc8e7fWe0O9k7WtWXa1pkEHFg&oe=642CC06E",
          }}
          className=" h-8 w-7 bg-gray-300 p-5 rounded-full"
        />
        <View className=" flex-1">
          <Text className="font-bold text-gray-500 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <Ionicons name="chevron-down-sharp" size={20} color="#00CC88" />
          </Text>
        </View>
        <AntDesign name="user" size={24} color="#00CC88" />
      </View>
      {/*Search */}
      <View className="flex-row  items-center space-x-2 pb-4 mx-5">
        <View className="flex-row items-center h-10 flex-1 space-x-2 bg-gray-100">
          <AntDesign name="search1" size={29} color="grey" />
          <TextInput
            placeholder="Search Restaurants & Cafes"
            keyboardType="default"
          />
        </View>
        <AntDesign name="filter" size={24} color="#00CC88" />
      </View>
      {/*Body */}

      <ScrollView>
        {/*Categories */}
        <Categories />
        {featuredCategories?.map(category=>(
             <FeaturedRow
             key={category._id}
             id={category._id}
             title={category.name}
             description={category.short_description}
           />
        ))}
        {/*Featured Rows */}

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
export default HomeScreen;
