import { CardsList } from "@/components";
import { Container, Header, Form } from "@/components/ui/";
import { Main } from "@/components/ui/Main";

export const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <Main>
          <Form />
          <CardsList />
        </Main>
      </Container>
    </>
  );
};
