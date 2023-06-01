import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { Residencia } from "@prisma/client"

interface ResidencesBoxProps {
    residence: Residencia | null;
}

const ResidencesBox: React.FC<ResidencesBoxProps> = ({
    residence
}) => {
    
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                {residence ? (
                    
                    <div className="flex flex-col gap-6">
                        <Heading 
                            title={residence.nome}
                            subtitle={`${residence.end_rua} ${residence.end_numero}, ${residence.end_bairro}`}
                        />
                        <div></div>
                    </div>
                ) : (
                    <div 
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        h-screen 
                        text-3xl
                        "
                    >
                        Cadastre sua residência
                        <div className="text-xl text-zinc-400 underline">
                            Não há vagas encontradas
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

export default ResidencesBox;