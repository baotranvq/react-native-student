import { View, Text, TouchableHighlight, Alert, Platform } from "react-native";
import HeaderInfo from "../../../components/HeaderInfo";
import ClassDropDown from "../../../components/ClassDropDown";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { jsonToCSV } from "react-native-csv";
import axios from "axios";

const GradeExport = () => {
  const [classId, setClassID] = useState("");

  const handleExportGrade = async () => {
    const data = [
      [
        "student_code",
        "name",
        "midterm",
        "final",
        "additional_grade_1",
        "additional_grade_2",
        "additional_grade_3",
      ],
    ];

    try {
      const studentsResponse = await axios.get(
        `${process.env["API_BASE_URL"]}/api/classes/${classId}/students/`
      );

      if (studentsResponse.data) {
        for (const student of studentsResponse.data) {
          const studentGradesResponse = await axios.get(
            `${process.env["API_BASE_URL"]}/api/classes/${classId}/student/${student.studen_code}/`
          );

          if (studentGradesResponse.data) {
            data.push([
              student.studen_code,
              student.full_name,
              studentGradesResponse.data[0].midterm,
              studentGradesResponse.data[0].final,
              studentGradesResponse.data[0].additional_grade_1,
              studentGradesResponse.data[0].additional_grade_2,
              studentGradesResponse.data[0].additional_grade_3,
            ]);
          }
        }
        await downloadCSV(data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to export grades");
    }
  };

  const downloadCSV = async (data: any) => {
    const csvContent = jsonToCSV(data);
    const fileName = "data.csv";
    const fileUri =
      Platform.OS === "android"
        ? `${FileSystem.documentDirectory}${fileName}`
        : `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const directoryUri = permissions.directoryUri;
          await FileSystem.StorageAccessFramework.createFileAsync(
            directoryUri,
            fileName,
            "text/csv"
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, csvContent, {
                encoding: FileSystem.EncodingType.UTF8,
              });
              Alert.alert("Success", "File saved successfully");
            })
            .catch((error) => {
              console.error(error);
              Alert.alert("Error", "Could not save the file");
            });
        } else {
          Alert.alert("Error", "Permission not granted");
        }
      } else {
        Alert.alert("Success", "File saved successfully");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not save the file");
    }
  };

  return (
    <View>
      <HeaderInfo title="Xuất điểm sinh viên" />
      <View style={{ padding: 20 }}>
        <ClassDropDown updateClassId={setClassID} />
        <TouchableHighlight
          onPress={handleExportGrade}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={{
            marginBottom: 5,
            width: 100,
          }}
        >
          <View
            style={{
              backgroundColor: "#1b00be",
              borderRadius: 5,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Xuat diem</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default GradeExport;
