import { View } from "react-native";
import HeaderInfo from "../../../components/HeaderInfo";
import ListSubject from "./components/ListSubject";

const HomeScreen = () => {
  return (
    <View>
      <HeaderInfo title="Danh sách môn học" />
      <ListSubject />
    </View>
  );
};

export default HomeScreen;
