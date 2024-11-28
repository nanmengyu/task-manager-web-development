import React, {useEffect,useState} from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem"; // 任务项组件
import TaskFilter from "../components/TaskFilter"; // 筛选器组件
import {Link} from "react-router-dom";

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({status:"",priority:""});

    // 获取任务列表
    const fetchTasks = async () => {
        try{
            const response = await axios.get("http://localhost:8000/api/tasks/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                },
                params:{
                    status:filter.status, // 根据状态筛选
                    priority:filter.priority, // 根据优先级筛选

                },
            });
            setTasks(response.data);
        } catch (err){
            console.error("任务列表加载失败:",err);
        }finally{
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();
    },[filter]); // 当筛选条件变化时重新加载任务

    const handleTaskDelete = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }
    return(
        <div style={{padding:"20px"}}>
            <h1>任务列表</h1>
            {/*新增任务按钮，跳转到任务编辑页*/ }
            <Link to="/tasks/new">
                <button>新增任务</button>
            </Link>
            {/*筛选器组件 */}
            <TaskFilter filter={filter} setFilter={setFilter}/>
            {/*加载中提示 */}
            {loading ? (
                <p>加载中...</p>
            ):(
                <div>
                    {/* 如果没有任务 */}
                    {tasks.length === 0 ? (
                        <p>没有任务</p>
                    ):(
                        <div>
                            {tasks.map((task) => (
                                <TaskItem key={task.id} task={task} onTaskDelete={handleTaskDelete}/>
                            ))}
                        </div>
                    )}
                </div>
            )}  
        </div>
    );
};
export default TaskListPage;