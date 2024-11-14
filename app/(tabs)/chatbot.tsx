import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot Screen</Text>
      <Text style={styles.description}>
        This is the screen where you can interact with the chatbot.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F78A8D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1E1E1E',
  },
});