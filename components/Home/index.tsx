import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const ROLES = {
  3: "Sinh viên",
  2: "Giang viên",
};

const HomeScreen = () => {
  const [fullName, setFullName] = useState("");
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("avatar");

  useEffect(() => {
    const updateData = async () => {
      const fullName = await AsyncStorage.getItem("fullName");
      const code = await AsyncStorage.getItem("code");
      const role = await AsyncStorage.getItem("role");
      const email = await AsyncStorage.getItem("email");
      const avatar = await AsyncStorage.getItem("avatar");

      setFullName(fullName || "");
      setCode(code || "");
      if (role === "2") setRole("Giảng viên");
      else setRole("Sinh viên");
      setEmail(email || "");
      setAvatar(avatar || "");
    };
    updateData();
  }, []);

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Image
          source={require("../../assets/bg-hoaanhdao.jpg")}
          style={{ width: "100%", height: 250 }}
        />
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 200,
            transform: [{ translateX: -100 }, { translateY: -30 }],
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: avatar,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 9999,
              }}
            />
            <Text
              style={{
                marginTop: 10,
                fontWeight: "600",
                color: "#1b00be",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              {fullName}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 17 }}>ID:</Text>
          <Text style={{ fontSize: 17 }}>{code}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 17 }}>Email:</Text>
          <Text style={{ fontSize: 17 }}>{email}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 17 }}>Chức vụ:</Text>
          <Text style={{ fontSize: 17 }}>{role}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
