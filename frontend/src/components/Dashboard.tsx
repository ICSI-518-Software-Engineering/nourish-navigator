import { DEFAULTS } from "@/lib/constants";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ActivitySquareIcon, SaladIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <Box>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: DEFAULTS.sidebarWidth,
          background: "transparent",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DEFAULTS.sidebarWidth,
            boxSizing: "border-box",
            background: "transparent",
            position: "absolute",
            borderRight: "0.2px solid lightgray",
            top: "4rem",
            bottom: 0,
            height: "calc(100vh - 4rem)",
          },
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <Box height="2rem" />
        <List>
          {sidebarLinks.map((sidebarLink) => (
            <ListItem key={sidebarLink.label}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  {sidebarLink.icon}
                </ListItemIcon>
                <ListItemText primary={sidebarLink.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Dashboard;

/**
 * ======================= CUSTOM COMPONENTS / DATA =======================
 */
const sidebarLinks = [
  {
    icon: <ActivitySquareIcon />,
    label: "Your Activity",
  },
  {
    icon: <SaladIcon />,
    label: "Meal Planner",
  },
];
