import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Currentuser:null,
    error:null,
    loading:false
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
    Signinstart:(state)=>{
        state.loading=true;
        state.error=null;
    },
    Signinsuccess:(state,action)=>{
        state.Currentuser=action.payload;
        state.loading=false;
        state.error=null;
    },
    Signinfailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    }
}

})
export const {Signinfailure,Signinstart,Signinsuccess}=userSlice.actions;
export default userSlice.reducer;