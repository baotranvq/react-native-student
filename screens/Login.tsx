import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickLogin = async () => {
    // try {
    //   const response = await axios.post(
    //     `${process.env["API_BASE_URL"]}/api/login/`,
    //     {
    //       email: email,
    //       password: password,
    //     }
    //   );

    //   if (response.data) {
    //     await AsyncStorage.setItem(
    //       "userId",
    //       JSON.stringify(response.data.user_info.id)
    //     );
    //     await AsyncStorage.setItem("accessToken", response.data.access);
    //     await AsyncStorage.setItem(
    //       "role",
    //       JSON.stringify(response.data.user_info.role_id)
    //     );
    //     await AsyncStorage.setItem(
    //       "fullName",
    //       response.data.user_info.full_name
    //     );
    //     await AsyncStorage.setItem("email", response.data.user_info.email);
    //     await AsyncStorage.setItem("code", response.data.user_info.studen_code);
    //     await AsyncStorage.setItem(
    //       "avatar",
    //       response.data.user_info.avatar_url
    //     );

    //     if (response.data.user_info.role_id == 2) {
    //       navigation.navigate("LecturerNavigator");
    //     } else if (response.data.user_info.role_id == 3) {
    //       navigation.navigate("StudentNavigator");
    //     }
    //   }
    // } catch (error) {
    //   Alert.alert("Please fill all fields and try again");
    // }
    // navigation.navigate("StudentNavigator");
    navigation.navigate("LecturerNavigator");
  };
  const handleClickRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/Logo.webp")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.wrapperInputs}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <Pressable onPress={handleClickRegister}>
              <Text
                style={{ textAlign: "right", color: "black", marginEnd: 20 }}
              >
                Đăng ký
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={handleClickLogin}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#005bb5" : "#0066cc",
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  wrapper: {
    width: "80%",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    gap: 30,
  },
  wrapperInputs: {
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
