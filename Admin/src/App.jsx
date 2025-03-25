import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddProducts from "./Pages/Products/addProducts";
import AddCategory from "./Pages/AddCategory/addCategory";
import SubCategory from "./Pages/AddCategory/SubCategory";
import Users from "./Pages/Users/users";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Verify from "./Pages/Verify";




const DialogContext = createContext();
export const AuthContext = createContext();

// Animation for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  return (
    <Router>
      <AuthProvider>
        <DialogProvider>
          <AppContent />
        </DialogProvider>
      </AuthProvider>
    </Router>
  );
}

// Authentication Provider
function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
}

// Dialog Provider with Dynamic Content
function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("Dialog");

  const openDialog = (content, title = "Dialog") => {
    setDialogContent(content);
    setDialogTitle(title);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ open, openDialog, closeDialog }}>
      {children}
      <GlobalDialog content={dialogContent} title={dialogTitle} />
    </DialogContext.Provider>
  );
}

// App Layout
function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/Login" || location.pathname === "/Signup" || location.pathname === "/ForgotPassowrd" || location.pathname === "/verify";

  return (
    <div>
      <Header />
      <div className="flex">
        {!hideSidebar && <div className="w-[20%]"><Sidebar /></div>}
        <main className={`pl-${hideSidebar ? "0" : "72"} mt-24 w-full`}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/addCategory" element={<AddCategory />} />
            <Route path="/SubCategory" element={<SubCategory/>} />
            <Route path="/Users" element={<Users/>} />
            <Route path="/ForgotPassowrd" element={<ForgotPassword/>} />
            <Route path="/verify" element={<Verify/>} />
           
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Global Dialog Component
function GlobalDialog({ content, title }) {
  const { open, closeDialog } = useContext(DialogContext);

  return (
    <Dialog fullScreen open={open} onClose={closeDialog} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }} className="!bg-gray-100 shadow-md">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon className="text-black" />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="text-black font-semibold">
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={closeDialog} className="!text-black hover:text-gray-200">
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <div className="p-6">{content}</div>
    </Dialog>
  );
}

export { DialogContext };
export default App;
