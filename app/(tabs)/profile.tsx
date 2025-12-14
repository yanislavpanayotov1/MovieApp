import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image 
          source={icons.person} className='size-10 ' tintColor="#fff"
        />
        <Text className='text-white text-base font-bold mt-5'>Profile</Text>
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})