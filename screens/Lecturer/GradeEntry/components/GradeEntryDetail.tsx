import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import HeaderInfo from "../../../../components/HeaderInfo";
import { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type GradeEntryDetailParams = {
  classId: string;
  studentId: number;
  studentName: string;
  codeStudent: string;
};

type RootStackParamList = {
  GradeEntryDetail: GradeEntryDetailParams;
};

type GradeEntryDetailRouteProp = RouteProp<
  RootStackParamList,
  "GradeEntryDetail"
>;

const GradeEntryDetail = () => {
  const [testScore, setTestScore] = useState("");
  const [attendanceScore, setAttendanceScore] = useState("");
  const [essayScore, setEssayScore] = useState("");
  const [midTermScore, setMidTermScore] = useState("");
  const [finalExamScore, setFinalExamScore] = useState("");
  const [courseName, setCourseName] = useState("");
  const [className, setClassName] = useState("");
  const route = useRoute<GradeEntryDetailRouteProp>();
  const { classId, studentId, studentName, codeStudent } = route.params;

  const handleSaveDraft = () => {
    try {
      const saveGradeEntry = async () => {
        const response = await axios.post(
          `${process.env.API_BASE_URL}/api/insert-grade/`,
          {
            user_id: studentId,
            class_id: classId,
            midterm: Number.parseFloat(midTermScore),
            final: Number.parseFloat(finalExamScore),
            additional_grade_1: Number.parseFloat(testScore),
            additional_grade_2: Number.parseFloat(attendanceScore),
            additional_grade_3: Number.parseFloat(essayScore),
          }
        );

        if (response.data) {
          Alert.alert("Lưu điểm thành công");
        }
      };
      saveGradeEntry();
    } catch (error) {}
  };

  useEffect(() => {
    try {
      const updateCourseAndClassName = async () => {
        const teacherId = await AsyncStorage.getItem("userId");
        const response = await axios.get(
          `${process.env["API_BASE_URL"]}/api/lecturer/${teacherId}/classes/`
        );
        if (response.data) {
          const classInfo = response.data.find(
            (item: any) => item.id === classId
          );
          setClassName(classInfo.name);
          setCourseName(classInfo.course.name);
        }
      };
      const getGrades = async () => {
        const response = await axios.get(
          `${process.env["API_BASE_URL"]}/api/classes/${classId}/student/${codeStudent}/`
        );

        if (response.data) {
          setTestScore(response.data[0].additional_grade_1);
          setAttendanceScore(response.data[0].additional_grade_2);
          setEssayScore(response.data[0].additional_grade_3);
          setMidTermScore(response.data[0].midterm);
          setFinalExamScore(response.data[0].final);
        }
      };
      updateCourseAndClassName();
      getGrades();
    } catch (error) {}
  }, []);

  return (
    <View>
      <HeaderInfo title="Nhập điểm sinh viên" />
      <View style={{ padding: 20 }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#DDDDDD"
            onPress={handleSaveDraft}
          >
            <Text style={{ fontWeight: "600" }}>Lưu nháp </Text>
          </TouchableHighlight>
        </View>
        <View
          style={{
            display: "flex",
            marginTop: 20,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text style={{ fontWeight: "600" }}>IDSV:</Text>
          <Text style={{ fontWeight: "400" }}>{codeStudent}</Text>
        </View>
        <View
          style={{
            display: "flex",
            marginTop: 10,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Họ và tên:</Text>
          <Text style={{ fontWeight: "400" }}>{studentName}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Lớp học:</Text>
          <Text style={{ fontWeight: "400" }}>{className}</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Môn học:</Text>
          <Text style={{ fontWeight: "400" }}>{courseName}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Kiểm tra (10%):</Text>
            <TextInput
              style={styles.gradeInput}
              value={testScore}
              onChangeText={setTestScore}
              keyboardType="numeric"
              placeholder="Nhập điểm"
            />
          </View>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Chuyên cần (10%):</Text>
            <TextInput
              style={styles.gradeInput}
              value={attendanceScore}
              onChangeText={setAttendanceScore}
              keyboardType="numeric"
              placeholder="Nhập điểm"
            />
          </View>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Tiểu luận (15%):</Text>
            <TextInput
              style={styles.gradeInput}
              value={essayScore}
              onChangeText={setEssayScore}
              keyboardType="numeric"
              placeholder="Nhập điểm"
            />
          </View>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Giữa HP (15%):</Text>
            <TextInput
              style={styles.gradeInput}
              value={midTermScore}
              onChangeText={setMidTermScore}
              keyboardType="numeric"
              placeholder="Nhập điểm"
            />
          </View>
          <View style={styles.gradeRow}>
            <Text style={styles.gradeLabel}>Thi (50%):</Text>
            <TextInput
              style={styles.gradeInput}
              value={finalExamScore}
              onChangeText={setFinalExamScore}
              keyboardType="numeric"
              placeholder="Nhập điểm"
            />
          </View>
        </View>
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
  gradeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  gradeLabel: {
    fontWeight: "600",
    fontSize: 16,
  },
  gradeInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 100,
    textAlign: "center",
  },
});

export default GradeEntryDetail;
