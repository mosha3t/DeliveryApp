import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
const ProcessingOrderScreen = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(()=>{
            navigation.navigate("Delivery")
        },3000)
    },[])
  return (
<SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/Processing.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-70 w-full"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-black font-bold text-center"
      >
        Processing your order!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="black" />
    </SafeAreaView>
  )
}

export default ProcessingOrderScreen