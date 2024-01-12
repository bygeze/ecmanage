
import { useState } from "react";
import './Book.css'

function Book({bookEntries, getSubjectNameById, subjects, getUnitsBySubjectId, handleAddBookEntry}) {
    const [selectedSubject, setSelectedSubject] = useState();
    const [selectedUnit, setSelectedUnit] = useState();
    const [inputDate, setInputDate] = useState();
    const [inputHours, setInputHours] = useState();

    const handleSubjectSelectChange = (e) => {
        const selectedSubjectId = e.target.value;
        const selectedSubject = subjects.find((subject) => subject.id === parseInt(selectedSubjectId));
        setSelectedSubject(selectedSubject);
    }

    const handleUnitSelectChange = (e) => {
        setSelectedUnit(e.target.value);
    } 
    
    const handleInputDate = (e) => {
        setInputDate(e.target.value)
    } 

    const handleInputHours = (e) => {
        setInputHours(e.target.value)
    }

    const onAddEntry = () => {
        let entry = {
            subjectId: selectedSubject.id,
            unitId: parseInt(selectedUnit),
            hours: parseInt(inputHours),
            date: inputDate
        }

        handleAddBookEntry(entry);
    }

    const reverseMap = (arr) => {
        const mapReverse1 = arr
            .slice(0)
            .reverse();

        return mapReverse1;
    }
  return (
    <div className="book">
        <div className="books-container p-2">
        <table className="table">
            <thead>
                <tr>
                    <th>Materia</th>
                    <th>Unidad</th>
                    <th>Horas</th>
                    <th>Fecha</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select defaultValue={0} className="form-control" onChange={(e) => handleSubjectSelectChange(e)}>
                            <option value="0">Selecciona una materia</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>

                        <select defaultValue={0} className="form-control" onChange={handleUnitSelectChange}>
                            {selectedSubject ? (
                                <>
                                    <option value="0">Selecciona una unidad</option>
                                    {getUnitsBySubjectId(selectedSubject.id).map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            Unidad {unit.name}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option value="0" disabled >Selecciona una materia primero</option>
                            )}
                        </select>
                        
                    </td>
                    <td>
                        <input type="number" className="form-control" onChange={handleInputHours}/>
                    </td>
                    <td>
                        <input className="form-control" type="date" name="" id="" onChange={handleInputDate} />
                    </td>
                    <td><button className="btn btn-primary" onClick={onAddEntry}>Añadir</button></td>
                </tr>
                {reverseMap(bookEntries).map((book, index) => (
                    <tr key={index}>
                        <td>{getSubjectNameById(book.subjectId)}</td>
                        <td>{`Unidad ${book.unitId}`}</td>
                        <td>{book.hours}</td>
                        <td>{book.date}</td>
                        <td></td>
                    </tr>
                ))}



            </tbody>
            
        </table>
        </div>
    </div>
  );
}

export default Book;
