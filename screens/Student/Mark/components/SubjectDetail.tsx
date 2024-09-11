import { View, Text, Button } from "react-native";
import HeaderInfo from "../../../../components/HeaderInfo";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import useListSubjectStore, {
  Subject,
} from "../../../../store/student/listSubject";
import { useEffect, useState } from "react";

type SubjectDetailRouteParams = {
  subjectId: number;
};

type SubjectDetailRouteProp = RouteProp<
  { SubjectDetail: SubjectDetailRouteParams },
  "SubjectDetail"
>;

const SubjectDetail = () => {
  const route = useRoute<SubjectDetailRouteProp>();
  const { subjectId } = route.params;
  const { subjects } = useListSubjectStore();
  const [subject, setSubject] = useState<Subject>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const subject = subjects.find((subject) => subject.course.id === subjectId);
    setSubject(subject);
  }, []);

  const calculateTotalScore = (subject: Subject): number => {
    const additionalGrade1 = parseFloat(subject.additional_grade_1 || "0");
    const additionalGrade2 = parseFloat(subject.additional_grade_2 || "0");
    const additionalGrade3 = parseFloat(subject.additional_grade_3 || "0");
    const midterm = parseFloat(subject.midterm || "0");
    const final = parseFloat(subject.final || "0");

    return (
      additionalGrade1 * 0.1 +
      additionalGrade2 * 0.1 +
      additionalGrade3 * 0.15 +
      midterm * 0.15 +
      final * 0.5
    );
  };

  return (
    <View>
      <HeaderInfo title="Điểm môn học" />
      <View style={{ padding: 20 }}>
        <View
          style={{ backgroundColor: "white", borderRadius: 15, padding: 10 }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Tên môn học:
            </Text>
            <Text>{subject?.course.name}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Kiểm tra (10%):
            </Text>
            <Text>{subject?.additional_grade_1}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Chuyên cần (10%):
            </Text>
            <Text>{subject?.additional_grade_2}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Tiểu luận (15%):
            </Text>
            <Text>{subject?.additional_grade_3}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Giữa HP (15%):
            </Text>
            <Text>{subject?.midterm}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Thi (50%):
            </Text>
            <Text>{subject?.final}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Tổng kết T10:
            </Text>
            <Text>
              {subject ? calculateTotalScore(subject).toFixed(2) : "0.00"}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}></View>
        <Button
          title="Quay về"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default SubjectDetail;
