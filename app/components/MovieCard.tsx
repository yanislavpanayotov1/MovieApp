import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image source={{uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/500'}} className="w-full h-52 rounded-lg"
            resizeMode='cover'/>
            <Text className='text-sm text-white font-bold mt-2' numberOfLines={1}>{title}</Text>

            <View className='flex-row items-center justify-left gap-x-1'>
                <Image 
                    source={icons.star} className='size-4'
                />
                <Text className='text-xs text-white font-semibold'>{Math.round(vote_average * 10) / 10}</Text>
            </View>
            <View className='flex-row justify-between items-center'>
                <Text className='text-xs text-light-300 font-semibold'>
                    {release_date?.split('-')[0]}
                </Text>
                <Text className='text-xs font-medium text-light-300 '>Movie</Text>
            </View>
        </TouchableOpacity>
    </Link>
        

  )
}

export default MovieCard