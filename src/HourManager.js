import { useState, useEffect } from "react";
import "./HourManager.css";
import SubjectItem from './SubjectItem'
import Book from './Book'

function HourManager() {
    const [idCounterSubject, setIdCounterSubject] = useState(2);
    const [subjects, setSubjects] = useState([{id: 1, name: "Electroacústica"}, {id: 2, name: "Comunicación  "}]);

    const [idCounterUnit, setIdCounterUnit] = useState(1);
    const [units, setUnits] = useState([{id: 1, subjectId: 1, name: 1, hours: 40}]);

    const [inputSubjectName, setInputSubjectName] = useState("");

    const [bookEntries, setBookEntries] = useState([{subjectId: 1, unitId: 1, hours: 3, date: "2024-01-20"},{subjectId: 1, unitId: 1, hours: 3, date: "2024-01-20"}])



    const handleAddSubject = () => {
        let subject = {
            id: idCounterSubject + 1,
            name: inputSubjectName
        }

        setSubjects([...subjects, subject]);
        setIdCounterSubject(idCounterSubject + 1);
    }

    const handleAddUnit = (subjectId, name, hours) => {
        let unit = {
            id: idCounterUnit + 1,
            subjectId: subjectId,
            name: name,
            hours: hours
        }


        setUnits([...units, unit]);
        setIdCounterUnit(idCounterUnit + 1);

    }

    const handleDeleteUnit = (id) => {
        // Filter out the unit with the given id
        const updatedUnits = units.filter((unit) => unit.id !== id);

        // Update the state with the new array
        setUnits(updatedUnits);
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
        setBookEntries([...bookEntries, entry]);
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
                        <SubjectItem subject={subject} index={index} units={units} handleAddUnit={handleAddUnit} handleDeleteUnit={handleDeleteUnit} bookEntries={bookEntries}></SubjectItem>
                    ))}
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <h2>Registro de faltas</h2>
                </div>
                <div className="row">
                    <Book bookEntries={bookEntries} getSubjectNameById={getSubjectNameById} subjects={subjects} getUnitsBySubjectId={getUnitsBySubjectId} handleAddBookEntry={handleAddBookEntry}></Book>
                </div>
            </div>
        </div>
    );
}

export default HourManager;
