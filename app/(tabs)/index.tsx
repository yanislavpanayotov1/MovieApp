import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, ScrollView, TextInput, ActivityIndicator } from "react-native";
import SearchBar  from "../components/SearchBar";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { FlatList } from "react-native";
import MovieCard from "../components/MovieCard";


export default function Index() {
  
  const router = useRouter();

  const {data : movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({query: ''}));

  return (
    <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0"/>
        <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}
        >
            <Image className="w-12 h-10 mt-20 mb-5 mx-auto" source={icons.logo}/>

            {
              moviesLoading ? (
                <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/>)
                : moviesError ? (
                <Text className="text-red-500 text-center mt-10">Failed to load movies. Please try again.</Text>
            ) : (
                <View className="flex-1 mt-5">
              <SearchBar onPress={() => router.push('/search')}
                  placeholder="Search for movies or TV shows"
                />
                <>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

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
                      justifyContent: 'flex-start', 
                      gap: 20,
                      paddingRight: 5,
                      marginBottom: 10}}

                    className="mt-2 pb-32"  
                    scrollEnabled={false}
                  />
                </>

            </View>)
            } 

            
        </ScrollView>

        
        
    </View>
    
    
  );
}
