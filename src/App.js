import React,{useEffect,useState} from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import TaskEditPage from "./pages/TaskEditPage";
import PrivateRoute from "./components/PrivateRoute"; //私有路由组件

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/tasks" element={<TaskListPage/>}/>
      </Routes>
    </Router>
  );
}
// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
//   // 检查 token 的有效性（可选）
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       // 可解码 token 并检查有效性，例如：使用 jwt-decode 检查过期时间
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route 
//           path="/tasks"
//           element={<PrivateRoute isAuthenticated={isAuthenticated} componet={TaskListPage}/>}
//         />
//         <Route
//           path="/tasks/1"
//           element={<PrivateRoute isAuthenticated={isAuthenticated} componet={TaskEditPage}/>}
//         />
//         <Route path="*" element={<Navigate to={isAuthenticated ? "/tasks":"/login"}/>}/>
//       </Routes>
//     </Router>
//   );
// };
export default App;