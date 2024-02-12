import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function GamingsListingPage({ value, handleChange }) {
  return (
    <Tabs
      value={value}
      TabIndicatorProps={{
        sx: {
          backgroundColor: "#d80a00",
          color: "#d90a00",
        },
      }}
      onChange={handleChange}
      // textColor="red"
      // indicatorColor="tertiary"
    >
      <Tab
        sx={{
          "& .Mui-Tab-label": {
            color: "red", // Or a color from your theme palette
            fontWeight: "bold",
          },
          "&.Mui-selected": {
            fontWeight: "bold",
            color: "red", // Optional contrast color for selected state
          },
        }}
        value="one"
        label="Gaming Desks"
      />
      <Tab
        sx={{
          "& .Mui-Tab-label": {
            fontWeight: "bold",
            color: "red", // Or a color from your theme palette
          },
          "&.Mui-selected": {
            fontWeight: "bold",
            color: "red", // Optional contrast color for selected state
          },
        }}
        value="two"
        label="Gaming Chairs"
      />
      <Tab
        sx={{
          "& .Mui-Tab-label": {
            color: "red", // Or a color from your theme palette
            fontWeight: "bold",
          },
          "&.Mui-selected": {
            fontWeight: "bold",
            color: "red", // Optional contrast color for selected state
          },
        }}
        value="three"
        label="Gaming Headsets"
      />
      <Tab
        sx={{
          "& .Mui-Tab-label": {
            color: "red", // Or a color from your theme palette
            fontWeight: "bold",
          },
          "&.Mui-selected": {
            fontWeight: "bold",
            color: "red", // Optional contrast color for selected state
          },
        }}
        value="four"
        label="Gaming Mice & Keyboards"
      />
    </Tabs>
  );
}
