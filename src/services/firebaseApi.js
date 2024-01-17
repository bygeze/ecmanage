import { ref, get, set, update } from 'firebase/database';
import { database } from './firebase.js';

const api = {
    
    saveSubjectToFirebase: (uid, updatedSubjects, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const subjectsRef = ref(database, `users/${uid}/subjects`);
          set(subjectsRef, updatedSubjects);
      
          const idCounterRef = ref(database, `users/${uid}/idCounterSubject`);
          set(idCounterRef, updatedIdCounter);
        }
      },

      
    saveUnitToFirebase: (uid, updatedUnits, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const unitsRef = ref(database, `users/${uid}/units`);
          set(unitsRef, updatedUnits);
          
          if(updatedIdCounter != null) {
            const idCounterRef = ref(database, `users/${uid}/idCounterUnit`);
            set(idCounterRef, updatedIdCounter);
          }

        }
      },
      

    saveBookEntryToFirebase: (uid, updatedBookEntries, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const bookEntriesRef = ref(database, `users/${uid}/bookEntries`);
          set(bookEntriesRef, updatedBookEntries);
          if(updatedIdCounter != null) {
            const idCounterRef = ref(database, `users/${uid}/idCounterBookEntry`);
            set(idCounterRef, updatedIdCounter);
          }

        }
      },
      

    /*
     *   FETCHING DATA
     */

    fetchBookEntriesFromFirebase: (uid) => {
        const bookRef = ref(database, `users/${uid}/bookEntries`);
        
        // Return the promise directly
        return get(bookRef).then((snapshot) => {
            const data = snapshot.val();

            return data || []; // Return an empty array if data is falsy
        });
    },

    fetchIdCounterBookEntriesFromFirebase: (uid) => {
        const idCounterRef = ref(database, `users/${uid}/idCounterBookEntries`);

        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return an empty array if data is falsy
        });        
    },
      
    fetchSubjectsFromFirebase: (uid) => {
        const subjectsRef = ref(database, `users/${uid}/subjects`);
        
        // Return the promise directly
        return get(subjectsRef).then((snapshot) => {
            const data = snapshot.val();
            return data || []; // Return an empty array if data is falsy
        });
    },

    fetchIdCounterSubject: (uid) => {
        const idCounterRef = ref(database, `users/${uid}/idCounterSubject`);
        
        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return an empty array if data is falsy
        });
    },

    fetchUnitsFromFirebase: (uid) => {
        const subjectsRef = ref(database, `users/${uid}/units`);
        
        // Return the promise directly
        return get(subjectsRef).then((snapshot) => {
            const data = snapshot.val();
            console.log(data);
            return data || []; // Return an empty array if data is falsy
        });
    },

    fetchIdCounterUnitFromFirebase: (uid) => {
        const idCounterRef = ref(database, `users/${uid}/idCounterUnit`);
        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return a 0 if data is falsy
        });        
    }
    
}

export default api;