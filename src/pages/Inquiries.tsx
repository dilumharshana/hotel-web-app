import { Box, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LoadingComponent } from "../components/LoadingComponent";

export const Inquiries = () => {
  const [offersLoading, setOffersLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Object | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleLoadOffers();
  }, []);

  const handleLoadOffers = async () => {
    try {
      setOffersLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/inquiry");
      setOffers(response.data.inquiries);
    } catch (error) {
      console.log(error);
    } finally {
      setOffersLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      {offersLoading && (
        <LoadingComponent title="Just a movement, Loading Inquiries..." />
      )}

      {!offersLoading && offers?.length == 0 && (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          className="loading-container"
        >
          <Box mt={2} className="gray-color-font">
            <Typography>You have no Inquiries registered.</Typography>
          </Box>
        </Box>
      )}

      {!offersLoading && offers?.length > 0 && (
        <Container>
          <Grid container direction="row">
            <Grid container direction="row" gap={4}>
              {offers?.map((offer) => (
                <Grid style={{ width: "100%" }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Name - {offer?.NAME}</strong>

                      <p>
                        <strong>Inquiry - {offer?.inquiry}</strong>
                      </p>
                      <p>Email - {offer?.EMAIL}</p>
                      <p>Contact Number - {offer?.contact_number}</p>
                    </Typography>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
