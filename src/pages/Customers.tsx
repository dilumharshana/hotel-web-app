import { Box, Button, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LoadingComponent } from "../components/LoadingComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const Customers = () => {
  const [offersLoading, setOffersLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLoadOffers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedOffer(null);
  };

  const handleActivateOffer = async (offer: object) => {
    try {
      setLoading(true);

      await axios
        .put("http://127.0.0.1:5000/customer", {
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

      await axios.delete(`http://127.0.0.1:5000/customer/${offerId}`);
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

  const handleLoadOffers = async () => {
    try {
      setOffersLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/customer");
      setOffers(response.data.customers);
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
        <LoadingComponent title="Just a movement, Loading customers..." />
      )}

      {!offersLoading && offers?.length == 0 && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          className="loading-container"
        >
          <Box mt={2} className="gray-color-font">
            <Typography>You have no customers registered.</Typography>
          </Box>
        </Box>
      )}

      {!offersLoading && offers?.length > 0 && (
        <Container >
          <Grid container direction="row">
            <Grid container direction="row" gap={4}>
              {offers?.map((offer) => (
                <Grid style={{ width: "100%", padding: "30px", border: "1px solid gray", borderRadius: "10px" }}>
                  <CardContent>
                    <Typography variant="h4" color="text.secondary">
                      <strong>{offer?.NAME}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p>Email - {offer?.EMAIL}</p>
                      <p>Contact Number - {offer?.CONTACT_NUMBER}</p>
                    </Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="flex-end" style={{ width: "100%" }}>

                    <Box mr={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteOffer(offer?.ID)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    </Box>

                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
