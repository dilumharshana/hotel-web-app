import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import OfferCard from "../components/OfferCard";
import { OffersModal } from "../components/OffersModal";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Offers = () => {
  const [offersLoading, setOffersLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const isSuperAdmin = JSON.parse(localStorage.getItem('customer_data'))?.role == "super_admin"

  useEffect(() => {
    handleLoadOffers();
  }, []);

  const handleActivateOffer = async (offer: object) => {
    try {
      setLoading(true);

      await axios
        .put("http://127.0.0.1:5000/activate-offer", {
          activation: offer?.IS_ACTIVE ? 0 : 1,
          id: offer?.ID
        })
        .then((res) => {
          const updatedOffers = offers.map((selectedOffer: object) => {
            if (selectedOffer?.ID == offer?.ID) {
              return { ...selectedOffer, IS_ACTIVE: offer?.IS_ACTIVE ? 0 : 1 };
            }
            return selectedOffer;
          });

          console.log("updatedOffers =>", updatedOffers);

          setOffers(updatedOffers);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    try {
      setLoading(true);

      await axios.delete(`http://127.0.0.1:5000/offer/${offerId}`);
    } catch (error) {
      console.log(error);
    } finally {
      toast("Offer deleted successfully !.", {
        icon: "✅"
      });
      handleLoadOffers();
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedOffer(null);
  };

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

  const handleLogOut = () => {
    localStorage.removeItem("customer_data");
    navigate("/");
  };
  return (
    <>
      {/* <h1 className="admin-panel-tab-heading">Hotel Offers</h1> */}

      {!isSuperAdmin && <Box display="flex" justifyContent="flex-end" >
        <Button onClick={handleLogOut} variant="contained" color="warning" style={{ width: "150px", marginBottom: "30px" }}>Log out</Button>
      </Box >}

      <Toaster />

      {offersLoading && (
        <LoadingComponent title="Just a movement, Loading Offers..." />
      )}

      {!offersLoading && (
        <Grid display="flex" justifyContent="end" sm={12} mb={5}>
          <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              startIcon={<LocalOfferIcon />}
              style={{ width: "200px" }}
            >
              {`Create`} Offer
            </Button>
          </Box>
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
                    handleActivateOffer={handleActivateOffer}
                    handleDeleteOffer={handleDeleteOffer}
                    loading={loading}
                    fullWidth={false}
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
