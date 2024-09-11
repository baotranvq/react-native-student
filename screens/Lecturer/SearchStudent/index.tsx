import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableHighlight } from "react-native";
import HeaderInfo from "../../../components/HeaderInfo";
import ClassDropDown from "../../../components/ClassDropDown";
import { AntDesign } from "@expo/vector-icons";
import ListStudent from "./components/ListStudent";

const SearchStudent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classId, setClassId] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View>
      <HeaderInfo title="Tìm kiếm sinh viên" />
      <View style={{ padding: 20 }}>
        <ClassDropDown updateClassId={setClassId} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Nhập tên sinh viên"
          />
          <TouchableHighlight
            style={styles.searchIcon}
            underlayColor="#DDDDDD"
            onPress={() => console.log("Search icon pressed")}
          >
            <AntDesign name="search1" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <ListStudent classId={classId} searchName={searchQuery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
});

export default SearchStudent;
