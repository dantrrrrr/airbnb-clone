import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";

import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const Page = () => {
  const [category, setCategory] = useState("Tiny Home");

  const onDataChanged = (category: string) => {
    // console.log(
    //   "🚀 ~ file: index.tsx:10 ~ onDataChanged ~ category:",
    //   category
    // );
    setCategory(category);
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={[]} category={category} />
    </View>
  );
};

export default Page;
