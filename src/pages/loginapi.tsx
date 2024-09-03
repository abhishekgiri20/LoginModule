import { log } from "console";
import request from "superagent";
import { setCookie } from "nookies";
const api_url = "http://139.59.47.49:4004/"


// registor api_url..........
const registor = async(postData:object) =>{
   try {
    let response =  await request.post(`${api_url}api/account/register`).send(postData)
    const token = response.body.token;
    
    console.log("token...........", token);
    setCookie(null, "accessToken", token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    console.log(response.body,"response.............")
    return response.body;
   } catch (error) {
     console.log("error in registor", error)
   }
}


// registor with number............
const registorNumber = async(mobileData:object,token:string) =>{
    console.log(token,'token.......');
    
    try {
        const response =  await request.post(`${api_url}api/account/send/otp`).send(mobileData).set({"Authorization": `${token}`}) ;
        return response.body;
    } catch (error) {
        console.log("error",error)

    }
}


// verify number..............
const verifyNumber = async(verifyData:object) =>{
    try {
        const response = await request.post(`${api_url}api/account/verify/otp`).send(verifyData);
        return response.body;
    } catch (error:any) {
       console.log("Error in verifying otp",error)
       return error?.response?.body
    }
}


//signIn with email.......................

const signinEmail = async(data:object) =>{
    try {
        const response = await request.post(`${api_url}api/account/login`).send(data);
        return response.body;
    } catch (error) {
         console.log("Error in sign in",error)
    }
}


//forgetPassword..................

const forgetPassword = async(email:object) =>{
    try {
        const response = await request.post(`${api_url}api/account/forgot/password`).send(email);
        return response.body;
    } catch (error) {
        console.log("Error in forget password ",error)
    }
}


//Reset password...................

const resetPassword = async(data:object) =>{
    console.log(data)
    try {
        const response = await request.post(`${api_url}api/account/reset/password`).send(data)
        return response.body;
    } catch (error) {
        console.log("Error in update api", error);
    }
}

//Image uplaod...................

const imageUpload = async(image:any,token:string) =>{
    const profileImage = new FormData();
     profileImage.append('profile_image', image);
     try {
        const response =  await request.post(`${api_url}api/upload/profile-image`).send(profileImage).set({"Authorization": `${token}`})
        return response.body;
     } catch (error) {
        console.log("error in uploading image",error)
     }
}

const loginapi = {
    registor,
    registorNumber,
    verifyNumber,
    signinEmail ,
    forgetPassword,
    resetPassword ,
    imageUpload
}


export default loginapi;