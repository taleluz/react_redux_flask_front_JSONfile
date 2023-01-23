import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Student from '../models/Student'
import { addStudent, getStudents ,addGrades} from './studentAPI';


export interface StudentState {
  students:Student[]
  id: number;
  name: string;
  email: string;
  math: number;
  syber: number;
  english: number;
}

const initialState: StudentState = {
  students:[],
  id:0,
  name: "",
  email:"",
  math: 0,
  syber: 0,
  english: 0
};

export const getStudentsAsync = createAsyncThunk(
  'student/getStudents',
  async () => {
    const response = await getStudents();
    console.log('first')
    console.log(response)
    return response;
  }
);
export const addStudentsAsync = createAsyncThunk(
  'student/addStudent',
  async (stu:Student) => {
    const response = await addStudent(stu);
    console.log(response)
    return response;
  }
);

// export const delStudentsAsync = createAsyncThunk(
//   'student/delStudent',
//   async (id:number) => {
//     const response = await delStudent(id);
//     console.log(response)
//     return response;
//   }
// );
// export const updStudentsAsync = createAsyncThunk(
//   'student/updStudent',
//   async (stu:Student) => {
//     const response = await updStudent(stu);
//     console.log(response)
//     return response;
//   }
// );
export const addGradesAsync = createAsyncThunk(
  'student/addGrades',
  async (stu:any) => {
    const response = await addGrades(stu);
    console.log(response)
    return response;
  }
);

export const StudentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentsAsync.fulfilled, (state,action) => {
        console.log(action.payload)
        state.students= action.payload.data
      })
      .addCase(addStudentsAsync.fulfilled, (state,action) => {
        console.log('action.payload')
        state.students.push(action.payload.data)
      })
      
      // .addCase(delStudentsAsync.fulfilled, (state,action) => {
      //   console.log(action.payload)
      //   state.students=state.students.filter(x=>x.id!==action.payload.data)
      // })
      // .addCase(updStudentsAsync.fulfilled, (state,action) => {
      //   console.log(action.payload)
      //   state.students=state.students.filter(x=>x.id!==action.payload.data.id)
      //   state.students.push(action.payload.data)
      // })
      .addCase(addGradesAsync.fulfilled, (state,action) => {
        console.log(action.payload)
        const student = state.students.find(x => x.id === action.payload.data.id);
        if (student) {
          student.math = action.payload.data.math;
          student.syber = action.payload.data.syber;
          student.english = action.payload.data.english;          
        }
      });
  },
});

export const {  } = StudentSlice.actions;

export const selectStudents = (state: RootState) => state.student.students;


export default StudentSlice.reducer;
