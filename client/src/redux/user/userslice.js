import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
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
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null;
    },
    Signinfailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    },
    Updatestart:(state)=>{
        state.loading=true;
        state.error=null;
    },
    Updatesuccess:(state,action)=>{
        state.currentUser=action.payload;
        state.loading=false;
        state.error=null;
    },
    Updatefailure:(state,action)=>{
        state.error=action.payload;
        state.loading=false;
    }
}

})
export const {Signinfailure,Signinstart,Signinsuccess,Updatefailure,Updatestart,Updatesuccess}=userSlice.actions;
export default userSlice.reducer;