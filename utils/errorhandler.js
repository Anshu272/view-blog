 export const errorhandler=(code,msg)=>{
    const error =new Error();

    error.statusCode=code||500;
    error.message=msg;
    return error;
}