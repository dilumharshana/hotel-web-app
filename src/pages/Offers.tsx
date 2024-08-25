import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import OfferCard from "../components/OfferCard";
import { OffersModal } from "../components/OffersModal";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Offers = () => {
  const [offersLoading, setOffersLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedOffer(null);
  };

  useEffect(() => {
    handleLoadOffers();
  }, []);

  const handleLoadOffers = async () => {
    try {
      setOffersLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/offers");
      setOffers(response.data.offers);
    } catch (error) {
      console.log(error);
    } finally {
      setOffersLoading(false);
    }
  };

  const handleOpenEditOffer = (offer: Object) => {
    setOpen(true);
    setSelectedOffer(offer);
  };

  return (
    <>
      <Toaster />

      {offersLoading && (
        <LoadingComponent title="Just a movement, Loading Offers..." />
      )}

      {!offersLoading && (
        <Grid display="flex" justifyContent="end" sm={12} mb={5}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen}
            startIcon={<LocalOfferIcon />}
          >
            {`Create`} Offer
          </Button>
          <OffersModal
            mode={selectedOffer ? "edit" : "create"}
            data={selectedOffer}
            open={open}
            handleClose={handleClose}
            handleLoadOffers={handleLoadOffers}
            toast={toast}
          />
        </Grid>
      )}

      {!offersLoading && offers?.length == 0 && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          className="loading-container"
        >
          <Box mt={2} className="gray-color-font">
            <Typography>You have no offers created.</Typography>
          </Box>
        </Box>
      )}

      {!offersLoading && offers?.length > 0 && (
        <Container>
          <Grid container direction="row">
            <Grid container direction="row" gap={4}>
              {offers?.map((offer) => (
                <Grid>
                  <OfferCard
                    offer={offer}
                    handleOpenEditOffer={handleOpenEditOffer}
                    handleLoadOffers={handleLoadOffers}
                    toast={toast}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
