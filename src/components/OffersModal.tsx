import axios from "axios";

import * as Yup from "yup";
import { OfferAndServiceModal } from "./OfferAndServiceModal";

export const OffersModal = ({
  open = false,
  handleClose = () => {},
  mode = "create",
  data = null,
  handleLoadOffers = () => {},
  toast = () => {}
}: {
  open: boolean;
  handleClose: Function;
  mode: string;
  data: Object | null;
  handleLoadOffers: Function;
  toast: Function;
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required")
  });

  const selectedDate = data?.ENDING_DATE
    ? new Date(data?.ENDING_DATE).toLocaleDateString()
    : new Date().toLocaleDateString();

  let isActive = true;

  if (data) {
    isActive = data?.IS_ACTIVE == 1 ? true : false;
  }

  const initialValues = {
    name: data?.NAME ?? "",
    description: data?.DESCRIPTION ?? "",
    isActive: isActive,
    thumbnailUrl: data?.THUMBNAIL ?? "",
    endingDate: selectedDate
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      console.log(values);

      // Handle form submission here
      let response: any = null;

      const payload = {
        ...values,
        isActive: values.isActive === true ? 1 : 0,
        endingDate: new Date(values.endingDate).toLocaleDateString("en-CA")
      };

      if (mode == "create") {
        response = await axios.post("http://127.0.0.1:5000/offer", payload);
      } else {
        response = await axios.put("http://127.0.0.1:5000/offer", {
          ...payload,
          id: data?.ID
        });
      }

      if (response.data.offerId) {
        toast("Offer created successfully !.", {
          icon: "✅"
        });
        handleClose();
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      handleLoadOffers();
    }
  };

  const formType = mode == "create" ? "Create" : "Edit";

  return (
    <OfferAndServiceModal
      open={open}
      handleClose={handleClose}
      formType={formType}
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      selectedDate={selectedDate}
      isActive={isActive}
      modalType="offers"
    />
  );
};
