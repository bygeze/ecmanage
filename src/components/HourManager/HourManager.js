import { useState, useEffect } from "react";
import "./HourManager.css";
import SubjectItem from '../SubjectItem/SubjectItem'
import Book from '../Book/Book'
import api from '../../services/firebaseApi';

function HourManager({lsAppKey}) {
    const [idCounterSubject, setIdCounterSubject] = useState(0);
    const [subjects, setSubjects] = useState([]);

    const [idCounterUnit, setIdCounterUnit] = useState(0);
    const [units, setUnits] = useState([]);

    const [inputSubjectName, setInputSubjectName] = useState("");

    const [idCounterBookEntries, setIdCounterBookEntries] = useState(0);
    const [bookEntries, setBookEntries] = useState([]);

    const [uid] = useState(localStorage.getItem(lsAppKey + "-uid"));

    useEffect(() => {           
        // get data from db
        api.fetchIdCounterSubject(uid).then((data) => {
            setIdCounterSubject(data);
        });

        api.fetchSubjectsFromFirebase(uid).then((data) => {
            setSubjects(data);
        });

        api.fetchUnitsFromFirebase(uid).then((data) => {
            setUnits(data);
        });

        api.fetchIdCounterUnitFromFirebase(uid).then((data) => {
            setIdCounterUnit(data);
        });   
        
        api.fetchBookEntriesFromFirebase(uid).then((data) => {
            setBookEntries(data);
        });

        api.fetchIdCounterBookEntriesFromFirebase(uid).then((data) => {
            setIdCounterBookEntries(data);
        });

    });

    const handleAddSubject = () => {
        let subject = {
            id: idCounterSubject + 1,
            name: inputSubjectName
        }

        setSubjects((prevSubjects) => [...prevSubjects, subject]);
        setIdCounterSubject((prevIdCounter) => prevIdCounter + 1);

        api.saveSubjectToFirebase(uid, [...subjects, subject], idCounterSubject + 1); 

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

        api.saveUnitToFirebase(uid, [...units, unit], idCounterUnit + 1); 
    }

    const handleAddBookEntry = (entry) => {
        // add entry id
        entry.id = idCounterBookEntries + 1;

        //  
        setBookEntries((prevBookEntries) => [...prevBookEntries, entry]);
        setIdCounterBookEntries((prevIdCounter) => prevIdCounter + 1);

        api.saveBookEntryToFirebase(uid, [...bookEntries, entry], idCounterBookEntries + 1); 
    }

    const handleDeleteUnit = (id) => {
        //Filter out the unit with the given id
        const updatedUnits = units.filter((unit) => unit.id !== id);

        //Update the state with the new array
        setUnits(updatedUnits);
        api.saveUnitToFirebase(uid, updatedUnits, null);
    }

    const handleDeleteBookEntry = (id) => {
        //Filter out the unit with the given id
        const updatedBookEntries = bookEntries.filter((book) => book.id !== id);

        //Update the state with the new array
        setBookEntries(updatedBookEntries);
        api.saveBookEntryToFirebase(uid, updatedBookEntries, null);
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

    return (
        <div className="row m-0">
            <div className="col-12 col-md-5 col-lg-6 p-0 p-md-2">
                <div className="row">
                        <h3 className="app-title">Mis materias</h3>
                </div>
                <div className="subjects-container p-2 mb-2">
                    <div className="row mb-2">
                        <span className="mb-1">Añadir una materia nueva</span>
                        <div className="input-group">
                            <input className="form-control" onChange={handleInputSubjectName} placeholder="" type="text" name="" id="" />
                            <button className="btn btn-primary" onClick={handleAddSubject}>Añadir materia</button>
                        </div>
                    </div>
                </div>
                <div id="subject-list">
                    {subjects.map((subject, index) => (
                        <SubjectItem key={index} subject={subject} index={index} units={units} handleAddUnit={handleAddUnit} handleDeleteUnit={handleDeleteUnit} bookEntries={bookEntries}></SubjectItem>
                    ))}
                </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 p-0 p-md-2">
                <div className="row">
                    <h3 className="app-title">Registro</h3>
                </div>
                <div className="row">
                    <Book bookEntries={bookEntries} handleDeleteBookEntry={handleDeleteBookEntry} getSubjectNameById={getSubjectNameById} subjects={subjects} getUnitsBySubjectId={getUnitsBySubjectId} handleAddBookEntry={handleAddBookEntry}></Book>
                </div>
            </div>
        </div>
    );
}

export default HourManager;
