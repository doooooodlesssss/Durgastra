import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    query,
    where,
    getDocs 
  } from 'firebase/firestore';
  import { db } from './firebase.config';
  
  export const periodService = {
    // Save period data
    async savePeriodData(userId, periodData) {
      try {
        const userDoc = doc(db, 'users', userId);
        const periodDoc = doc(collection(userDoc, 'periodData'));
        
        await setDoc(periodDoc, {
          ...periodData,
          timestamp: new Date(),
          userId
        });
        
        return periodDoc.id;
      } catch (error) {
        throw new Error(`Error saving period data: ${error.message}`);
      }
    },
  
    // Get user's period history
    async getPeriodHistory(userId) {
      try {
        const userDoc = doc(db, 'users', userId);
        const periodCollection = collection(userDoc, 'periodData');
        const q = query(periodCollection, where('userId', '==', userId));
        
        const querySnapshot = await getDocs(q);
        const periodHistory = [];
        
        querySnapshot.forEach((doc) => {
          periodHistory.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        return periodHistory;
      } catch (error) {
        throw new Error(`Error getting period history: ${error.message}`);
      }
    },
  
    // Update cycle data
    async updateCycleData(userId, cycleData) {
      try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
          cycleLength: cycleData.cycleLength,
          lastPeriod: cycleData.lastPeriod,
          updatedAt: new Date()
        });
      } catch (error) {
        throw new Error(`Error updating cycle data: ${error.message}`);
      }
    },
  
    // Save mood data
    async saveMoodData(userId, moodData) {
      try {
        const userDoc = doc(db, 'users', userId);
        const moodDoc = doc(collection(userDoc, 'moodData'));
        
        await setDoc(moodDoc, {
          ...moodData,
          timestamp: new Date(),
          userId
        });
        
        return moodDoc.id;
      } catch (error) {
        throw new Error(`Error saving mood data: ${error.message}`);
      }
    }
  };
  