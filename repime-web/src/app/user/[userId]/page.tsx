import getCurrentUser from "@/app/actions/getCurrentUser";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PrivateRoute from "@/app/components/PrivateRoute";
import UserPanel from "@/app/components/UserPanel";
import UserUpdateModal from '@/app/components/modals/UserUpdateModal'

const userPage = async () => {
    const currentUser = await getCurrentUser();
    const path = '/user/'
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
        <PrivateRoute user={currentUser} route={path}>
            <ClienteOnly>
                <UserPanel currentUser={currentUser} /> 
                <UserUpdateModal currentUser={currentUser} />
            </ClienteOnly>
        </PrivateRoute>
        
    );
}
 
export default userPage;