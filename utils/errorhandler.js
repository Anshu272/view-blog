 export const errorhandler=(code,msg)=>{
    const error =new Error();

    error.statusCode=code;
    error.message=msg;
    return error;
}