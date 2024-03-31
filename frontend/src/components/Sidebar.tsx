"use client";

import { DEFAULTS } from "@/lib/constants";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ActivitySquareIcon, CherryIcon, SaladIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: DEFAULTS.sidebarWidth,
        background: "transparent",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DEFAULTS.sidebarWidth,
          boxSizing: "border-box",
          background: "rgba(0, 0, 0, 0.6)",
          // position: "absolute",
          borderRight: "0.2px solid lightgray",
          borderTop: "0.2px solid lightgray",
          top: "4rem",
          bottom: 0,
          height: "calc(100vh - 4rem)",
          zIndex: 2,
        },
      }}
      variant="permanent"
      anchor="left"
      open
    >
      <List sx={{ mt: "1rem" }}>
        {sidebarLinks.map((sidebarLink) => (
          <Link href={sidebarLink.url} key={sidebarLink.label}>
            <ListItem>
              <ListItemButton
                selected={pathname === sidebarLink.url}
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                  borderRadius: "0.5rem",
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
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

/**
 * ======================= CUSTOM COMPONENTS / DATA =======================
 */
const sidebarLinks = [
  {
    icon: <ActivitySquareIcon />,
    label: "Your Activity",
    url: "/dashboard/activity",
  },
  {
    icon: <SaladIcon />,
    label: "Meal Planner",
    url: "/dashboard/meal-planner",
  },
  {
    icon: <CherryIcon />,
    label: "Recipes",
    url: "/dashboard/recipes",
  },
];
