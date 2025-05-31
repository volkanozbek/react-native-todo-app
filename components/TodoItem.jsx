import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

export default function TodoItem({ item, onDelete, onToggleComplete }) {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Animated.View style={[styles.deleteBox, { transform: [{ scale }] }]}>
          <Feather
            name="trash"
            size={24}
            color="#fff"
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
        <View style={styles.container}>
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={item.completed ? '#4cd964' : '#aaa'}
            style={styles.icon}
          />
          <Text style={[styles.text, item.completed && styles.completedText]}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteBox: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    width: 64,
    height: 56,
    alignSelf: 'center',
  },
});
