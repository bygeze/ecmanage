import { useState, useEffect } from "react";
import "./HourManager.css";
import SubjectItem from './SubjectItem'
import Book from './Book'
import { ref, get, set, update, onValue, remove } from 'firebase/database';
import { database } from './firebase.js';


function HourManager({lsAppKey}) {
    const [idCounterSubject, setIdCounterSubject] = useState(0);
    const [subjects, setSubjects] = useState([]);

    const [idCounterUnit, setIdCounterUnit] = useState(0);
    const [units, setUnits] = useState([]);

    const [inputSubjectName, setInputSubjectName] = useState("");

    const [idCounterBookEntries, setIdCounterBookEntries] = useState(0);
    const [bookEntries, setBookEntries] = useState([]);

    const [uid, setUid] = useState(localStorage.getItem(lsAppKey + "-uid"));

    useEffect(() => {        
        // get data from db
        fetchIdCounterSubject().then((data) => {
            setIdCounterSubject(data);
        });

        fetchSubjectsFromFirebase().then((data) => {
            setSubjects(data);
        });

        fetchUnitsFromFirebase().then((data) => {
            setUnits(data);
        });

        fetchIdCounterUnitFromFirebase().then((data) => {
            setIdCounterUnit(data);
        });   
        
        fetchBookEntriesFromFirebase().then((data) => {
            setBookEntries(data);
        });

        fetchIdCounterBookEntriesFromFirebase().then((data) => {
            setIdCounterBookEntries(data);
        });

    }, []);

    const saveSubjectToFirebase = (updatedSubjects, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const subjectsRef = ref(database, `users/${uid}/subjects`);
          set(subjectsRef, updatedSubjects);
      
          const idCounterRef = ref(database, `users/${uid}/idCounterSubject`);
          set(idCounterRef, updatedIdCounter);
        }
      };

      const saveUnitToFirebase = (updatedUnits, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const unitsRef = ref(database, `users/${uid}/units`);
          set(unitsRef, updatedUnits);
      
          const idCounterRef = ref(database, `users/${uid}/idCounterUnit`);
          set(idCounterRef, updatedIdCounter);
        }
      };

      const removeUnitFromFirebase = (id) => {
        if (uid) {
          // Find the index of the unit with the specified id
          const unitIndex = units.findIndex((unit) => unit.id === id);
      
          if (unitIndex !== -1) {
            const unitRef = ref(database, `users/${uid}/units/${unitIndex}`);
            
            // Remove the unit from Firebase
            set(unitRef, null);
      
            // Update the state by filtering out the unit with the given id
            const updatedUnits = units.filter((unit) => unit.id !== id);
            setUnits(updatedUnits);
          }
        }
      }
      

      const saveBookEntryToFirebase = (updatedBookEntries, updatedIdCounter) => {
        // Guardar en   Firebase asociado al UID
        if (uid) {
          const bookEntriesRef = ref(database, `users/${uid}/bookEntries`);
          set(bookEntriesRef, updatedBookEntries);
      
          const idCounterRef = ref(database, `users/${uid}/idCounterBookEntry`);
          set(idCounterRef, updatedIdCounter);
        }
      };
    
      const updateDataFromFirebase = (updatedPeople) => {
        if (uid && updatedPeople.length > 0) {
          const peopleObject = updatedPeople.reduce((acc, person) => {
            acc[person.id] = person;
            return acc;
          }, {});
      
          const peopleRef = ref(database, `users/${uid}/people`);
      
          // Actualizar datos de personas
          update(peopleRef, peopleObject);
        }
      };

    const fetchBookEntriesFromFirebase = () => {
        const bookRef = ref(database, `users/${uid}/bookEntries`);
        
        // Return the promise directly
        return get(bookRef).then((snapshot) => {
            const data = snapshot.val();
            return data || []; // Return an empty array if data is falsy
        });
    };

    const fetchIdCounterBookEntriesFromFirebase = () => {
        const idCounterRef = ref(database, `users/${uid}/idCounterBookEntries`);

        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return an empty array if data is falsy
        });        
    }
      
    const fetchSubjectsFromFirebase = () => {
        const subjectsRef = ref(database, `users/${uid}/subjects`);
        
        // Return the promise directly
        return get(subjectsRef).then((snapshot) => {
            const data = snapshot.val();
            return data || []; // Return an empty array if data is falsy
        });
    };

    const fetchIdCounterSubject = () => {
        const idCounterRef = ref(database, `users/${uid}/idCounterSubject`);
        
        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return an empty array if data is falsy
        });
    };

    const fetchUnitsFromFirebase = () => {
        const subjectsRef = ref(database, `users/${uid}/units`);
        
        // Return the promise directly
        return get(subjectsRef).then((snapshot) => {
            const data = snapshot.val();
            return data || []; // Return an empty array if data is falsy
        });
    };


    const fetchIdCounterUnitFromFirebase = () => {
        const idCounterRef = ref(database, `users/${uid}/idCounterUnit`);

        // Return the promise directly
        return get(idCounterRef).then((snapshot) => {
            const data = snapshot.val();
            return data || 0; // Return an empty array if data is falsy
        });        
    }

    const handleAddSubject = () => {
        let subject = {
            id: idCounterSubject + 1,
            name: inputSubjectName
        }

        setSubjects((prevSubjects) => [...prevSubjects, subject]);
        setIdCounterSubject((prevIdCounter) => prevIdCounter + 1);

        saveSubjectToFirebase([...subjects, subject], idCounterSubject + 1); 

    }

    const handleAddUnit = (subjectId, name, hours) => {
        let unit = {
            id: idCounterUnit + 1,
            subjectId: subjectId,
            name: name,
            hours: hours
        }

        setUnits((prevUnits) => [...prevUnits, unit]);
        setIdCounterUnit((prevIdCounter) => prevIdCounter + 1);

        saveUnitToFirebase([...units, unit], idCounterUnit + 1); 
    }

    const handleDeleteUnit = (id) => {
        // Filter out the unit with the given id
        //const updatedUnits = units.filter((unit) => unit.id !== id);

        // Update the state with the new array
        //setUnits(updatedUnits);

        removeUnitFromFirebase(id);
    }

    const handleInputSubjectName = (e) => {
        setInputSubjectName(e.target.value);
    }

    const getSubjectNameById = (id) => {
        const subject = subjects.find((subject) => subject.id === id);
        return subject ? subject.name : "Subject not found";
    }

    const getUnitsBySubjectId = (subjectId) => {
        return units.filter((unit) => unit.subjectId === subjectId);
    };

    const handleAddBookEntry = (entry) => {
        entry.id = idCounterBookEntries + 1;

        setBookEntries((prevBookEntries) => [...prevBookEntries, entry]);
        setIdCounterBookEntries((prevIdCounter) => prevIdCounter + 1);

        saveBookEntryToFirebase([...bookEntries, entry], idCounterBookEntries + 1); 
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="row">
                    <h2>Materias</h2>
                </div>
                <div className="row mb-2">
                    <div className="input-group">
                        <input className="form-control" onChange={handleInputSubjectName} placeholder="Escribe el nombre de la materia aquí" type="text" name="" id="" />
                        <button className="btn btn-primary" onClick={handleAddSubject}>Añadir materia</button>
                    </div>

                </div>
                <div id="subject-list">
                    {subjects.map((subject, index) => (
                        <SubjectItem key={index} subject={subject} index={index} units={units} handleAddUnit={handleAddUnit} handleDeleteUnit={handleDeleteUnit} bookEntries={bookEntries}></SubjectItem>
                    ))}
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <h2>Registro</h2>
                </div>
                <div className="row">
                    <Book bookEntries={bookEntries} getSubjectNameById={getSubjectNameById} subjects={subjects} getUnitsBySubjectId={getUnitsBySubjectId} handleAddBookEntry={handleAddBookEntry}></Book>
                </div>
            </div>
        </div>
    );
}

export default HourManager;
