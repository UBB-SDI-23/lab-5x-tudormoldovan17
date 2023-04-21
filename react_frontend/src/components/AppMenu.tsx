import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute" >
                <Toolbar>
                    <IconButton
                        component={Link}
                        to="/"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="school"
                        sx={{ mr: 2 }}>
                        <SchoolIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ mr: 5 }}>
                        App management
                    </Typography>
                    <Button
                        variant={path.startsWith("/cities") ? "outlined" : "text"}
                        to="/cities"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Cities
                    </Button>
                    <Button
                        variant={path.startsWith("/tourists") ? "outlined" : "text"}
                        to="/tourists"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Tourists
                    </Button>
                    <Button
                        variant={path.startsWith("/citizens") ? "outlined" : "text"}
                        to="/citizens"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Citizens
                    </Button>
                    <Button
                        variant={path.startsWith("/countries") ? "outlined" : "text"}
                        to="/countries"
                        component={Link}
                        color="inherit"
                        sx={{ mr: 5 }}
                        startIcon={<LocalLibraryIcon />}>
                        Countries
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
