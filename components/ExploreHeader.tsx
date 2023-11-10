import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
const categories = [
  { name: "Tiny Home", icon: "home-outline" },
  { name: "Private Room", icon: "door-closed" },
  { name: "Entire Place", icon: "home-city-outline" },
  { name: "Unique Space", icon: "palette-outline" },
  { name: "Bed and Breakfast", icon: "bread-slice-outline" },
  { name: "Boutique Hotel", icon: "hotel" },
  { name: "Shared Room", icon: "account-multiple-outline" },
  { name: "Farm Stay", icon: "tractor" },
  { name: "Campsite", icon: "campfire" },
  { name: "Villa", icon: "home" },
];

const ExploreHeader = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "semibold" }}>Where to ?</Text>
                <Text style={{ fontFamily: "regular", color: Colors.grey }}>
                  Anywhere, Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", height: 130 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,

    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    padding: 14,
    borderRadius: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderColor: "#c2c2c2",
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
  },
});
