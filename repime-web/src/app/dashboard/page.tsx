import getCurrentUser from "@/app/actions/getCurrentUser";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import TopCards from "@/app/components/TopCards";
import BarChart from "@/app/components/BarChart";
import Container from "@/app/components/Container";
import MostViewedPlaces from "@/app/components/MostViewedPlaces";
import getPlacesDashboard from "../actions/getPlacesDashboard"
import getDashboardStats from "../actions/getDashboardStats"
import getDeletedPlaces from "../actions/getDeletedPlaces";

const dashboardPage = async () => {
    const currentUser = await getCurrentUser();
    const places = await getPlacesDashboard();
    const stats = await getDashboardStats();
    const deletedPlaces = await getDeletedPlaces();

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
                    <main className='min-h-screen'>
                        <TopCards data={stats!} />
                        <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                            <BarChart data={deletedPlaces!} />
                            <MostViewedPlaces data={places} />
                        </div>
                    </main>
                </Container>
            </ClienteOnly>
        </>
    );
}

export default dashboardPage;