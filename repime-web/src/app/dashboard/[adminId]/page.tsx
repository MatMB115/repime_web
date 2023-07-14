import getCurrentUser from "@/app/actions/getCurrentUser";
import ClienteOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import TopCards from "@/app/components/dashboard/TopCards";
import BarChartDeletedPlaces from "@/app/components/dashboard/BarChartDeletedPlaces";
import BarChartVisitedPlaces from "@/app/components/dashboard/BarChartVisitedPlaces";
import Container from "@/app/components/Container";
import MostViewedPlaces from "@/app/components/dashboard/MostViewedPlaces";
import PieChart from "@/app/components/dashboard/PieChart";
import getPlacesDashboard from "../../actions/getPlacesDashboard"
import getDashboardStats from "../../actions/getDashboardStats"
import getDeletedPlaces from "../../actions/getDeletedPlaces";
import getKitnetRepublica from "../../actions/getKitnetRepublica";
import getVisitedPlaces from "@/app/actions/getVisitedPlaces";


const dashboardPage = async () => {
    const currentUser = await getCurrentUser();
    const places = await getPlacesDashboard();
    const stats = await getDashboardStats();
    const deletedPlaces = await getDeletedPlaces();
    const totalKitnetRepublica = await getKitnetRepublica();
    const visitedPlaces = await getVisitedPlaces()
    
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
                        <div className='flex flex-col md:flex-row gap-4 px-10'>
                            <PieChart data={totalKitnetRepublica!} />
                            <MostViewedPlaces data={places} />
                        </div>
                    </main>
                    <div className='px-3 flex flex-col md:flex-row gap-4 items-center '>
                        <BarChartDeletedPlaces data={deletedPlaces!} />
                        <BarChartVisitedPlaces data={visitedPlaces!} /> 
                    </div>
                </Container>
            </ClienteOnly>
        </>
    );
}

export default dashboardPage;