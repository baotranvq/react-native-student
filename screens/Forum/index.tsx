import { View, Pressable, Text, ScrollView } from "react-native";
import HeaderInfo from "../../components/HeaderInfo";
import ListPost from "./components/LIstPost";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const Fourm = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleClickCreatePost = () => {
    navigation.navigate("NewPost");
  };

  return (
    <ScrollView>
      <View>
        <HeaderInfo title="Diễn đàn hỏi đáp" />
        <View style={{ padding: 20 }}>
          <Pressable
            onPress={handleClickCreatePost}
            style={{
              padding: 15,
              backgroundColor: "#1b00be",
              width: 150,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Thêm câu hỏi
            </Text>
          </Pressable>
          <ListPost />
        </View>
      </View>
    </ScrollView>
  );
};

export default Fourm;
