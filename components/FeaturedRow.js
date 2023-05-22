import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons'; 
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";
const FeaturedRow = ({ id, title, description }) => {
  const [restaurants,setRestaurants]= useState([])
  useEffect(() => {
    client.fetch(`
    *[_type == "featured" && _id ==$id] {
       ...,
         restaurants[]->{
             ...,
                 dishes[]->,
                     type->{
                      name
                         }
             },
     }[0]
   `, {id}).then (data=>{
    setRestaurants(data?.restaurants)
   })
  }, [id])

  return (
    <View>
      <View className="mt-3 flex-row items-center justify-between px-3">
        <Text className="font-bold text-lg">{title}</Text>
        <AntDesign name="arrowright" size={24} color="#00CC88" />
      </View>
      <Text className="text-xs text-gray-400 px-3">{description}</Text>
      <ScrollView horizontal contentContainerStyle={{
        paddingHorizontal:16,
      }}
      showsHorizontalScrollIndicator={false}
      className="pt-2"
      >
{
          restaurants?.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_desc={restaurant.short_desc}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          ))
        }
        {/* Restaurant Cards */}
      
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
