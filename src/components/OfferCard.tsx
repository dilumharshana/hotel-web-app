import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";

export default function OfferCard({
  offer,
  handleOpenEditOffer
}: {
  offer: Object;
  handleOpenEditOffer: Function;
}) {
  const [loading, setLoading] = useState(false);

  const handleActivateOffer = async () => {
    try {
      setLoading(true);

      await axios.put("http://127.0.0.1:5000/offer", {
        activation: offer?.IS_ACTIVE ? 0 : 1,
        id: offer?.ID
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async () => {
    try {
      setLoading(true);

      await axios.delete("http://127.0.0.1:5000/offer", { id: offer?.ID });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader
        title={offer?.NAME}
        subheader={`Valid till : ${new Date(
          offer?.ENDING_DATE
        ).toDateString()}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={offer?.THUMBNAIL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {offer?.DESCRIPTION}
        </Typography>
      </CardContent>
      <CardActions>
        <Box mr={2}>
          <Button
            variant="outlined"
            color="success"
            startIcon={<EditIcon />}
            onClick={() => handleOpenEditOffer(offer)}
          >
            Edit
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteOffer}
            disabled={loading}
          >
            Delete
          </Button>
        </Box>
        <Box mr={2}>
          <Button
            variant="outlined"
            startIcon={
              offer?.IS_ACTIVE ? <CloseIcon /> : <PlayCircleFilledWhiteIcon />
            }
            onClick={handleActivateOffer}
            disabled={loading}
          >
            {offer?.IS_ACTIVE ? "End" : "Start"}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
