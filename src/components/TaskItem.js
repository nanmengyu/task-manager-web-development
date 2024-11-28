import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const TaskItem = ({task,onTaskDelete}) => {
    const [status, setStatus] = useState(task.status);
    const priorityMap = {
        high:"高",
        medium:"中",
        low:"低",
    }
    // 切换任务状态
    const toggleStatus = async () => {
        try{
            const updatedStatus = status === "pending" ? "completed":"pending";
            await axios.patch(
                `http://localhost:8000/api/tasks/${task.id}/`,
                {status:updatedStatus},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setStatus(updatedStatus);
        }catch(err){
            console.error("更新任务状态失败",err);
        }
    };

    const deleteTask = async () => {
        try{
            await axios.delete(
                `http://localhost:8000/api/tasks/${task.id}/`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            if (onTaskDelete) onTaskDelete(task.id);
        }catch (err){
            console.error("删除任务失败",err);
        }
    };

    return (
        <div style={{marginBottom:"15px", padding:"10px",border:"1px solid #ddd"}}>
            <h3>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </h3>
            <p>{task.description}</p>
            <p>优先级:{priorityMap[task.priority]}</p>
            <button onClick={toggleStatus}>
                {status === "pending" ? "未完成" :"已完成"}
            </button>
            <button onClick={deleteTask} style={{backgroundColor:"red",color:"white"}}>
                删除
            </button>
        </div>
    );
};

export default TaskItem;