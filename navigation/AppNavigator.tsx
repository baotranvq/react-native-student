import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MarkScreen from "../screens/Student/Mark";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Account from "../components/Account";
import HomeScreen from "../components/Home";
import SubjectDetail from "../screens/Student/Mark/components/SubjectDetail";
import Notify from "../screens/Student/Notify";
import ChatScreen from "../screens/Chat";
import Fourm from "../screens/Forum";
import Class from "../screens/Lecturer/Class";
import GradeEntry from "../screens/Lecturer/GradeEntry";
import GradeEntryDetail from "../screens/Lecturer/GradeEntry/components/GradeEntryDetail";
import GradeExport from "../screens/Lecturer/GradeExport";
import EnterGradeCSV from "../screens/Lecturer/EnterGradeCSV";
import SearchStudent from "../screens/Lecturer/SearchStudent";
import NewPost from "../screens/NewPost";

const ROLES = {
  student: 3,
  teacher: 2,
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const screenOptions = (): BottomTabNavigationOptions => ({
  tabBarShowLabel: false,
  headerShown: false,
  tabBarActiveTintColor: "#ffffff",
  tabBarInactiveTintColor: "#c0c0c0",
  tabBarStyle: {
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#1b00be",
  },
});

const LecturerNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Class"
      component={Class}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="class" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Notify"
      component={Notify}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications-active" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const StudentNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Mark"
      component={MarkScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="bookmark" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Notify"
      component={Notify}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="notifications-active" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const getUserRole = async () => {
  try {
    const role = (await AsyncStorage.getItem("role")) as string;
    return Number.parseInt(role);
  } catch (error) {
    console.log("Error getting user role from token:", error);
    return 0;
  }
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");

      if (token) {
        let role = await getUserRole();
        setRole(role);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const renderNavigators = () => (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="GradeEntry" component={GradeEntry} />
      <Stack.Screen name="GradeEntryDetail" component={GradeEntryDetail} />
      <Stack.Screen name="GradeExport" component={GradeExport} />
      <Stack.Screen name="EnterGrade" component={EnterGradeCSV} />
      <Stack.Screen name="SearchStudent" component={SearchStudent} />
      <Stack.Screen name="Forum" component={Fourm} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetail} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </>
  );

  const renderScreens = () => {
    if (role === ROLES.teacher) {
      return (
        <>
          <Stack.Screen
            name="LecturerNavigator"
            component={LecturerNavigator}
          />
          <Stack.Screen name="StudentNavigator" component={StudentNavigator} />
          {renderNavigators()}
        </>
      );
    } else if (role === ROLES.student) {
      return (
        <>
          <Stack.Screen name="StudentNavigator" component={StudentNavigator} />
          <Stack.Screen
            name="LecturerNavigator"
            component={LecturerNavigator}
          />
          {renderNavigators()}
        </>
      );
    } else {
      return (
        <>
          {renderNavigators()}
          <Stack.Screen
            name="LecturerNavigator"
            component={LecturerNavigator}
          />
          <Stack.Screen name="StudentNavigator" component={StudentNavigator} />
        </>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading ....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
