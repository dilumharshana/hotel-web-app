import { Box, Button, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LoadingComponent } from "../components/LoadingComponent";

export const Inquiries = () => {
  const [inquirysLoading, setinquirysLoading] = useState(true);
  const [inquirys, setinquirys] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedinquiry, setSelectedinquiry] = useState<Object | null>(null);


  useEffect(() => {
    handleLoadinquirys();
  }, []);

  const handleLoadinquirys = async () => {
    try {
      setinquirysLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/inquiry");

      if (response?.data?.status == "success") {
        handleLoadinquirys()
      }
      setinquirys(response.data.inquiries);
    } catch (error) {
      console.log(error);
    } finally {
      setinquirysLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      {inquirysLoading && (
        <LoadingComponent title="Just a movement, Loading Inquiries..." />
      )}

      {!inquirysLoading && inquirys?.length == 0 && (
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

      {!inquirysLoading && inquirys?.length > 0 && (
        <Container>
          <Grid container direction="row">
            <Grid container direction="row" gap={4}>
              {inquirys?.map((inquiry) => (
                <Inquiry inquiry={inquiry} />
              ))}
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};


const Inquiry = ({ inquiry }) => {

  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSendReply = async () => {
    try {
      setLoading(true)
      const response = await axios.post('http://127.0.0.1:5000/reply-inquiry', {
        reply,
        customerEmail: inquiry?.EMAIL,
        inquiryId: inquiry?.ID
      })
    } catch (error) {
      console.log("error =>", error);
    }
    finally {
      setLoading(false)
    }
  }

  return <Grid style={{ width: "100%", padding: "30px", border: "1px solid gray", borderRadius: "10px" }}>
    <CardContent>
      <Typography variant="h5" color="text.secondary">
        <strong>Customer - {inquiry?.NAME}</strong>


      </Typography>
      <p>Email - {inquiry?.EMAIL}</p>
      <p>Contact Number - {inquiry?.contact_number}</p>
      <br />
      <p>
        <strong>Inquiry - </strong> {inquiry?.inquiry}
      </p>
    </CardContent>
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <textarea name="" id="" style={{ width: "100%", height: "200px" }} onChange={(e) => setReply(e.target.value)}></textarea>
      <Button variant="contained" color="success" style={{ width: '200px', marginTop: "10px" }} onClick={handleSendReply} disabled={loading}>Send Reply</Button>
    </Box>
  </Grid>
}