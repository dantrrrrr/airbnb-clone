import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  listings: any[];
  category: string;
}
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    console.log("reload listing", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);
  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontFamily: "semibold", maxWidth: 260 }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "semibold" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderRow}
      />
    </View>
  );
};

export default Listings;
const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: { width: "100%", height: 300, borderRadius: 10 },
});
