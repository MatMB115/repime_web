import { Residencia } from "@prisma/client";
import Container from "../Container";
import ResidencesBox from "./ResidencesBox";
import EmptyState from "../EmptyState";

interface ResidencePanelProps {
    residences: Residencia[] | null;
}

const ResidencePanel: React.FC<ResidencePanelProps> = ({
    residences
}) => {
    if(!residences){
        return(
            <EmptyState 
                title="Não foram encontrados resultados"
                subtitle="Cadastre uma nova residência"
            />
        );
    }
    return (
        <Container>
            <div>
                {residences.map((item)=>(
                    <ResidencesBox
                    residence={item}
                    />
                ))}
            </div>
        </Container>
        
    );
}
 
export default ResidencePanel;