import { Button, Container, Grid } from "@mui/material";
import OfferCard from "../components/OfferCard";
import { OffersModal } from "../components/OffersModal";

export const Offers = () => {
  return (
    <>
      <Container>
        <Grid container direction="row">
          <Grid display="flex" justifyContent="end" sm={12} mb={5}>
            <OffersModal />
          </Grid>
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
        </Grid>
      </Container>
    </>
  );
};
