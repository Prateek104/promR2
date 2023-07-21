import styled from "styled-components";
import Hero from "./components/Hero";


const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("./img/bg3.jpg");
  &::-webkit-scrollbar{
    display: none;
  }
`;


const App = () => {
  return (
    
    <Container>
      
      <Hero />
      
    </Container>
  );
}

export default App;
