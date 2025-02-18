import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alertt, Alert } from "react-native";
import { AuthContext } from "../context/AuthorizationContext";
import axios from "axios";
import { TextInput,Button } from "react-native-paper";


export default function TaskDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [task, setTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${auth?.token}` },
    })
    .then(response =>{
        setTask(response.data);
        setNewTitle(response.data.title); 
        setNewDescription(response.data.description); 
      })
    .catch(error => console.error("Error fetching task:", error));
  }, []);

  const updateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      if (response.status === 200) {
        Alert.alert("Task Updated");
        setTask(response.data); 
      } else {
        throw new Error(response.data.error || "Failed to update task");
      }
    } catch (error) {
      console.error("Update Error:", error.message);
      Alert.alert("Error", error.message);
    }
  }

  const deleteTask = async (taskid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${taskid}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
  
      if (response.status == 204) {
        Alert.alert("Task Deleted");
        navigation.goBack();
      } else {
        throw new Error(response.data.error || "Failed to delete task");
      }
    } catch (error) {
      console.error("Delete Error:", error.message);
      Alert.alert("Error", error.message);
    }
  }
  return task ? (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        label="Title"
      />
      <TextInput
        style={styles.input}
        value={newDescription}
        onChangeText={setNewDescription}
        label="Description"
        multiline
      />
      <Button style={styles.btnstyle} mode="contained" onPress={()=>updateTask()} >
      Update
      </Button>
      <Button mode="contained" onPress={() => deleteTask(task?.id)} >
      Delete
      </Button>
    </View>
  ) : null;
}

const styles = StyleSheet.create({btnstyle:{marginBottom:10}, container: { flex: 1, padding: 20 },input: { borderWidth: 1, padding: 1, marginBottom: 10, borderRadius: 5 }, });
