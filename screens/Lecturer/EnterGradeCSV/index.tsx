import React, { useState } from "react";
import { TouchableHighlight, View, Text, Alert } from "react-native";
import HeaderInfo from "../../../components/HeaderInfo";
import ClassDropDown from "../../../components/ClassDropDown";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

interface DocumentResponse {
  assets: {
    mimeType: string;
    name: string;
    size: number;
    uri: string;
  }[];
  canceled: boolean;
}

const EnterGradeCSV: React.FC = () => {
  const [classId, setClassId] = useState<string>("");
  const [fileResponse, setFileResponse] = useState<DocumentResponse | null>(
    null
  );
  const [fileName, setFileName] = useState<string>("");

  const handleImportGrade = async () => {
    try {
      const response = (await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      })) as DocumentResponse;

      if (!response.canceled && response.assets.length > 0) {
        const file = response.assets[0];
        setFileResponse(response);
        setFileName(file.name);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSave = async () => {
    try {
      if (
        fileResponse &&
        !fileResponse.canceled &&
        fileResponse.assets.length > 0
      ) {
        const file = fileResponse.assets[0];
        const formData = new FormData();
        formData.append("file", {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "application/octet-stream",
        } as any);

        const response = await axios.post(
          `${process.env["API_BASE_URL"]}/api/upload-csv/${classId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          Alert.alert("Success", "CSV file uploaded successfully!");
        }
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to upload CSV: " + error.message);
    }
  };

  return (
    <View>
      <HeaderInfo title="Nhập điểm bằng CSV" />
      <View style={{ padding: 20 }}>
        <ClassDropDown updateClassId={setClassId} />
        <TouchableHighlight
          onPress={handleImportGrade}
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
            <Text style={{ color: "white" }}>
              {fileName ? fileName : "Import CSV"}
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={handleSave}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={{
            marginTop: 20,
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
            <Text style={{ color: "white" }}>Save</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default EnterGradeCSV;
