import React, { useState, useEffect } from "react";
import { IEmployee } from "../employee.type";
import "./Home.style.css";

type Props = {
    isEditMode: boolean; // Determine whether it's add or edit mode
    data?: IEmployee; // Data to pre-fill if in edit mode
    onBackButtonClickHnd: () => void;
    onSubmitClickHnd: (data: IEmployee) => void;
    onUpdateClickHnd: (data: IEmployee) => void;
};

const EmployeeForm = (props: Props) => {
    const { isEditMode, data, onBackButtonClickHnd, onSubmitClickHnd, onUpdateClickHnd } = props;

    // Initialize state variables
    const [fullname, setFullName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [department, setDepartment] = useState("");
    const [experience, setExperience] = useState(1);
    const [errors, setErrors] = useState({
        fullname: "",
        experience: ""
      });
    // Update state with props.data when in edit mode
    useEffect(() => {
        if (isEditMode && data) {
            setFullName(data.fullname);
            setBirthDate(data.birthdate);
            setDepartment(data.department);
            setExperience(data.experience);
        }
    }, [isEditMode, data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "fullname":
                setFullName(value);
                 // Validation for fullname (only characters)
        setErrors(prevErrors => ({
            ...prevErrors,
            fullname: /^[a-zA-Z\s]*$/.test(value) ? "" : "Full Name should contain only characters"
          }));
          break;
                
            case "birthdate":
                setBirthDate(value);
                break;
            case "department":
                setDepartment(value);
                break;
            case "experience":
                setExperience(parseInt(value, 10));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: IEmployee = {
            id: isEditMode && data ? data.id : new Date().toJSON().toString(),
            fullname,
            birthdate,
            department,
            experience
        };

        if (isEditMode && data) {
            onUpdateClickHnd(formData);
        } else {
            onSubmitClickHnd(formData);
        }

        onBackButtonClickHnd();
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullname" value={fullname} onChange={handleChange} />
                </div>
                <div>
                    <label>Birthdate:</label>
                    <input type="date" name="birthdate" value={birthdate} onClick={(e) => e.currentTarget.showPicker()} onChange={handleChange} />
                </div>
                <div>
                    <label>Department:</label>
                    <input type="text" name="department" value={department} onChange={handleChange} />
                </div>
                <div>
                    <label>Experience:</label>
                    <input type="number" name="experience" value={experience} onChange={handleChange} />
                </div>
                <div>
                    <input type="button" value="Back" onClick={onBackButtonClickHnd} />
                    <input type="submit" value={isEditMode ? "Update Employee" : "Add Employee"} />
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
