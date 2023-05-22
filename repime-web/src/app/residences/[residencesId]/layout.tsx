import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";
import Navbar from "@/app/components/navbar/Navbar";

export default async function ResidenceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const currentUser = await getCurrentUser();
    return (
        <>
            <Navbar msg={"Cadastre sua vaga"} currentUser={currentUser} />
            <ResidenceModal currentUser={currentUser}/>
            <AddButton label={"+"}/>
            {children}
        </>
    );
  }