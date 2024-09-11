import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const ClassDropDown = ({
  updateClassId,
}: {
  updateClassId: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [ClassId, setClassId] = useState<string | null>("");
  const [listClass, setListClass] = useState([]);

  const onChangeClass = () => {
    updateClassId(ClassId || "");
  };

  useEffect(() => {
    try {
      const getAllClassByTeacherId = async () => {
        const teacherId = await AsyncStorage.getItem("userId");

        const response = await axios.get(
          `${process.env.API_BASE_URL}/api/lecturer/${teacherId}/classes/`
        );

        if (response.data) {
          const newClasses = response.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));

          setListClass(newClasses);
        }
      };
      getAllClassByTeacherId();
    } catch (error) {}
  }, []);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={ClassId}
        items={listClass || []}
        setOpen={setOpen}
        setValue={setClassId}
        onChangeValue={onChangeClass}
        style={styles.dropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  dropdown: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
  },
  selectedText: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default ClassDropDown;
