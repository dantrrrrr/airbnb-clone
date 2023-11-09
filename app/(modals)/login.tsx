import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import styles from "./login.style";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}
const Login = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    // goolge=>oauth_google=> oauth_google:googleAuth=>the function above

    try {
      const { createdSessionId, setActive } = await selectedAuth(); //one of this shit :googleAuth,appleAuth,facebookAuth
      console.log(
        "🚀 ~ file: login.tsx:39 ~ onSelectAuth ~ createdSessionId:",
        createdSessionId
      );
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.log("🚀 ~ file: login.tsx:49 ~ OAuth ~ error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ rowGap: 20 }}>
        {/* //PHONE */}
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="call-outline"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        {/* //APPLE */}
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="md-logo-apple"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        {/* GOOGLE */}
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="md-logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        {/* FACEBOOK */}
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="md-logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
