import { View, ActivityIndicator } from "react-native";
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../../../utils/formatTime";
import { useNavigation } from "@react-navigation/native";

interface IAuthor {
  id: number;
  email: string;
  full_name: string;
  student_code: string;
  role: number;
  avatar_url: string;
}

interface IPost {
  id: number;
  author: IAuthor;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  class_field: any;
}

const ListPost = () => {
  const [listPost, setListPost] = useState<IPost[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await axios.get(
          `${process.env["API_BASE_URL"]}/api/post/`
        );

        if (response.data) {
          setListPost(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Add event listener for focus event
    const unsubscribe = navigation.addListener("focus", () => {
      getAllPost();
    });

    // Call getAllPost once when the component mounts
    getAllPost();

    // Clean up the event listener
    return unsubscribe;
  }, [navigation]);

  if (listPost.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#1b00be" />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      {listPost.map((post, index) => (
        <Post
          key={index}
          avatar={post.author.avatar_url}
          content={post.content}
          createAt={formatDate(post.created_at)}
          name={post.author.full_name}
        />
      ))}
    </View>
  );
};

export default ListPost;
