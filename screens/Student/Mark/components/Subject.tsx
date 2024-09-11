import { Text, TouchableHighlight, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const Subject = ({ title, id }: { title: string; id: number }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleClick = () => {
    navigation.navigate("SubjectDetail", { subjectId: id });
  };

  return (
    <TouchableHighlight
      onPress={handleClick}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      style={{
        marginBottom: 5,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>{title}</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </TouchableHighlight>
  );
};

export default Subject;
