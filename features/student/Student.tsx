import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStudents, getStudentsAsync, addStudentsAsync, addGradesAsync } from './studentSlice'

const Student = () => {
  const students = useAppSelector(selectStudents);
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [math, setMath] = useState(0);
  const [syber, setSyber] = useState(0);
  const [english, setEnglish] = useState(0);

  useEffect(() => {
    console.table(students)
  }, [students.length])
  
  useEffect(() => {
    dispatch(getStudentsAsync())
  }, [])

  const handleAddStudent = () => {
    dispatch(addStudentsAsync({ name, email }));
  }

  const handleGetStudents = () => {
    dispatch(getStudentsAsync());
  }

  const handleAddGrades = (studentId: number) => {
    dispatch(addGradesAsync({ id: studentId, math, syber, english }));
  }

  return (
    <div>
      <h1>Students</h1>
      <div>
        <label>Student name:</label>
        <input onChange={(e) => setname(e.target.value)} />
      </div>
      <div>
        <label>Student Email:</label>
        <input onChange={(e) => setemail(e.target.value)} />
      </div>
      <button onClick={handleAddStudent}>Add student</button>
      <button onClick={handleGetStudents}>Get all students</button>

      {students.map((student, i) => {
        return (
          <div key={i}>
            <div>
              Name: {student.name}, Email: {student.email}, Id: {student.id}
            </div>
            <div>
              <label>Math:</label>
              <input type="number" onChange={(e) => setMath(parseFloat(e.target.value))} />
            </div>
            <div>
              <label>Syber:</label>
              <input type="number" onChange={(e) => setSyber(parseFloat(e.target.value))} />
            </div>
            <div>
              <label>English:</label>
              <input type="number" onChange={(e) => setEnglish(parseFloat(e.target.value))} />
            </div>
            {student.id && <button onClick={() => handleAddGrades(student.id as number)}>Add grades</button>}
            {student.math && <span> Math: {student.math}</span>}
            {student.syber && <span> Syber: {student.syber}</span>}
            {student.english && <span> English: {student.english}</span>}
          </div>
        );
      })}
    </div>
  );
}
export default Student;

