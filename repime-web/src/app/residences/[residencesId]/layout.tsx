import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";

export default async function ResidencesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const currentUser = await getCurrentUser();
    return (
        <>
            <ResidenceModal currentUser={currentUser}/>
            <AddButton label={"+"}/>
            {children}
        </>
    );
  }