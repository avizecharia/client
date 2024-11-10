import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, CandidateState } from "../../types/redux";
import { ICandidate } from "../../types/candidates";

const initialState: CandidateState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
};

const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/cadidates/");
      if (res.status != 200) {
        thunkApi.rejectWithValue("Cant get the list ,please try again");
      }
      const data = await res.json();
      thunkApi.fulfillWithValue(data);
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
