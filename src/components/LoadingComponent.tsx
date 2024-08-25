import { Box, CircularProgress } from "@mui/material";

export const LoadingComponent = ({ title }: { title: string }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className="loading-container"
    >
      <Box>
        <CircularProgress />
      </Box>
      <Box mt={2} className="gray-color-font">
        {title}
      </Box>
    </Box>
  );
};
