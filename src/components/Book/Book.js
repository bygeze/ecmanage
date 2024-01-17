
import { useState } from "react";
import './Book.css'

function Book({bookEntries, handleDeleteBookEntry, getSubjectNameById, subjects, getUnitsBySubjectId, handleAddBookEntry}) {
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

    const onDeleteEntry = (id) => {

        
        handleDeleteBookEntry(id);
    }

    const reverseMap = (arr) => {
        const mapReverse1 = arr
            .slice(0)
            .reverse();

        return mapReverse1;
    }

    const utilCollideText = (text, length) => {
        if(text.length > length) {
            text = text.slice(0, length - 2);
        
            text = text + "..";
        }

        return text
    }

  return (
    <div className="book">
        <div className="books-container p-2">
        <table className="table">
            <thead>
                <tr>
                    <th>Materia</th>
                    <th><span className="d-none d-lg-inline">Unidad</span><span className="d-inline d-lg-none">Ud.</span></th>
                    <th><span className="d-none d-lg-inline">Horas</span><span className="d-inline d-lg-none">Hrs.</span></th>
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
                        <input type="number"     className="form-control ps-0 pe-0" onChange={handleInputHours}/>
                    </td>
                    <td>
                        <input className="form-control date-input" type="date" name="" id="" onChange={handleInputDate} />
                    </td>
                    <td><span onClick={onAddEntry}>{String.fromCodePoint('0x2795')}</span></td>
                </tr>
                
                {
                /*
                 * NOTE: I WANT TO REVERSE THIS ARRAY, BUT KEEP THE INDEX OF THE PREVIOUS ARRAY CAUSE IT'S THE KEY FOR FIREBASE
                 */
                bookEntries.map((book, index) => (
                    <tr key={index}>
                        <td>
                            <span className="d-none d-lg-none d-xl-inline">{getSubjectNameById(book.subjectId)}</span>
                            <span className="d-inline d-md-none">{utilCollideText(getSubjectNameById(book.subjectId), 8)}</span>
                            <span className="d-none d-md-inline d-xl-none">{utilCollideText(getSubjectNameById(book.subjectId), 10)}</span>
                            </td>
                        <td><span className="d-none d-lg-inline">Unidad </span><span className="d-inline d-lg-none">Ud. </span>{book.unitId}</td>
                        <td>{book.hours}</td>
                        <td>{book.date}</td>
                        <td><span onClick={() => {onDeleteEntry(book.id)}}>{String.fromCodePoint('0x1f5d1')}</span></td>
                    </tr>
                ))}

            </tbody>
            
        </table>
        </div>
    </div>
  );
}

export default Book;
