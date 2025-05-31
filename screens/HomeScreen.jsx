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
  const { todos, addTodo, removeTodo } = useContext(TodoContext);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = () => {
    if (!input.trim()) {
      Alert.alert('Hata', 'Lütfen geçerli bir todo girin!');
      return;
    }
    addTodo(input);
    Alert.alert('Bilgi', `"${input}" adlı todo eklendi!`);
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
          />
        )}
        ListEmptyComponent={<Text style={styles.text}>No task yet!</Text>}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Add new task..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
              autoFocus
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />
            <View style={styles.modalButtons}>
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color="#FF3B30"
              />
              <Button
                title="Add Task"
                onPress={handleAdd}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
