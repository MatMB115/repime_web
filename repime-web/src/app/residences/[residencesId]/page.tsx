import getCurrentUser from "@/app/actions/getCurrentUser";
import getResidenceUser from "@/app/actions/getResidenceUser";
import ClienteOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

const residencesPage = async () => {
    const currentUser = await getCurrentUser();
    const currentResidence = await getResidenceUser()
    if (!currentUser) {
        return (
            <ClienteOnly>
                <EmptyState />
            </ClienteOnly>
        )
    }
    return ( 
        <>
        <ClienteOnly>
            <Container>
                <div></div>
            </Container>
        </ClienteOnly>
        </>
    );
}
 
export default residencesPage;