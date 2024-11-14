import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MINDFULLNESS screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C8B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1E1E1E',
  },
});
