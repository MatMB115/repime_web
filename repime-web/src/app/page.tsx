import getCurrentUser from "./actions/getCurrentUser";
import getPlaces from "./actions/getPlaces";
import ClienteOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PlaceCard from "./components/places/PlaceCard";


export default async function Home() {
  const places = await getPlaces();
  const currentUser = await getCurrentUser();

  if (places.length === 0){
    return(
      <ClienteOnly>
        <EmptyState  
          title="Não há vagas cadastradas" 
          subtitle="Seja o primeiro"
        />
      </ClienteOnly>
    )
  }
  
  return (
    <ClienteOnly>
      <Container>
        <div 
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {places.map((place) => {
            return (
              <div key={place.id_vaga}>
                <PlaceCard
                  currentUser={currentUser}
                  data={place}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </ClienteOnly>
  )
}
