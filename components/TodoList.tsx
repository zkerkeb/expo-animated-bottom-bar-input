import { TodoItem as TodoItemType } from '@/hooks/useTodoList';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeOutUp
} from 'react-native-reanimated';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: TodoItemType[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, onToggleTodo }: TodoListProps) {
  const colorScheme = useColorScheme();

  const renderTodoItem = ({ item, index }: { item: TodoItemType; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 30).springify()}
      exiting={FadeOutUp.springify()}
      key={item.id}
    >
      <TodoItem
        item={item}
        onToggle={onToggleTodo}
      />
    </Animated.View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '500',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 15,
      color: colorScheme === 'dark' ? '#8E8E93' : '#8E8E93',
      textAlign: 'center',
      lineHeight: 20,
    },
    listContainer: {
      paddingTop: 8,
      paddingBottom: 120, // Space for the bottom bar
    },
    header: {
      paddingHorizontal: 24,
      paddingTop: 8,
      paddingBottom: 16,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 15,
      color: colorScheme === 'dark' ? '#8E8E93' : '#8E8E93',
      fontWeight: '400',
    },
  });

  if (todos.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Todo List</Text>
          <Text style={styles.headerSubtitle}>Tap the + button to add your first task</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>✨</Text>
          <Text style={styles.emptyTitle}>Ready to get started?</Text>
          <Text style={styles.emptySubtitle}>
            Add your first task using the input field below
          </Text>
        </View>
      </View>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
        <Text style={styles.headerSubtitle}>
          {completedCount} of {totalCount} completed
        </Text>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false} // Important for animations
      />
    </View>
  );
} 