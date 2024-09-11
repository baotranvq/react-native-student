import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import axios from "axios";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import HeaderInfo from "../../components/HeaderInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.post(
        `${process.env.API_BASE_URL}/api/create-post/`,
        {
          author_id: userId,
          title,
          content,
        }
      );

      if (response.data) {
        navigation.navigate("Forum");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <HeaderInfo title="Tạo bài viết" />
      <View style={{ padding: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter post title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Enter post content"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textarea: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default NewPost;
