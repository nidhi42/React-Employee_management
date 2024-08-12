import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IEmployee } from "../employee.type";
import "./Home.style.css";

type Props = {
    isEditMode: boolean;
    data?: IEmployee;
    onBackButtonClickHnd: () => void;
    onSubmitClickHnd: (data: IEmployee) => void;
    onUpdateClickHnd: (data: IEmployee) => void;
};

const EmployeeForm = (props: Props) => {
    const { isEditMode, data, onBackButtonClickHnd, onSubmitClickHnd, onUpdateClickHnd } = props;

    // Initialize useForm hook
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<IEmployee>();

    // Populate the form with existing data if in edit mode
    useEffect(() => {
        if (isEditMode && data) {
            setValue("id", data.id);
            setValue("fullname", data.fullname);
            setValue("birthdate", data.birthdate);
            setValue("department", data.department);
            setValue("experience", data.experience);
        }
    }, [isEditMode, data, setValue]);

    // Handle form submission
    const onSubmit = (formData: IEmployee) => {
        // Ensure `id` is set for edit mode
        if (isEditMode && data) {
            formData.id = data.id;
        } else {
            // Generate a new ID if adding a new employee
            formData.id = new Date().toJSON().toString();
        }

        if (isEditMode) {
            onUpdateClickHnd(formData);
            alert("Employee updated successfully!");
        } else {
            onSubmitClickHnd(formData);
            alert("Employee added successfully!");
        }
        onBackButtonClickHnd();
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Full Name:</label>
                    <Controller
                        name="fullname"
                        control={control}
                        rules={{
                            required: "Full Name is required",
                            pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message: "Full Name should contain only characters"
                            }
                        }}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                    {errors.fullname && <p className="error-message">{errors.fullname.message}</p>}
                </div>
                <div>
                    <label>Birthdate:</label>
                    <Controller
                        name="birthdate"
                        control={control}
                        rules={{ required: "Birthdate is required" }}
                        render={({ field }) => (
                            <input
                                type="date"
                                {...field}
                                onClick={(e) => e.currentTarget.showPicker()}
                            />
                        )}
                    />
                    {errors.birthdate && <p className="error-message">{errors.birthdate.message}</p>}
                </div>
                <div>
                    <label>Department:</label>
                    <Controller
                        name="department"
                        control={control}
                        rules={{ required: "Department is required" }}
                        render={({ field }) => (
                            <input
                                type="text"
                                {...field}
                            />
                        )}
                    />
                    {errors.department && <p className="error-message">{errors.department.message}</p>}
                </div>
                <div>
                    <label>Experience:</label>
                    <Controller
                        name="experience"
                        control={control}
                        rules={{
                            required: "Experience is required",
                            validate: value => value > 0 || "Experience should be a positive number"
                        }}
                        render={({ field }) => (
                            <input
                                type="number"
                                {...field}
                            />
                        )}
                    />
                    {errors.experience && <p className="error-message">{errors.experience.message}</p>}
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
