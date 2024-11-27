import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const TaskEditPage = () => {
    const [taskId] = useParams();
    const navigate = useNavigate();

    const [taskData,setTaskData] = useState({
        title:"",
        description:"",
        status:"未完成",
        priority:"中",  
    });
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    // 获取现有任务数据（编辑模式）
    useEffect(() => {
        if (taskId){
            const fetchTask = async () => {
                try{
                    setLoading(true);
                    const response = await axios.get(`http://localhost:8000/api/tasks/$(taskId)/`,{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                        },
                    });
                    setTaskData(response.data);
                }catch(err){
                    setError("加载任务数据失败");
                }finally{
                    setLoading(false);
                }
            };
            fetchTask();
        }
    },[taskId]);
    
    // 提交表单（新增或更新任务）
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            if (taskId){
                // 更新任务
                await axios.put(`http//localhost:8000/api/tasks/${taskId}/`,taskData,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
            }else{
                // 新增任务
                await axios.post(`http://localhost:8000/api/tasks/`,taskData,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
            }
            navigate("/tasks"); // 提交后跳转到任务列表页面
        }catch(err){
            setError("提交任务失败")
        }finally{
            setLoading(false);
        }
    };

    // 表单字段处理
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setTaskData({...taskData,[name]:value});
    };
    return (
        <div style={{padding:"20px"}}>
            <h1>{taskId ? "编辑任务":"创建任务"}</h1>
            {loading ? (
                <p>加载中...</p>
            ):error ? (
                <p style={{color:"red"}}>{error}</p>
            ):(
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>标题:</label>
                        <input
                            type="text"
                            name="title"
                            value={taskData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <lable>描述:</lable>
                        <textarea
                            name="description"
                            value={taskData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <lable>状态:</lable>
                        <select name="status" value={taskData.status} onChange={handleChange}>
                            <option value="pending">未完成</option>
                            <option value="completed">已完成</option>
                        </select>
                    </div>
                    <div>
                        <lable>优先级:</lable>
                        <select name="priority" value={taskData.priority} onChange={handleChange}>
                            <option value="high">高</option>
                            <option value="medium">中</option>
                            <option value="low">低</option>
                        </select>
                    </div>
                    <button type="submit" style={{marginTop:"20px"}}>
                        提交
                    </button>
                </form>
            )}
        </div>
    );
};
export default TaskEditPage;