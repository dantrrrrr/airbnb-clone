import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Login from "../(modals)/login";
import Booking from "../(modals)/booking";

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/123"}>listing detail page</Link>
    </View>
  );
};

export default Page;
