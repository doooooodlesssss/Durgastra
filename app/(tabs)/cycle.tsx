// src/redux/slices/cycleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cycles: [],
  currentCycle: null,
  predictions: [],
  settings: {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    notifications: true,
  },
  symptoms: [],
  moods: [],
  loading: false,
  error: null,
};

const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    setCycles: (state, action) => {
      state.cycles = action.payload;
    },
    addCycle: (state, action) => {
      state.cycles.push(action.payload);
    },
    updateCycle: (state, action) => {
      const index = state.cycles.findIndex(cycle => cycle.id === action.payload.id);
      if (index !== -1) {
        state.cycles[index] = action.payload;
      }
    },
    setCurrentCycle: (state, action) => {
      state.currentCycle = action.payload;
    },
    setPredictions: (state, action) => {
      state.predictions = action.payload;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    setMoods: (state, action) => {
      state.moods = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCycles,
  addCycle,
  updateCycle,
  setCurrentCycle,
  setPredictions,
  updateSettings,
  setSymptoms,
  setMoods,
  setLoading,
  setError,
} = cycleSlice.actions;

export default cycleSlice.reducer;

// src/services/cycleService.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const cycleService = {
  async getCycles() {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('cycles')
      .orderBy('startDate', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async addNewCycle(cycleData) {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const docRef = await firestore()
      .collection('users')
      .doc(userId)
      .collection('cycles')
      .add({
        ...cycleData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return {
      id: docRef.id,
      ...cycleData,
    };
  },

  async updateCycle(cycleId, updateData) {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    await firestore()
      .collection('users')
      .doc(userId)
      .collection('cycles')
      .doc(cycleId)
      .update({
        ...updateData,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    return {
      id: cycleId,
      ...updateData,
    };
  },

  calculatePredictions(cycles) {
    if (cycles.length === 0) return [];
    
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    );
    
    const lastCycle = sortedCycles[0];
    const avgLength = this.calculateAverageCycleLength(cycles);
    
    const predictions = [];
    let lastDate = new Date(lastCycle.startDate);
    
    for (let i = 0; i < 3; i++) {
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + avgLength);
      
      predictions.push({
        predictedStartDate: nextDate.toISOString(),
        probability: this.calculateProbability(cycles, avgLength),
      });
      
      lastDate = nextDate;
    }
    
    return predictions;
  },

  calculateAverageCycleLength(cycles) {
    if (cycles.length < 2) return 28;
    
    const lengths = [];
    for (let i = 1; i < cycles.length; i++) {
      const current = new Date(cycles[i].startDate);
      const prev = new Date(cycles[i - 1].startDate);
      const diff = Math.abs(current - prev) / (1000 * 60 * 60 * 24);
      lengths.push(diff);
    }
    
    return Math.round(lengths.reduce((a, b) => a + b) / lengths.length);
  },

  calculateProbability(cycles, avgLength) {
    if (cycles.length < 3) return 0.7;
    
    const deviations = [];
    for (let i = 1; i < cycles.length; i++) {
      const current = new Date(cycles[i].startDate);
      const prev = new Date(cycles[i - 1].startDate);
      const diff = Math.abs(current - prev) / (1000 * 60 * 60 * 24);
      deviations.push(Math.abs(diff - avgLength));
    }
    
    const avgDeviation = deviations.reduce((a, b) => a + b) / deviations.length;
    return Math.max(0.5, Math.min(0.95, 1 - (avgDeviation / avgLength)));
  },
};

// src/hooks/useCycles.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cycleService } from '../services/cycleService';
import {
  setCycles,
  setCurrentCycle,
  setPredictions,
  setLoading,
  setError,
} from '../redux/slices/cycleSlice';

export const useCycles = () => {
  const dispatch = useDispatch();
  const {
    cycles,
    currentCycle,
    predictions,
    settings,
    symptoms,
    moods,
    loading,
    error,
  } = useSelector(state => state.cycle);

  useEffect(() => {
    loadCycles();
  }, []);

  const loadCycles = async () => {
    try {
      dispatch(setLoading(true));
      const cycles = await cycleService.getCycles();
      dispatch(setCycles(cycles));
      
      if (cycles.length > 0) {
        const current = cycles[0];
        dispatch(setCurrentCycle(current));
        
        const predictions = cycleService.calculatePredictions(cycles);
        dispatch(setPredictions(predictions));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addNewCycle = async (startDate) => {
    try {
      dispatch(setLoading(true));
      const newCycle = await cycleService.addNewCycle({
        startDate,
        symptoms: [],
        moods: [],
      });
      
      const updatedCycles = [newCycle, ...cycles];
      dispatch(setCycles(updatedCycles));
      dispatch(setCurrentCycle(newCycle));
      
      const predictions = cycleService.calculatePredictions(updatedCycles);
      dispatch(setPredictions(predictions));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateCycleData = async (cycleId, updateData) => {
    try {
      dispatch(setLoading(true));
      const updatedCycle = await cycleService.updateCycle(cycleId, updateData);
      
      const updatedCycles = cycles.map(cycle =>
        cycle.id === cycleId ? updatedCycle : cycle
      );
      
      dispatch(setCycles(updatedCycles));
      if (currentCycle?.id === cycleId) {
        dispatch(setCurrentCycle(updatedCycle));
      }
      
      const predictions = cycleService.calculatePredictions(updatedCycles);
      dispatch(setPredictions(predictions));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    cycles,
    currentCycle,
    predictions,
    settings,
    symptoms,
    moods,
    loading,
    error,
    loadCycles,
    addNewCycle,
    updateCycleData,
  };
};

// src/components/CycleCalendar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCycles } from '../hooks/useCycles';

const CycleCalendar = () => {
  const { cycles, predictions, loading, addNewCycle } = useCycles();

  // Calendar rendering logic here
  // ... (I can provide the complete calendar implementation if needed)

  return (
    <View style={styles.container}>
      <Text>Calendar Component</Text>
    </View>
  );
};

// // src/components/CycleStats.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useCycles } from '../hooks/useCycles';

// const CycleStats = () => {
//   const { cycles, predictions, currentCycle } = useCycles();

//   return (
//     <View style={styles.container}>
//       <Text>Stats Component</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   // ... more styles
// });

// export default CycleStats;