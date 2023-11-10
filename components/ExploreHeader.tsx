import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import styles from "./exploreHeader.style";
const categories = [
  { name: "Tiny Home", icon: "house" },
  { name: "Private Room", icon: "meeting-room" },
  { name: "Entire Place", icon: "apartment" },
  { name: "Unique Space", icon: "emoji-objects" },
  { name: "Bed and Breakfast", icon: "free-breakfast" },
  { name: "Boutique Hotel", icon: "hotel" },
  { name: "Shared Room", icon: "group" },
  { name: "Farm Stay", icon: "agriculture" },
  { name: "Campsite", icon: "fireplace" },
  { name: "Villa", icon: "house-siding" },
];
interface Props {
  onCategoryChanged: (category: string) => void;
}
const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedCategory = (index: number) => {
    const selected = itemsRef.current[index];
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };
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
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 30,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectedCategory(index)}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;
