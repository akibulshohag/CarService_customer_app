import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";

//screen
import { TabNav } from "./navigation/TabNavigator";
import AvailableCar from "./screens/AvailableCarScreen";
import CarDetails from "./screens/CarDetailsScreen";
import ConfirmOrder from "./screens/ConfirmOrderScreen";
import LoginScreen from "./screens/LoginScreen";
import Notification from "./screens/NotificationScreen";
import PushNotification from "./screens/PushNotification";
import SearchCar from "./screens/SearchScreen";
import SignupScreen from "./screens/SignupScreen";
import Support from "./screens/SupportScreen";
import TermAndCondition from "./screens/TermAndConditionScreen";
import UpdateProfile from "./screens/UpdateprofileScreen";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#F9F9F9",
    text: "#fff",
  },
};

export default function App() {
  const scheme = useColorScheme();
  // console.log(".........", scheme);
  //theme={ scheme === 'dark' ? DarkTheme : MyTheme}

  const [Token, setToken] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then((res) => {
        if (res) {
          setToken(res);
        } else {
          setToken("noToken");
        }
      })
      .catch((err) => SecureStore.deleteItemAsync("token"));
  }, []);

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : MyTheme}>
      {Token === "noToken" ? (
        <Stack.Navigator initialRouteName={"LoginScreen"}>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ header: () => null }}
          />

          <Stack.Screen
            name="TabNav"
            component={TabNav}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="AvailableCar"
            component={AvailableCar}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      ) : (
        <>
          {Token ? (
            <Stack.Navigator initialRouteName={"TavNab"}>
              <Stack.Screen
                name="TabNav"
                component={TabNav}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
              />

              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="AvailableCar"
                component={AvailableCar}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="CarDetails"
                component={CarDetails}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="ConfirmOrder"
                component={ConfirmOrder}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="Support"
                component={Support}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="TermAndCondition"
                component={TermAndCondition}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="PushNotification"
                component={PushNotification}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="SearchCar"
                component={SearchCar}
                options={{ header: () => null }}
              />
            </Stack.Navigator>
          ) : null}
        </>
      )}

      <FlashMessage
        style={{ alignItems: "center" }}
        duration={3000}
        position="top"
      />
    </NavigationContainer>
  );
}
