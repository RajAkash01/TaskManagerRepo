import React, { useState, useContext } from "react";
import { View,  Text,StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthorizationContext";
import axios from "axios";
import { Button,TextInput } from "react-native-paper";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://taskmangerbackend-hsbd.onrender.com/auth/login", 
        { email, password }, 
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        auth?.login(response.data.token);
        if (response.data.token) {
          navigation.replace("Home");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      Alert.alert("Login Failed", errorMessage);
    }
  };
  ;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained"  onPress={()=>handleLogin()} >
        Login
      </Button>
      <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>Don't have an account? Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 1, marginBottom: 10, borderRadius: 5 },
  link: { marginTop: 10, color: "blue", textAlign: "center" },
});