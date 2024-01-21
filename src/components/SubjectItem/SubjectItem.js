
import { useState } from "react";
import './SubjectItem.css'

function SubjectItem({subject, index, units, handleAddUnit, handleDeleteUnit, bookEntries, handleEditSubjectColor, handleEditSubjectCollapse, handleDeleteSubject}) {
    const [inputUnitName, setInputUnitName] = useState("");
    const [inputTotalHours, setInputTotalHours] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(subject.collapsed);
    const [frameColor,  setFrameColor] = useState(subject.bg_color);

    const handleInputColor = (id, e) => {
        if(handleEditSubjectColor(id, e.target.value)) {
            setFrameColor(e.target.value);
        }
    }

    const handleInputUnitName = (e) => {
        setInputUnitName(e.target.value);
    }

    const handleInputTotalHours = (e) => {
        setInputTotalHours(e.target.value);
    }

    const toggleCollapseContent = () => {
        setIsCollapsed(!isCollapsed);
        handleEditSubjectCollapse(subject.subject_id, !isCollapsed);
    }

    const onAddUnit = () => {
        if(handleAddUnit(subject.subject_id, inputUnitName, inputTotalHours)) {
            let e = {target: {value: ""}};

            handleInputUnitName(e);
            handleInputTotalHours(e);
        }
    }

    const onDeleteUnit = (id) => {
        handleDeleteUnit(id);
    }

    const onDeleteSubject = (id) => {
        handleDeleteSubject(id)
    }

    const calcHourPercentage = (hours) => {
        return (hours * 0.2).toFixed(1);
    }
    

    const calcAvailableHours = (subjectId, unitId) => {
        // Filter bookEntries based on subjectId and unitId
        const relevantBookEntries = bookEntries.filter(
          (entry) => entry.subject_id === subjectId && entry.unit_id === unitId
        );

         //Calculate the sum of hours from relevant bookEntries
        const totalBookedHours = relevantBookEntries.reduce(
            (sum, entry) => sum + entry.hours,
          0
        );
      
        // Get the total hours for the unit
        const totalUnitHours = units.find((unit) => unit.unit_id === unitId)?.hours || 0;

        // Calculate available hours
        const availableHours = calcHourPercentage(totalUnitHours) - totalBookedHours;


        return availableHours;

    };



    return (
        <div 
        className="subject-item" 
        key={subject.subject_id}>
            <div className="row g-0 subject-item-header" style={{backgroundColor: frameColor}}>
                <div className="col-9 p-2 d-flex align-items-center justify-content-start">
                    <h4 className="text-start">{subject.name}</h4>
                </div>
                <div className="col-3 p-2 d-flex align-items-center justify-content-end">
                <span onClick={() => {onDeleteSubject(subject.subject_id)}}>{String.fromCodePoint('0x1f5d1')}</span>

                    <input style={{minWidth: "30px"}} value={frameColor} onChange={(e) => {handleInputColor(subject.subject_id, e)}} type="color"></input>
                    <span
                        className="text-end emoji"
                        onClick={toggleCollapseContent}>

                        {isCollapsed ?  String.fromCodePoint('0x2b07') : String.fromCodePoint('0x2b06')}
                    </span>
                </div>

            </div>

            <div className={`p-2 ${isCollapsed ? 'd-none' : 'd-initial'}`}>
                <table className=" table">
                    <thead>
                        <tr>
                            <th>
                                <span className="d-none d-lg-inline">Unidad</span><span className="d-inline d-lg-none">Ud.</span>
                            </th>
                            <th>
                                <span className="d-none d-lg-inline">Horas</span><span className="d-inline d-lg-none">Hrs.</span>
                            </th>
                            <th>
                                20%
                            </th>
                            <th>
                            <span className="d-none d-lg-inline">Horas disponibles</span><span className="d-inline d-lg-none">Hrs. disp.</span>
                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {units.map((unit) => {
                        if (unit.subject_id === subject.subject_id) {
                        return (
                            <tr key={unit.unit_id}>
                            <td>{unit.name}</td>
                            <td>{unit.hours}</td>
                            <td>{calcHourPercentage(unit.hours)}</td>
                            <td>{calcAvailableHours(subject.subject_id, unit.unit_id)}</td>
                            <td><span className="emoji" onClick={() => onDeleteUnit(unit.unit_id)}>{String.fromCodePoint('0x1f5d1')}</span></td>
                            </tr>
                        );
                        }
                        return null;
                    })}
                    </tbody>
                </table>
                <div className="row mt-4">
                    <span className="mb-2">Añadir unidad a la materia</span>
                    <div className="input-group">
                        
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className="form-control"
                            value={inputUnitName}
                            onChange={handleInputUnitName} 
                            placeholder="# de unidad"/>

                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className="form-control"
                            value={inputTotalHours}
                            onChange={handleInputTotalHours} 
                            placeholder="# de horas"/>
                        
                        <button className="btn btn-primary" onClick={onAddUnit}>Añadir</button>
                    </div>
                    <div className="col-4">
                        

                    </div>
                    <div className="col-4"> 
                        
                        
                    </div>

                </div>
            </div>




        </div> 

        
    );

}

export default SubjectItem;
