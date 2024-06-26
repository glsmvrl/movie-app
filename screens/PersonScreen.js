import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { useNavigation } from "expo-router";
import MovieList from "../components/MovieList";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import {
  fetchPersonCredits,
  fetchPersonDetails,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";
export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonCredits(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPersonDetails(data);
    setLoading(false);
  };

  const getPersonCredits = async (id) => {
    const data = await fetchPersonCredits(id);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
        }
      >
        <TouchableOpacity
          style={{ backgroundColor: theme.background }}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person detail */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500">
              <Image
                source={{ uri: image342(personDetails?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-base text-neutral-500 font-bold text-center">
              {personDetails?.place_of_birth}
            </Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.popularity?.toFixed(2)}
              </Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personDetails?.biography || "N/A"}
            </Text>
          </View>

          {/* movies */}
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
