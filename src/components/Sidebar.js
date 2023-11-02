import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Inbox, Mail } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Asegúrate de importar Link desde react-router-dom si estás utilizando enrutamiento

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
        </Link>
        <Link to="/inbox" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Bandeja de Entrada" />
          </ListItem>
        </Link>
        <Link to="/sent" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary="Enviados" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
