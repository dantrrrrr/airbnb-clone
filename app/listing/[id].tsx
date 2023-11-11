import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import listingsData from "@/constants/data/subset_airbnb-listings.json";
import { Listing } from "@/interfaces/listing";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingsData as Listing[]).find((item) => item.id === id);
  const navigation = useNavigation();
  if (!listing) return null;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const shareListing = async () => {
    try {
      await Share.share({ title: listing?.name, url: listing?.listing_url });
    } catch (error) {
      console.log("🚀 ~ file: [id].tsx:41 ~ shareListing ~ error:", error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="heart-outline" size={24} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.grey} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.Image
          source={{ uri: listing?.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing?.name}</Text>
          <Text style={styles.location}>
            {listing?.room_type} in {listing?.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {`${listing?.guests_included} guest${
              listing?.guests_included > 1 ? "s" : ""
            } · ${listing?.bedrooms} bedroom${
              listing?.bedrooms > 1 ? "s" : ""
            } · ${listing?.beds} bed${listing?.beds > 1 ? "s" : ""} · ${
              listing?.bathrooms
            } bathroom${listing?.bathrooms > 1 ? "s" : ""}`}
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text>
              {listing?.review_scores_rating / 20} -{" "}
              {listing?.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />
            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>
          <View style={styles.divider}></View>

          <Text style={styles.description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>
      {/* Footer */}

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.btn, { paddingHorizontal: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { height: IMG_HEIGHT, width: width },
  infoContainer: { padding: 24, backgroundColor: "#fff" },
  name: { fontSize: 26, fontWeight: "bold", fontFamily: "semibold" },
  location: { fontSize: 18, marginTop: 10, fontFamily: "semibold" },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "regular",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  hostView: { flexDirection: "row", alignItems: "center", gap: 12 },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "regular",
    textAlign: "justify",
    lineHeight: 20,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: { fontSize: 18, fontFamily: "semibold" },
  bar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  roundButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
});
export default Page;
