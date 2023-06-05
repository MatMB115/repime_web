import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/residence/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";
import getResidenceUser from "@/app/actions/getResidenceUser";
import ClienteOnly from "@/app/components/ClientOnly";
import ResidencePanel from "@/app/components/residence/ResidencePanel";
import EmptyState from "@/app/components/EmptyState";

export default async function ResidencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const currentResidence = await getResidenceUser(currentUser?.id);

  if (!currentUser && !currentResidence) {
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
      <ClienteOnly>
        <ResidenceModal currentUser={currentUser} />
        <ResidencePanel residences={currentResidence} />
        <AddButton label={"+"} />
        {children}
      </ClienteOnly>
    </>
  );
}