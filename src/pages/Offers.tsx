import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import OfferCard from "../components/OfferCard";
import { OffersModal } from "../components/OffersModal";
import { useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";

export const Offers = () => {
  const [offersLoading, setOffersLoading] = useState(true);

  return (
    <>
      {offersLoading && (
        <LoadingComponent title="Just a movement, Loading Offers..." />
      )}

      {!offersLoading && (
        <Container>
          {/* <Grid container direction="row">
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
        </Grid> */}
        </Container>
      )}
    </>
  );
};
