import React from "react";
import { View, Text, TextInput, Button, StyleSheet, _View } from "react-native";

const TaskInput = () => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Nova Tarefa</Text>
      <TextInput style={styles.label} placeholder="Título da tarefa" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {},
});
