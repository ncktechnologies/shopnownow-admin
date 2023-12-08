import { lazy } from "react";

const Clients = lazy(() => import("./Clients"));
export const ClientInfo = lazy(() => import("./ClientInfo"));

export default Clients;
