import { View, Image, Text } from "react-native";

interface IProps {
  name: string;
  avatar: string;
  content: string;
  createAt: string;
}

const Post: React.FC<IProps> = ({ name, avatar, content, createAt }) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: avatar }}
          style={{ width: 50, height: 50, borderRadius: 999 }}
          resizeMode="cover"
        />
        <View>
          <Text
            style={{
              fontWeight: "600",
              color: "#1b00be",
              fontSize: 17,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              color: "#1b00be",
              fontSize: 15,
            }}
          >
            Ngày đăng: {createAt}
          </Text>
        </View>
      </View>
      <Text style={{ marginTop: 5, color: "#1b00be" }}>{content}</Text>
    </View>
  );
};

export default Post;
