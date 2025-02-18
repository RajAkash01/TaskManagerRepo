import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {
    try {
      const response = await axios.post(
       "http://localhost:5000/auth/signup",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        Alert.alert("Success", "Account created!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup Failed", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button mode="contained"  onPress={handleSignup} >
      Sign Up
      </Button>
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>Already have an account? Log in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 1, marginBottom: 10, borderRadius: 5 },
  link: { marginTop: 10, color: "blue", textAlign: "center" },
});
