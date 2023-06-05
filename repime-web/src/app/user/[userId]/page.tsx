import getCurrentUser from "@/app/actions/getCurrentUser";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import UserPanel from "./UserPanel";

const userPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (
            <ClienteOnly>
                <EmptyState 
                title="Não foram encontrados resultados"
                subtitle="Faça o login primeiro"/>
            </ClienteOnly>
        );
    }
    
    return ( 
        <ClienteOnly>
            <UserPanel 
                currentUser={currentUser}
            />          
        </ClienteOnly>
    );
}
 
export default userPage;