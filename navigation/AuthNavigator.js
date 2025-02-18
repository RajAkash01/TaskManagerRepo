import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import { AuthContext } from "../context/AuthorizationContext";
import AddTaskScreen from "../screens/AddTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { token } = useContext(AuthContext);
  const [intialscreen,setintialscreen] = useState("Login")
  useEffect(()=>{
    if(token){
      setintialscreen("Home")
    }
  },[token])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={intialscreen}>
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
