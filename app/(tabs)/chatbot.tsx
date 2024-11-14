import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>chatbot screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F78A8D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1E1E1E',
  },
});
