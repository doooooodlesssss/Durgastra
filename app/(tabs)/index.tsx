import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; 

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C8B4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#1E1E1E',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#1E1E1E',
  },
});
