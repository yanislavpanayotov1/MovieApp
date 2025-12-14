import { View, Text , Image, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect } from 'react'
import { images } from '@/constants/images'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'

const Search = () => {

const [searchQuery, setSearchQuery] = React.useState('');

const router = useRouter();

  const {data : movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(() => fetchMovies({query: searchQuery}), true);

  useEffect( () => {
    const timeoutId = setTimeout(async () => {
    if (searchQuery.trim()) {
       await loadMovies();
    }
    else {
      reset();
    }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode='cover'
      />
      <FlatList 
        data={movies}
        renderItem={({item}) => (
          <MovieCard
            {...item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center', 
          gap: 15,
          marginVertical: 16,
          paddingRight: 5,
          marginBottom: 10}}
        contentContainerStyle={{paddingBottom: 100}}
        className="px-5 mt-2 pb-32"  
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 mb-6'>
              <Image className="w-12 h-10" source={icons.logo}/>
            </View>
            <View className='my-5'>
              <SearchBar
                  placeholder="Search for movies..."
                  value={searchQuery}
                  onChangeText={(text:string) => setSearchQuery(text)}
                />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3 self-center"/>)}
            {moviesError && (
              <Text className="text-red-500 text-center my-3">Error: {moviesError.message}</Text>
            )}
            {!moviesLoading && !moviesError && (searchQuery.trim() && movies?.length > 0) && (
              <Text className="text-lg text-white font-bold mb-3">Search Results {" "} 
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
              <Text className='text-center text-grey-500'>
                {searchQuery.trim() ? 'No movie found.' : 'Search for a movie.'}
              </Text>
            </View>
          ) : null
        }
      ></FlatList>
    </View>
    
  )
}

export default Search