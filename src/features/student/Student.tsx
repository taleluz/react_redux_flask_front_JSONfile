import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectStudents, getStudentsAsync, addStudentsAsync, addGradesAsync } from './studentSlice'
const Student = () => {
  const students = useAppSelector(selectStudents);
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
 



  useEffect(() => {
    console.table(students)
  }, [students.length])
  useEffect(() => {
    dispatch(getStudentsAsync())
  }, [])


  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [math, setMath] = useState(0);
  const [syber, setSyber] = useState(0);
  const [english, setEnglish] = useState(0);



  return (
    <div>
      <h1>Students</h1>
          Student name:<input onChange={(e) => setname(e.target.value)} /><br />
          Student Email:<input onChange={(e) => setemail(e.target.value)} />
          <button onClick={() => dispatch(addStudentsAsync({ name, email }))}>add student</button>
          <button onClick={() => dispatch(getStudentsAsync())}>get all students</button>
          {students.length > 0 && students[0].email}
          {students.map((student, i) => <div key={i}>
            {/* <button onClick={() => dispatch(delStudentsAsync(student.id || -1))}>del student</button>
        <button onClick={() => dispatch(updStudentsAsync({ name, email, id: student.id }))}>upd student</button> */}
            {/* <button onClick={() => dispatch(addStudentsAsync({ name, email }))}>add grades</button> */}



            Name: {student.name}, {" "}
            email:{student.email}, {" "}
            Id: {student.id}
            <br /><hr />
            Math: <input type="number" onChange={(e) => setMath(parseFloat(e.target.value))} />
            Syber: <input type="number" onChange={(e) => setSyber(parseFloat(e.target.value))} />
            English: <input type="number" onChange={(e) => setEnglish(parseFloat(e.target.value))} />
            <button onClick={() => dispatch(addGradesAsync({ id: student.id, math: math, syber, english }))}>
              Add grades
            </button>
            Name: {student.name}, Email: {student.email}, Id: {student.id}
            {student.math && <span> Math: {student.math}</span>}
            {student.syber && <span> Syber: {student.syber}</span>}
            {student.english && <span> English: {student.english}</span>}

          </div>)}

        </div>


      )
}


export default Student
