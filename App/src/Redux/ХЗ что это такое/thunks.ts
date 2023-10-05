// import AuthService from "Redux/!!Services/AuthService";
// import { IUser } from "Types/IUser";


// export default class Store {
//     user = {} as IUser
//     isAuth = false;
// }

// constructor() {
    
// }

// setAuth (boolean){
//     this.isAuth= boolean
// }
// setUser(IUser){
// this.user = user;
// }

// async login (email:string, password:string){
//     try {
//         const response  = await AuthService.login(email,password)
//         localStorage.setItem('token', response.data.accesToken);
//         this.setAuth(true);
//         this.setUser(response.data.user);
//     } catch (e) {
//         console.log(e.response?.data?.message)

//     }
// }
// async registration ( email: string,
//     password: string,
//     id: number,
//     lastName: string,
//     firstName: string,
//     middleName: string,
//     birthDate: date){
//     try {
//         const response  = await AuthService.registration(email,password)
//         localStorage.setItem('token', response.data.accesToken);
//         this.setAuth(true);
//         this.setUser(response.data.user);
//     } catch (e) {
//         console.log(e.response?.data?.message)

//     }
//     async logout (){
//         try {
//             const response  = await AuthService.logout(email,password)
//             localStorage.removeItem('token', response.data.accesToken);
//             this.setAuth(false);
//             this.setUser({}as User);
//         } catch (e) {
//             console.log(e.response?.data?.message)
    
//         }
// }
// }
// }