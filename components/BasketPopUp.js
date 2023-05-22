import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BasketPopUp = () => {
    const items =useSelector(selectBasketItems)
    const navigation =useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
    if (items.length===0) return null;
  return (
    <View className="absolute bottom-9 w-full z-50">
      <TouchableOpacity onPress={()=>navigation.navigate("Basket")} className="bg-[#00CCBB] mx-3 p-2 rounded-lg items-center flex-row space-x-2">
        <Text className="text-white py-2 px-4 font-extrabold text-lg bg-[#01A299] rounded-md">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <Text className="text-white py-2 px-2 font-extrabold text-lg bg-[#00CCBB]">${basketTotal} </Text>

      </TouchableOpacity>
    </View>
  )
}

export default BasketPopUp