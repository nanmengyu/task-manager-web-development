import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const TaskItem = ({task}) => {
    const [status, setStatus] = useState(task.status);

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
    
    return (
        <div style={{marginBottom:"15px", padding:"10px",border:"1px solid #ddd"}}>
            <h3>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </h3>
            <p>{task.description}</p>
            <p>优先级:{task.priority}</p>
            <button onClick={toggleStatus}>
                {status === "pending" ? "未完成" :"已完成"}
            </button>
        </div>
    );
};

export default TaskItem;