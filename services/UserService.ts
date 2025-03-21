import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./ImageService";

export const updateUser = async(
    uid:string,
    updateData:UserDataType
):Promise<ResponseType> =>{
try{
if(updateData.image && updateData?.image?.uri){
    const imageUploadRes = await uploadFileToCloudinary(updateData.image, "users")
    if(!imageUploadRes.success){
        return {success:false, msg:imageUploadRes.msg || "Failed to upload image"}
    }
    updateData.image = imageUploadRes.data;
}

const useRef = doc(firestore, "users",uid);
await updateDoc(useRef,updateData);
return {success :true,msg:"updated Successfully"}
}catch(error:any){
    console.log("error updating user:",error)
return {success:false, msg:error?.message}
}
}