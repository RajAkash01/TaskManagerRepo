import React, { useState, useContext } from "react";
import { View, Text,  StyleSheet, Alert } from "react-native";
import { AuthContext } from "../context/AuthorizationContext";
import axios from "axios";
import { TextInput,Button } from "react-native-paper";


export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const auth = useContext(AuthContext);

  const addTask = async () => {
    try {
        const response = await axios.post(
          "https://taskmangerbackend-hsbd.onrender.com/tasks",
          { title, description },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
    
        console.log("Logging response:", response.data);
        if(response.status == 201 && response.data){
            Alert.alert("Success", "Task created!");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>
      <TextInput label="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput label="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <Button mode="contained" onPress={()=>addTask()} >
      Create Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 1, marginBottom: 10, borderRadius: 5 },
});
