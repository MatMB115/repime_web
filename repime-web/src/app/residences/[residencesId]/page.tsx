import ClienteOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";

const residencesPage = async () => {

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