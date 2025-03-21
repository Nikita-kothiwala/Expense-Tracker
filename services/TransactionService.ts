import { firestore } from "@/config/firebase"
import { ResponseType, TransactionType, WalletType } from "@/types"
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { uploadFileToCloudinary } from "./ImageService"

export const createOrUpdateTransaction =async(
    transactionData :Partial<TransactionType>
):Promise<ResponseType>=>{
      try{
   const {id,type,walletId,amount,image} =transactionData
if(!amount || amount<=0 || !walletId || !type){
    return{success:false, msg:"Invalid Transaction Data"}
}

if(id){

}else{
 let res = await updateWalletForNewTransaction(
    walletId!,
    type,
    Number(amount!)
 );
 if(!res.success) return res
}

if(image){
    const imageUploadRes = await uploadFileToCloudinary(image, "transactions")
    if(!imageUploadRes.success){
        return {success:false, msg:imageUploadRes.msg || "Failed to upload receipt"}
    }
   transactionData.image = imageUploadRes.data;
}

const transactionRef = id?doc(firestore,"transactions",id):
doc(firestore,"transactions")

await setDoc(transactionRef,transactionData,{merge:true})
     return{success:true,data:{...transactionData,id:transactionRef.id}}
        }catch(err:any){
    console.log("Error creating or updating wallet",err)
    return{success:false,msg:err.message}
        }
}

const updateWalletForNewTransaction =async(
    walletId:string,
    type:string,
    amount:number
)=>{

    try{
const walletRef = doc(firestore, "wallets",walletId)
const walletSnapshot = await getDoc(walletRef)
if(!walletSnapshot.exists()){
    console.log("Error updating wallet for new transaction")
return{success:false,msg:"Wallet not found"}
}
const walletData = walletSnapshot.data() as WalletType

if(type == "expense" && walletData.amount! - amount<0){
    return{success:false,msg:"Selected wallet don't have enough balance"}
}

const updateType = type == "income"?"totalIncome":"totalExpense";
const updatedWalletAmount = type == "income" ? 
Number(walletData.amount)+amount:
Number(walletData.amount)-amount
   
const updatedTotals = type == "income" ? 
Number(walletData.totalIncome)+amount:
Number(walletData.totalExpenses)+amount
   await updateDoc(walletRef,{
    amount:updatedWalletAmount,
    [updateType] :updatedTotals
   })
return{success:true}


}catch(err:any){
console.log("Error updating wallet for new transaction",err)
return{success:false,msg:err.message}
}
}