import { AnimatedBottomBar, BottomBarProvider } from '@/components/AnimatedBottomBar';
import { TodoList } from '@/components/TodoList';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTodoList } from '@/hooks/useTodoList';
import { StyleSheet, View } from 'react-native';

export default function HomePage() {
  const colorScheme = useColorScheme();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoList();

  const handlePlusPress = () => {
    console.log('Plus button pressed!');
    // You can add navigation or other logic here
  };

  const handleSubmitInput = (text: string) => {
    console.log('HomePage - Input submitted:', text);
    console.log('HomePage - Current todos count before adding:', todos.length);
    addTodo(text);
    console.log('HomePage - Current todos count after adding:', todos.length + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'
    },
  });

  return (
    <BottomBarProvider 
      onSubmitInput={handleSubmitInput}
      activeColor="#007AFF"
      inputPlaceholder="What did you do today ?"
    >
      <View style={styles.container}>
        <TodoList 
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
        
        <AnimatedBottomBar
          onPressPlus={handlePlusPress}
          activeColor="#007AFF"
          inactiveColor="#8E8E93"
        />
      </View>
    </BottomBarProvider>
  );
}
