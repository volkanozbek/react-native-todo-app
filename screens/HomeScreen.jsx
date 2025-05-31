import React, { useContext, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoItem from '../components/TodoItem';
import { Ionicons } from '@expo/vector-icons';

import { TodoContext } from '../context/TodoContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { todos, addTodo, removeTodo, toggleComplete } =
    useContext(TodoContext);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    if (!input.trim()) {
      Alert.alert('Error', 'Please enter a task!');
      return;
    }
    addTodo(input);
    Alert.alert('Success', 'Task added successfully!');
    setInput('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="add-circle"
            size={32}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={removeTodo}
            onToggleComplete={toggleComplete}
          />
        )}
        ListEmptyComponent={<Text style={styles.text}>No task yet!</Text>}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Icon */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Task</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close"
                  size={24}
                  color="#FF0B55"
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Input */}
            <TextInput
              placeholder="Add new task..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
              autoFocus
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />

            {/* Add Button */}
            <TouchableOpacity
              style={styles.addTaskButton}
              onPress={handleAdd}
            >
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: -45,
    right: -30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    elevation: 4,
    shadowColor: '#FF0B55',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  addTaskButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
