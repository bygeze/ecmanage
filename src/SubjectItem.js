
import { useState, useEffect } from "react";

function SubjectItem({subject, index, units, handleAddUnit, handleDeleteUnit, bookEntries}) {
    const [inputUnitName, setInputUnitName] = useState("");
    const [inputTotalHours, setInputTotalHours] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(false);



    const handleInputUnitName = (e) => {
        setInputUnitName(e.target.value);

    }

    const handleInputTotalHours = (e) => {
        setInputTotalHours(e.target.value);
    }

    const toggleCollapseContent = () => {
        setIsCollapsed(!isCollapsed);
    }

    const onAddUnit = () => {
        handleAddUnit(subject.id, inputUnitName, inputTotalHours);
    }

    const onDeleteUnit = (id) => {
        handleDeleteUnit(id);
    }

    const calcHourPercentage = (hours) => {
        return hours * 0.2;
    }

    const calcAvailableHours = (subjectId, unitId) => {
        console.log(bookEntries)

        // Filter bookEntries based on subjectId and unitId
        const relevantBookEntries = bookEntries.filter(
          (entry) => entry.subjectId === subjectId && entry.unitId === unitId
        );

        
            

         //Calculate the sum of hours from relevant bookEntries
        const totalBookedHours = relevantBookEntries.reduce(
            (sum, entry) => sum + entry.hours,
          0
        );
      
        // Get the total hours for the unit
        const totalUnitHours = units.find((unit) => unit.id === unitId)?.hours || 0;

        // Calculate available hours
        const availableHours = calcHourPercentage(totalUnitHours) - totalBookedHours;


        return availableHours;

    };

    return (
        <div 
        className="subject-item" 
        key={index}>
            <div className="row g-0 subject-item-header">
                <div className="col-9 p-2 d-flex align-items-center justify-content-start">
                    <h4 className="text-start">{subject.name}</h4>
                </div>
                <div className="col-3 p-2 d-flex align-items-center justify-content-end">
                    <h6 
                        className="text-end"
                        onClick={toggleCollapseContent}>

                        {isCollapsed ? 'Desplegar' : 'Plegar'}
                    </h6>
                </div>

            </div>

            <div className={`p-2 ${isCollapsed ? 'd-none' : 'd-initial'}`}>
                <table className=" table">
                    <thead>
                        <tr>
                            <th>
                                Unidad
                            </th>
                            <th>
                                Horas
                            </th>
                            <th>
                                20%
                            </th>
                            <th>
                                Horas disponibles
                            </th>
                            <th>
                                Borrar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {units.map((unit) => {
                        if (unit.subjectId === subject.id) {
                        return (
                            <tr key={unit.id}>
                            <td>{unit.name}</td>
                            <td>{unit.hours}</td>
                            <td>{calcHourPercentage(unit.hours)}</td>
                            <td>{calcAvailableHours(subject.id, unit.id)}</td>
                            <td><span onClick={() => onDeleteUnit(unit.id)}>Borrar</span></td>
                            </tr>
                        );
                        }
                        return null;
                    })}
                    </tbody>
                </table>
                <div className="row mt-4">
                    <div className="col-4">
                        <label htmlFor="" className="form-label">Número de unidad</label>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className="form-control"
                            onChange={handleInputUnitName} />
                    </div>
                    <div className="col-4">
                        <label htmlFor="" className="form-label">Horas de la unidad</label>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className="form-control"
                            onChange={handleInputTotalHours} />
                    </div>
                    <div className="col-4"> 
                        <label htmlFor="" className="form-label invisible" >Añadir unidad</label>
                        <button className="btn btn-primary w-100" onClick={onAddUnit}>Añadir unidad</button>
                    </div>

                </div>
            </div>




        </div> 

        
    );

}

export default SubjectItem;
