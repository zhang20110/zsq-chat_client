interface User {name: string; password: string};
export default function paramsUser(user:User) {
    return user && user.name && user.password; 
}