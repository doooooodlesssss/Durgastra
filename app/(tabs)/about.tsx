import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function MindfulnessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>
          What's your biggest fear right now, and how is it holding you back? Write about one step you can take to face it head-on.
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Check out today's mindfulness challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Join a new support group</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>Check out these articles!</Text>
        <View style={styles.articleGrid}>
          <View style={styles.articleCard}>
            <Text style={styles.articleCardText}>Lorem ipsum dolor sit amet</Text>
          </View>
          <View style={styles.articleCard}>
            <Text style={styles.articleCardText}>Consectetur adipiscing elit</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C8B4',
    padding: 20,
  },
  promptContainer: {
    backgroundColor: '#8194F2',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: '#1E1E1E',
    fontSize: 14,
    textAlign: 'center',
  },
  articleContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  articleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    marginBottom: 12,
  },
  articleCardText: {
    fontSize: 14,
  },
});