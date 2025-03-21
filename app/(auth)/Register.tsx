import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import ScreenWrapper from '@/components/screenWrapper'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext'

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("")
  const [isloading, setIsLoading] = useState(false)
  const router = useRouter()
const {register:registerUser} = useAuth()

  const handleSubmit =async ()=>{
if(!emailRef.current || !passwordRef.current|| !nameRef.current){
   Alert.alert("Sign up","Please fill all the fields")
   return
}
setIsLoading(true)
const res = await registerUser(
  emailRef.current,
  passwordRef.current,
  nameRef.current
)
setIsLoading(false)
console.log("register results:",res)
if(!res.success){
  Alert.alert("Sign up",res.msg)
}
 }
  return (
<ScreenWrapper>
<View style={styles.container}>
<BackButton iconSize={28}/>
<View style={{gap:5, marginTop:spacingY._20}}>
  <Typo size={30} fontWeight={"800"}>
    Let's
  </Typo>
  <Typo size={30} fontWeight={"800"}>
    get started
  </Typo>
</View>

{/**form */}
<View style={styles.form}>
<Typo size={16} color={colors.textLighter}>
   Create an account to track your expenses
</Typo>
<Input
placeholder='Enter your name'

icon={<Icons.User size={verticalScale(26)} color={colors.neutral300}
weight='fill' />}
onChangeText={(value)=>{nameRef.current = value}}
/>
<Input
placeholder='Enter your email'
icon={<Icons.At size={verticalScale(26)} color={colors.neutral300}
weight='fill' />}
onChangeText={(value)=>{emailRef.current = value}}
/>
<Input
placeholder='Enter your password'
secureTextEntry
icon={<Icons.Lock size={verticalScale(26)} color={colors.neutral300}
weight='fill' />}
onChangeText={(value)=>{passwordRef.current = value}}
/>


<Button loading={isloading} onPress={handleSubmit}>
  <Typo size={21} fontWeight={"700"} color = {colors.black}
  >
    Sign up 
  </Typo>
</Button>
</View>

{/**Footer */}
<View style={styles.footer}>
<Typo size={15}>Already have an account ?</Typo>
<Pressable onPress={()=>router.navigate("/(auth)/Login")}>
  <Typo size={15} fontWeight={"700"} color={colors.primary}>
    Login
  </Typo>
</Pressable>
</View>
</View>

</ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text
  },
  form:{
    gap:spacingY._20
  },
  forgotPassword:{
    textAlign:"right",
    fontWeight:"500",
    color: colors.text
  },
  footer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:5
  },
  footerText:{
    textAlign:"center",
    color: colors.text,
    fontSize:verticalScale(15)
  }
})