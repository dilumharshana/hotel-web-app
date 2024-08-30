import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Box, Button, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

export default function OfferCard({
  offer,
  handleOpenEditOffer,
  loading,
  handleDeleteOffer,
  handleActivateOffer,
  fullWidth = false
}: {
  offer: Object;
  handleOpenEditOffer: Function;
  loading: boolean;
  handleDeleteOffer: (offer: string) => Promise<void>;
  handleActivateOffer: (offer: object) => Promise<void>;
  fullWidth: true | false;
}) {
  return (
    <Card
      sx={{
        maxWidth: fullWidth ? "auto" : 360,
        borderRadius: "10px",
        minWidth: fullWidth ? "100%" : "",
        paddingBottom: "10px",
        marginBottom: "20px"
      }}
    >
      <Box m={1} display="flex" justifyContent="flex-end">
        <Chip
          label={offer?.IS_ACTIVE ? "Active" : "Inactive"}
          color={offer?.IS_ACTIVE ? "success" : "default"}
          size="small"
        />
      </Box>
      <CardHeader
        title={offer?.NAME}
        subheader={
          offer?.ENDING_DATE
            ? `Valid till : ${new Date(offer?.ENDING_DATE).toDateString()}`
            : ""
        }
        style={{
          fontSize: "15px",
          color: "green"
        }}
      />

      {offer?.THUMBNAIL && (
        <CardMedia
          component="img"
          height="194"
          image={offer?.THUMBNAIL}
          alt={`${offer?.NAME} - image`}
          style={{ maxHeight: "300px" }}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Offer Details - </strong>

          {offer?.DESCRIPTION}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="flex-end" style={{ width: "100%" }}>
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
              onClick={() => handleDeleteOffer(offer?.ID)}
              disabled={loading}
            >
              Delete
            </Button>
          </Box>
          <Box mr={2}>
            <Button
              variant={offer?.IS_ACTIVE ? "outlined" : "contained"}
              startIcon={
                offer?.IS_ACTIVE ? <CloseIcon /> : <PlayCircleFilledWhiteIcon />
              }
              color={offer?.IS_ACTIVE ? "inherit" : "success"}
              onClick={() => handleActivateOffer(offer)}
              disabled={loading}
            >
              {offer?.IS_ACTIVE ? "End" : "Start"}
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
