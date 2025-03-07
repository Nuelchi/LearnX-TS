import { Iuser } from "../Interface/user.interface";
import bcrypt from "bcrypt"
import user from "../Model/user.model";


export class UserService {
    async signUp(data:Iuser): Promise<Iuser>{
        const existingUser=await user.findOne({email: data.email})
        if (existingUser){
          throw new Error("user alredy exists")
        }
        const newUser= new user(data)
        return await newUser.save();
      };

    async signIn(data: { email: string; password: string }) {
        const Newuser = await user.findOne({ email: data.email });
        if (!Newuser || !(await bcrypt.compare(data.password, Newuser.password))) {
            throw new Error('Invalid credentials');
        }
    };

    //get all user


    //   async updateUser(user:Iuser):Promise<Iuser|null>{
    //     return await userModel.findOneAndUpdate({email:user.email},user,{new:true})
    //   }
};