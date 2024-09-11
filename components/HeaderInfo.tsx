import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const urlNotBack = {
  account: "Account",
  mark: "Mark",
  home: "Home",
  chat: "Chat",
  notify: "Notify",
  class: "Class",
};

const HeaderInfo = ({ title }: { title: string }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const shouldShowBackButton = !Object.values(urlNotBack).includes(route.name);

  return (
    <View>
      <View style={styles.wrapperHeader}>
        {shouldShowBackButton && (
          <TouchableHighlight underlayColor="#DDDDDD" onPress={handleBack}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableHighlight>
        )}
        <Image
          source={require("../assets/Logo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperHeader: {
    width: "100%",
    padding: 10,
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  textTitle: {
    color: "#1b00be",
    fontSize: 20,
  },
});

export default HeaderInfo;
