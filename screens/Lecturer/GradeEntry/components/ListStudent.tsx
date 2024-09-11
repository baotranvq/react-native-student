import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import axios from "axios";

interface Student {
  avatar_url: string;
  email: string;
  full_name: string;
  id: number;
  role: number;
  studen_code: string;
}

const ListStudent = ({ currentClassId }: { currentClassId: string }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleClick = (id: number, name: string, code: string) => {
    navigation.navigate("GradeEntryDetail", {
      classId: currentClassId,
      studentId: id,
      codeStudent: code,
      studentName: name,
    });
  };

  useEffect(() => {
    try {
      if (currentClassId) {
        const getAllStudentByClassId = async () => {
          const response = await axios.get(
            `${process.env["API_BASE_URL"]}/api/classes/${currentClassId}/students/`
          );
          setStudents(response.data);
        };
        getAllStudentByClassId();
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentClassId]);

  return (
    <View>
      <FlatList
        data={students}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.studentContainer}
            underlayColor="#DDDDDD"
            onPress={() => {
              handleClick(item.id, item.full_name, item.studen_code);
            }}
          >
            <Text style={styles.studentName}>{item.full_name}</Text>
          </TouchableHighlight>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  list: {
    marginTop: 10,
  },
  studentContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  studentName: {
    fontSize: 16,
    color: "black",
  },
});

export default ListStudent;
