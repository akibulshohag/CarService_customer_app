import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MyBookingScreen from "../screens/MyBooking";
import Profile from "../screens/ProfileScreen";
export function TabNav() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              Home
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <AntDesign
              name="home"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyBookingScreen"
        component={MyBookingScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              My Booking
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="car"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FCB042" : "#000", fontSize: 12 }}>
              {" "}
              Profile
            </Text>
          ),

          // unmountOnBlur: true,
          header: () => null,

          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="user"
              size={25}
              color={focused ? "#FCB042" : "#000"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
