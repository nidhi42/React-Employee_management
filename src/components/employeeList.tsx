import { IEmployee } from "../employee.type";
import "./Home.style.css";
type Props = {
  list: IEmployee[];
  onDeleteClickHnd: (id: string) => void;
  onEdit: (data: IEmployee) => void;
};
const EmployeeTableList: React.FC<Props> = ({
  list,
  onDeleteClickHnd,
  onEdit,
}) => {
  return (
    <>
      <article className="list-header">
        <h3>Employee List</h3>
      </article>
      <table>
        <thead>
          <tr>
            <th>FullName</th>
            <th>Birthdate</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee) => {
            return (
              <>
                <tr key={employee.id}>
                  <td>{employee.fullname}</td>
                  <td>{employee.birthdate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.experience}</td>
                  <td>
                    <div>
                      <input
                        type="button"
                        value="Edit"
                        onClick={() => onEdit(employee)}
                      ></input>
                      <input
                        type="button"
                        value="Delete"
                        onClick={() => onDeleteClickHnd(employee.id)}
                      ></input>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default EmployeeTableList;
