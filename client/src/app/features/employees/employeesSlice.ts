import type { Employee } from "@prisma/client"
import { createSlice } from "@reduxjs/toolkit"
import { employeesApi } from "../../services/employees"
import type { RootState } from "../../store"

interface IInitialState {
  employees: Employee[] | null
}

const initialState: IInitialState = {
  employees: null,
}

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(
      employeesApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload
      },
    )
  },
})

export default slice.reducer

export const selectEmployees = (state: RootState) => state.employees.employees
