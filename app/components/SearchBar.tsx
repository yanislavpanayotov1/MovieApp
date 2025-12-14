import { View, Text, TextInput, Image} from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { validatePathConfig } from 'expo-router/build/fork/getPathFromState-forks';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}
const SearchBar = ({placeholder, onPress, value, onChangeText} : Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className="size-5" resizeMode='contain' tintColor='#ab8bff'/>
            <TextInput 
              onPress={onPress}
              onChangeText={onChangeText}
              placeholder={placeholder}
              value={value}
              placeholderTextColor="#a8b5db"
              className='flex-1 ml-2 text-white text-base font-medium'
            />
    </View>
  )
}

export default SearchBar