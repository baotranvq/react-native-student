import { View, Text, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface IProps {
  id: number;
  icon: any;
  title: string;
  description: string;
  handleShowInfo: (id: number) => void;
}

const RowInfo: React.FC<IProps> = ({
  id,
  icon,
  title,
  description,
  handleShowInfo,
}) => {
  return (
    <Pressable onPress={() => handleShowInfo(id)}>
      <View
        style={{
          width: "100%",
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <View
          style={{
            backgroundColor: "#1b00be",
            borderRadius: 8,
            height: 40,
            width: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1, marginStart: 20 }}>
          <Text style={{ fontWeight: "600" }}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <AntDesign name="right" size={20} color="#ddd" />
      </View>
    </Pressable>
  );
};

export default RowInfo;
