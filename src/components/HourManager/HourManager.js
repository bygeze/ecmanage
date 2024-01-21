import { useState, useEffect } from "react";
import "./HourManager.css";
import SubjectItem from '../SubjectItem/SubjectItem'
import Book from '../Book/Book'
import api from '../../services/firebaseApi';
import pgApi from '../../services/pgApi';

function HourManager({lsAppKey}) {
    const [subjects, setSubjects] = useState([]);

    const [units, setUnits] = useState([]);

    const [inputSubjectName, setInputSubjectName] = useState("");

    const [bookEntries, setBookEntries] = useState([]);

    const [uid] = useState(localStorage.getItem(lsAppKey + "-uid"));

    useEffect(() => {           
        pgApi.fetchSubjects(uid).then((data) => {
            setSubjects(data);
        }); 

        pgApi.fetchUnits(uid).then((data) => {
            setUnits(data);
        }); 

        pgApi.fetchBookEntries(uid).then((data) => {
            setBookEntries(data);
        });

    }, [uid]);

    const handleAddSubject = () => {
        let subject = {
            name: inputSubjectName,
            bg_color: "#c7c7c7",
            user_uid: uid,
            collapsed: false,
        }

        pgApi.createSubject(subject).then((a) => {
            if(a) {
                handleInputSubjectName(null, "");
                setSubjects([...subjects, a.rows[0]])
            }
        })
        
    }

    const handleDeleteSubject = (id) => {
        pgApi.deleteSubject(id).then((a) => {
            if(a) {
                const updatedSubjects = subjects.filter((subject) => subject.subject_id !== id);
                setSubjects(updatedSubjects);
            }
        })
    }

    const handleAddUnit = (subject_id, name, hours) => {
        let unit = {
            subject_id: subject_id,
            name: name,
            hours: hours,
            user_uid: uid
        }

        pgApi.createUnit(unit).then((a) => {
            if(a) {
                setUnits([...units, a.rows[0]])
                return true;
            }
        });

        return true;
    }

    const handleAddBookEntry = (entry) => {
        entry.user_uid = uid;
        pgApi.createBookEntry(entry).then((a) => {
            if(a) {
                setBookEntries([...bookEntries, a.rows[0]]);
                return true;
            }
        });

        return true;
    }

    const handleEditSubjectColor = (id, color) => {
        const updateData = {
            bg_color: color,
        }

        handleEditSubject(id, updateData);
        return true;
    };

    const handleEditSubject = (id, updateData) => {
        const updatedSubjects = pgApi.updateSubject(id, updateData, uid).then((a) => {
            if(a) {
                const updated = subjects.filter((subject) => subject.subject_id !== a.subject_id);
                      updated.push(a);
                return updated;
            }
        });

        return updatedSubjects;
    }

    const handleEditSubjectCollapse = (id, collapse) => {
        const updateData = {
            collapsed: collapse,
        }

        console.log(id);

        // Find the subject with the given id
        handleEditSubject(id, updateData);

        // Update the state with the new array
        return true
    };
    
    const handleDeleteUnit = (id) => {
        pgApi.deleteUnit(id).then((a) => {
            if(a) {
                const updatedUnits = units.filter((unit) => unit.unit_id !== id);
                setUnits(updatedUnits);
            }
        })
    }

    const handleDeleteBookEntry = (id) => {
        pgApi.deleteBookEntry(id).then((a) => {
            if(a) {
                const updatedBookEntries = bookEntries.filter((book) => book.book_id !== id);
                setBookEntries(updatedBookEntries);
            }
        })
    }


    const handleInputSubjectName = (e, pg) => {
        if(e == null && pg != null) {
            setInputSubjectName(pg);
        } else {
            setInputSubjectName(e.target.value);
        }
        
    }

    const getSubjectNameById = (id) => {
        const subject = subjects.find((subject) => subject.subject_id === id);
        return subject ? subject.name : "Subject not found";
    }

    const getUnitNameById = (id) => {
        const unit = units.find((unit) => unit.unit_id === id);
        return unit ? unit.name : "Unit not found";
    }

    const getUnitsBySubjectId = (subjectId) => {
        return units.filter((unit) => unit.subject_id === subjectId);
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
                            <input className="form-control" value={inputSubjectName} onChange={handleInputSubjectName} placeholder="" type="text" name="" id="" />
                            <button className="btn btn-primary" onClick={handleAddSubject}>Añadir materia</button>
                        </div>
                    </div>
                </div>
                <div id="subject-list">
                    {subjects.map((subject, index) => (
                        <SubjectItem 
                            key={index} 
                            subject={subject} 
                            index={index} 
                            units={units} 
                            handleAddUnit={handleAddUnit} 
                            handleDeleteUnit={handleDeleteUnit} 
                            bookEntries={bookEntries} 
                            handleEditSubjectColor={handleEditSubjectColor}
                            handleEditSubjectCollapse={handleEditSubjectCollapse}
                            handleDeleteSubject={handleDeleteSubject}></SubjectItem>
                    ))}
                </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 p-0 p-md-2">
                <div className="row">
                    <h3 className="app-title">Registro</h3>
                </div>
                <div className="row">
                    <Book bookEntries={bookEntries} handleDeleteBookEntry={handleDeleteBookEntry} getUnitNameById={getUnitNameById} getSubjectNameById={getSubjectNameById} subjects={subjects} getUnitsBySubjectId={getUnitsBySubjectId} handleAddBookEntry={handleAddBookEntry}></Book>
                </div>
            </div>
        </div>
    );
}

export default HourManager;
