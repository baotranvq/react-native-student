import { ActivityIndicator, View } from "react-native";
import Subject from "./Subject";
import { useEffect, useState } from "react";
import useListSubjectStore from "../../../../store/student/listSubject";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListSubject = () => {
  const { setSubjects } = useListSubjectStore();
  const [listSubject, setListSubject] = useState([]);

  useEffect(() => {
    async function getSubjects() {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(
          `${process.env["API_BASE_URL"]}/api/course/${userId}/`
        );
        setSubjects(response.data);
        setListSubject(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSubjects();
  }, []);

  if (listSubject.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#1b00be" />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
      {listSubject.map((subject, index) => (
        <Subject
          key={index}
          title={subject.course.name}
          id={subject.course.id}
        />
      ))}
    </View>
  );
};

export default ListSubject;
