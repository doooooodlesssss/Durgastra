import React, { useState } from 'react';
import { StyleSheet, View, Text, Slider } from 'react-native';

const MoodTrackingScreen = () => {
  const [mood, setMood] = useState('Calm');

  const handleMoodChange = (value) => {
    if (value <= 0.2) {
      setMood('Sad');
    } else if (value <= 0.4) {
      setMood('Tired');
    } else if (value <= 0.6) {
      setMood('Anxious');
    } else if (value <= 0.8) {
      setMood('Calm');
    } else {
      setMood('Happy');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.moodContainer}>
        <Text style={styles.moodText}>Today I feel</Text>
        <View style={styles.moodIcon}>
          <Text style={styles.moodIconText}>😐</Text>
        </View>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        onValueChange={handleMoodChange}
      />
      <Text style={styles.moodText}>{mood}</Text>
      <View style={styles.weekView}>
        <View style={styles.dayView}>
          <Text style={styles.dayText}>Tue</Text>
          <Text style={styles.dayText}>01</Text>
        </View>
        <View style={styles.dayView}>
          <Text style={styles.dayText}>Wed</Text>
          <Text style={styles.dayText}>02</Text>
        </View>
        <View style={styles.dayView}>
          <Text style={styles.dayText}>Thu</Text>
          <Text style={styles.dayText}>03</Text>
        </View>
        <View style={[styles.dayView, styles.selectedDay]}>
          <Text style={styles.dayText}>Fri</Text>
          <Text style={styles.dayText}>04</Text>
        </View>
        <View style={[styles.dayView, styles.selectedDay]}>
          <Text style={styles.dayText}>Sat</Text>
          <Text style={styles.dayText}>05</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C8B4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  moodText: {
    fontSize: 18,
    marginRight: 12,
    color: '#1E1E1E',
  },
  moodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodIconText: {
    fontSize: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  dayView: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  selectedDay: {
    backgroundColor: '#F27474',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default MoodTrackingScreen;