export default function isOwner(currentUser: string, hostUser: string){
    if(currentUser === hostUser){
        return true;
    }else{
        return false;
    }
}