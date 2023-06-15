import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/residence/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";
import getResidenceUser from "@/app/actions/getResidenceUser";
import ClienteOnly from "@/app/components/ClientOnly";
import ResidencePanel from "@/app/components/residence/ResidencePanel";
import EmptyState from "@/app/components/EmptyState";
import PrivateRoute from "@/app/components/PrivateRoute";
import PlaceModal from "@/app/components/modals/PlaceModal";

export default async function ResidencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const currentResidences = await getResidenceUser(currentUser?.id);
  const path = '/residences/';

  if (!currentUser && !currentResidences) {
    return (
      <ClienteOnly>
        <EmptyState
          title="Não foram encontrados resultados"
          subtitle="Faça o login primeiro" />
      </ClienteOnly>
    );
  }

  return (
    <>
      <PrivateRoute user={currentUser!} route={path} >
        <ClienteOnly>
          <ResidenceModal currentUser={currentUser} />
          <ResidencePanel residences={currentResidences} />
          <PlaceModal />
          <AddButton label={"+"} />
          {children}
        </ClienteOnly>
      </PrivateRoute>

    </>
  );
}