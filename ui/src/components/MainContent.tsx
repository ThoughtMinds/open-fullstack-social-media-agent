import React from "react";
import Dashboard from "@/components/view/Dashboard";
import Schedule from "@/components/view/Schedule";
import DetailsPage from "./view/DetailsPage";
// import Settings from "@/components/view/Settings";

type ContentType = "dashboard" | "schedule" | "settings"| "detailsPage";

interface MainContentProps {
  contentType: ContentType;
}

const MainContent = ({ contentType }: MainContentProps) => {
  let Content;
  switch (contentType) {
    case "schedule":
      Content = Schedule;
      break;
    // case "settings":
    //   Content = Settings;
    //   break;
    case "detailsPage":
          Content = DetailsPage;
          break;
    case "dashboard":
    default:
      Content = Dashboard;
      break;
  }

  return <Content />;
};

export default MainContent;