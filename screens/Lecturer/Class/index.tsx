import { View, Text, TouchableHighlight } from "react-native";
import HeaderInfo from "../../../components/HeaderInfo";

const Class = ({ navigation }: { navigation: any }) => {
  const handleClickGradeEntry = () => {
    navigation.navigate("GradeEntry");
  };

  const handleClickGradeExport = () => {
    navigation.navigate("GradeExport");
  };

  const handleEnterGradeCSV = () => {
    navigation.navigate("EnterGrade");
  };

  const handleSearchStudent = () => {
    navigation.navigate("SearchStudent");
  };

  return (
    <View>
      <HeaderInfo title="Danh sách lớp" />
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#DDDDDD"
          onPress={handleClickGradeEntry}
        >
          <View>
            <Text style={styles.buttonText}>Nhập điểm môn học</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor="#DDDDDD"
          onPress={handleSearchStudent}
        >
          <View>
            <Text style={styles.buttonText}>Tìm kiếm sinh viên</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#DDDDDD"
          onPress={handleEnterGradeCSV}
        >
          <View>
            <Text style={styles.buttonText}>Nhap diem bang excel</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#DDDDDD"
          onPress={handleClickGradeExport}
        >
          <View>
            <Text style={styles.buttonText}>Xuat diem</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
};

export default Class;
