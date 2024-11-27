import React from "react";

const TaskFilter = ({filter,setFilter}) => {
    // 更新筛选条件
    const handleStatusChange = (e) => {
        setFilter({...filter,status: e.target.value});
    };
    const handlePriorityChange = (e) => {
        setFilter({...filter, priority:e.target.value});
    };
    

    return (
        <div style={{marginBottom: "20px"}}>
            <label>
                状态:
                <select value={filter.status} onChange={handleStatusChange}>
                    <option value="">全部</option>
                    <option value="pending">未完成</option>
                    <option value="completed">已完成</option>
                </select>
            </label>

            <label style={{marginLeft:"10px"}}>
                优先级:
                <select value={filter.priority} onChange={handlePriorityChange}>
                    <option value="">全部</option>
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                </select>
            </label>
        </div>
    );
};

export default TaskFilter;