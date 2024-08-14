import { Container, Grid } from "@mui/material";
import OfferCard from "../components/OfferCard";
import Navbar from "../components/NavBar";

export const Offers = () => {
  return (
    <>
      <Navbar title="Offers"/>
      <Container>
        <Grid container direction="row" gap={4}>
          <Grid>
            <OfferCard />
          </Grid>
          <Grid>
            <OfferCard />
          </Grid>
          <Grid>
            <OfferCard />
          </Grid>
          <Grid>
            <OfferCard />
          </Grid>
          <Grid>
            <OfferCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
