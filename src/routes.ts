import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Process from "./pages/Process";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

export default [
  { path: "/", component: Index },
  { path: "/about", component: About },
  { path: "/services", component: Services },
  { path: "/work", component: Work },
  { path: "/process", component: Process },
  { path: "/pricing", component: Pricing },
  { path: "/contact", component: Contact },
];
