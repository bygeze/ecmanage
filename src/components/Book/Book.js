
import { useState } from "react";
import './Book.css'

function Book({bookEntries, handleDeleteBookEntry, getUnitNameById, getSubjectNameById, subjects, getUnitsBySubjectId, handleAddBookEntry}) {
    const [selectedSubject, setSelectedSubject] = useState();
    const [selectedUnit, setSelectedUnit] = useState();
    const [inputDate, setInputDate] = useState();
    const [inputHours, setInputHours] = useState();

    const handleSubjectSelectChange = (e) => {
        const selectedSubjectId = e.target.value;
        const selectedSubject = subjects.find((subject) => subject.subject_id === parseInt(selectedSubjectId));
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
            subject_id: selectedSubject.subject_id,
            unit_id: parseInt(selectedUnit),
            hours: parseInt(inputHours),
            date: inputDate
        }

        if(handleAddBookEntry(entry)) {
            let e = {target: {value: ""}};
            handleInputDate(e);
            handleInputHours(e);

            e = {target: {value: 0}};
            handleSubjectSelectChange(e);
            handleUnitSelectChange(e);
        }
    }

    const onDeleteEntry = (id) => {
        handleDeleteBookEntry(id);
    }

    /*
    NOT BEING USED ATM

    const reverseMap = (arr) => {
        const mapReverse1 = arr
            .slice(0)
            .reverse();

        return mapReverse1;
    }*/

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
                        <select defaultValue={0} value={selectedSubject ? selectedSubject.subject_id : 0} className="form-control" onChange={(e) => handleSubjectSelectChange(e)}>
                            <option value="0">Selecciona una materia</option>
                            {subjects.map((subject) => (
                                <option key={subject.subject_id} value={subject.subject_id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>

                        <select defaultValue={0}  className="form-control" onChange={(e) => {handleUnitSelectChange(e)}}>
                            {selectedSubject ? (
                                <>
                                    <option value="0">Selecciona una unidad</option>
                                    {getUnitsBySubjectId(selectedSubject.subject_id).map((unit) => (
                                        <option key={unit.unit_id} value={unit.unit_id}>
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
                        <input type="number" value={inputHours}     className="form-control ps-0 pe-0" onChange={handleInputHours}/>
                    </td>
                    <td>
                        <input className="form-control date-input" value={inputDate} type="date" name="" id="" onChange={handleInputDate} />
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
                            <span className="d-none d-lg-none d-xl-inline">{getSubjectNameById(book.subject_id)}</span>
                            <span className="d-inline d-md-none">{utilCollideText(getSubjectNameById(book.subject_id), 8)}</span>
                            <span className="d-none d-md-inline d-xl-none">{utilCollideText(getSubjectNameById(book.subject_id), 10)}</span>
                            </td>
                        <td><span className="d-none d-lg-inline">Unidad </span><span className="d-inline d-lg-none">Ud. </span>{getUnitNameById(book.unit_id)}</td>
                        <td>{book.hours}</td>
                        <td>{book.date.split('T')[0]}</td>
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
