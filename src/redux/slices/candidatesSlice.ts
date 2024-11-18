import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, CandidateState } from "../../types/redux";
import { ICandidate } from "../../types/candidates";
import { useAppDispatch } from "../store";
import { fetchGetUser } from "./userSlice";

const initialState: CandidateState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
};

export const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/candidates/",{
        method:"GET",
        
        headers:{"authorization":localStorage.token}
      });
      if (res.status != 200) {
        thunkApi.rejectWithValue("Cant get the list ,please try again");
      }
      const data = await res.json();
      console.log(data);
      return data
    } catch (err) {
      thunkApi.rejectWithValue(`Cant get the list ,please try again${err}`);
    }
  }
);



export const fetchVote = createAsyncThunk(
  "candidates/vote",
  async (candidateId:string , thunkApi) => {
    try {
      const res = await fetch(`http://localhost:2222/api/votes/${candidateId}`,{
        method:"PUT",
        headers:{"authorization":localStorage.token}
      });
      if (res.status != 201) {
        thunkApi.rejectWithValue("Cant vote ,please try again");
      }
      
    } catch (err) {
      thunkApi.rejectWithValue(`Cant get the list ,please try again${err}`);
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CandidateState>) => {
    builder
      .addCase(fetchCandidates.pending, (state, action) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.candidates = [];
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCCESS;
        state.error = null;
        state.candidates = action.payload as unknown as ICandidate[];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.candidates = [];
      });
  },
});

export default candidatesSlice;
