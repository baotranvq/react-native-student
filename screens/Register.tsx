import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableHighlight,
  Image,
  Button,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const RegisterScreen = () => {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    data.append("upload_preset", `${process.env["UPLOAD_PRESET"]}`);
    try {
      const response = await axios.post(
        `${process.env["CLOUDINARY_URL"]}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
      return null;
    }
  };

  const handleRegister = async () => {
    console.log("======chua");
    if (!email || !password || !name || !id) {
      Alert.alert("Error", "Please fill all fields11");
      return;
    }

    let avatarUrl = null;
    if (image) {
      avatarUrl = await uploadImageToCloudinary(image);
    }
    try {
      console.log("======chua2", process.env["API_BASE_URL"]);
      const response = await axios.post(
        `${process.env["API_BASE_URL"]}/api/register/`,
        {
          email,
          password,
          full_name: name,
          student_code: id,
          avatar_url: avatarUrl || "none",
        }
      );
      console.log(response, "+++++++++");

      if (response.data) {
        Alert.alert("Register successfully");
        navigation.navigate("Login");
        return;
      }
    } catch (error) {
      Alert.alert("Please fill all fields and try again22");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <View style={{ width: "100%", padding: 20 }}>
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
            autoCapitalize="none"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />

          <View style={styles.photoContainer}>
            <Button
              title="Choose Photo"
              onPress={pickImage}
              color={"#1b00be"}
            />
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>

          <TouchableHighlight
            style={{
              marginTop: 20,
              backgroundColor: "#1b00be",
              borderRadius: 15,
              padding: 10,
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "400",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableHighlight>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  photoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 35,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default RegisterScreen;
