import { View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { router, useLocalSearchParams } from 'expo-router'
import { icons } from '@/constants/icons'

interface MovieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo =({label, value} : MovieInfoProps) => (
  <View className='flex-col items-start justify-center gap-x-1 mt-5'>
    <Text className='text-light-200 text-sm'>{label}</Text>
    <Text className='text-light-100 text-sm font-bold'>{value || 'N/A'}</Text>
  </View>
)
   

const MovieDetails = () => {
  const {id} = useLocalSearchParams();

  const {data: movie, loading, error} = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
            className='w-full h-[550px]'
            resizeMode='stretch'
            />
        </View>
        <View className='flex-col items-start justify-center mt-5'>
          <Text className='text-white text-xl font-bold mb-3'>{movie?.title}</Text>
        </View>
        <View className='flex-row items-center gap-x-1 mt-2'>
          <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
          <Text className='text-light-200 text-sm'>{movie?.runtime} min</Text>
        </View>
        <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
          <Image
            source={icons.star}
            className='size-4 h-4 w-4'
            resizeMode='contain'
            />
          <Text className='text-yellow-500 text-sm'>{movie?.vote_average?.toFixed(1)}</Text>
          <Text className='text-light-200 text-sm'> ({movie?.vote_count} votes)</Text>
        </View>
      
        <MovieInfo 
          label="Overview"
          value={movie?.overview}
        />
        <MovieInfo 
          label="Genres"
          value={movie?.genres?.map((g) => g.name).join(', ')}
        />
        <View className='flex-row flex w-1/2 justify-between mt-2'>
          <MovieInfo 
            label="Budget"
            value={movie?.budget ? `$${(movie.budget / 1_000_000).toLocaleString()} Million` : null}
          />
          <MovieInfo 
            label="Revenue"
            value={movie?.revenue ? `$${(movie.revenue / 1_000_000).toLocaleString()} Million` : null}
          />
          
        </View>
          <MovieInfo 
            label="Production Company"
            value={movie?.production_companies?.map((pc) => pc.name).join(', ') || null}
          />
      </ScrollView>
      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row items-center justify-center z-50' onPress={() => router.back()}>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff"/>
        <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails