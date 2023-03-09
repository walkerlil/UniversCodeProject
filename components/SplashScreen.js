import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';
import { Text } from 'react-native';
import tw from 'twrnc'; 
import { View } from 'react-native';

export default function SplashScreen() {
  const animationRef = useRef()
  
  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <View style={tw`flex h-full w-full bg-gray-900`}>
      <Lottie
        ref={animationRef}
        on
        speed={0.75}
        source={require('../assets/loading.json')}
      />
      <Text style={tw`font-bold text-2xl text-center self-center justify-center h-full absolute top-60 text-white`}>Hello Univers Team!</Text>
      <Text style={tw`font-semibold text-sm absolute bottom-60 text-white self-center`}>Walker Was Here</Text>
    </View>
  );
}