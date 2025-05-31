import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TodoItem({ item, onDelete }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.title}</Text>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Ionicons
          name="trash"
          size={24}
          color="#FF3B30"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
