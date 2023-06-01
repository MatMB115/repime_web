import getCurrentUser from "@/app/actions/getCurrentUser";
import AddButton from "@/app/components/AddButton";
import ResidenceModal from "@/app/components/modals/ResidenceModal";
import ResidencesBox from "./ResidencesBox";
import getResidenceUser from "@/app/actions/getResidenceUser";
import ClienteOnly from "@/app/components/ClientOnly";

export default async function ResidencesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const currentUser = await getCurrentUser();
    const currentResidence = await getResidenceUser(currentUser?.id);
    
    console.log(currentResidence)
    //gambiarra pai, sapoha de array de residencia ta com nada n
    return (
        <>  
          <ClienteOnly>
            <ResidenceModal currentUser={currentUser}/>
            <ResidencesBox residence={currentResidence}/>
            <AddButton label={"+"}/>
            {children}
          </ClienteOnly>           
        </>
    );
  }