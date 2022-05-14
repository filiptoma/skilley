import { Route, Routes } from "react-router-dom";

import RDashboard from "../routes/RDashboard";
import RHome from "../routes/RHome";
import RNewTest from "../routes/RNewTest";
import RProtected from "../routes/RProtected";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<RHome />} />
            <Route path="app">
                <Route index element={<RProtected child={<RDashboard />} />} />
                <Route path="new" element={<RProtected child={<RNewTest />} />} />
            </Route>
        </Routes>
    );
};

export default Router;
