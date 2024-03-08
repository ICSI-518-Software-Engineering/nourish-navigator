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
import { InboxIcon, MailIcon } from "lucide-react";

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
            borderRight: "0.5px solid white",
            top: "4rem",
            bottom: 0,
            height: "calc(100vh - 4rem)",
          },
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
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
const sidebarLinks = [{}];
