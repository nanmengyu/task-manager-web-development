import React from "react";
import {Navigate} from "react-router-dom";

// 私有路由组件，检查用户是否已认证
const PrivateRoute = ({isAuthenticated,componet:Compoent}) => {
    return isAuthenticated ? <Compoent />: <Navigate to="/login"/>;
};

export default PrivateRoute;