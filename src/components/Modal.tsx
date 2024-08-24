import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  width: "30%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  boxShadow: 24,
  padding: "2%",
  borderRadius: "10px"
};

export default function ModalComponent({
  open,
  handleClose,
  children
}: {
  open: boolean;
  handleClose: any;
  children: any;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>{children}</Box>
      </Modal>
    </div>
  );
}
