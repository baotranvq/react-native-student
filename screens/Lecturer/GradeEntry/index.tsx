import React, { useState } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import ClassDropDown from "../../../components/ClassDropDown";
import HeaderInfo from "../../../components/HeaderInfo";
import ListStudent from "./components/ListStudent";
import axios from "axios";

const GradeEntry: React.FC = () => {
  const [currentClassId, setCurrentClassId] = useState("");

  const handleLookGrade = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/api/lock_grade/`,
        {
          class_id: currentClassId,
        }
      );
      if (response.data) {
        console.log(response.data);

        Alert.alert("Đã khóa điểm thành công");
      }
    } catch (error) {}
  };

  return (
    <View>
      <HeaderInfo title="Nhập điểm sinh viên" />

      <View style={{ padding: 20 }}>
        <View style={{ height: 10 }}></View>
        <ClassDropDown updateClassId={setCurrentClassId} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="#DDDDDD"
          onPress={handleLookGrade}
        >
          <Text style={{ fontWeight: "600" }}>Khóa điểm</Text>
        </TouchableHighlight>
        <ListStudent currentClassId={currentClassId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: 100,
  },
});

export default GradeEntry;
