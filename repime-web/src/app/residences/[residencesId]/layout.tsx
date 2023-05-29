import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";
import ResidencesBox from "./ResidencesBox";
import getResidenceUser from "@/app/actions/getResidenceUser";

export default async function ResidencesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const currentUser = await getCurrentUser();
    const currentResidence = await getResidenceUser(); 
    return (
        <>  
            <ResidenceModal currentUser={currentUser}/>
            <ResidencesBox />
            <AddButton label={"+"}/>
            {children}
        </>
    );
  }