import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, FlatList, Text, RefreshControl,StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthorizationContext";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";


export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const auth = useContext(AuthContext);

  const fetchTasks = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get("https://taskmangerbackend-hsbd.onrender.com/tasks", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      if(response.data?.length > 0 ){
        setTasks(response.data);
      }else{
        setTasks([]);
      }
      
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data?.message || error.message);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks(); 
    }, [])
  )
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        ListEmptyComponent={() =>
          <View style={styles.emptytext} >
            <Text>No tasks found</Text>
          </View>
        }
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text> <Text style={styles.textstyle}>Title:</Text> {item?.title}</Text>
            <Text> <Text style={styles.textstyle}>Description:</Text> {item?.description}</Text>
            <Button style={{marginTop:10}} mode="contained"  onPress={() => navigation.navigate("TaskDetails", { id: item._id })} >
            Details
            </Button>
          </View>
        )}
      />
      <Button mode="contained"  onPress={() => navigation.navigate("AddTask")} >
      Add Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  textstyle:{fontWeight:'700'},
  task: { padding: 15, borderWidth: 1, marginBottom: 10,borderRadius:10 },
  emptytext:{flex:1,justifyContent:'center',alignItems:'center'}
});