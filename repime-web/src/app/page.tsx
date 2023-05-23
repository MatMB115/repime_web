import ClienteOnly from "./components/ClientOnly";
import Container from "./components/Container";

export default function Home() {
  return (
    <ClienteOnly>
      <Container>
        <div>RepiME</div>
      </Container>
    </ClienteOnly>
  )
}
