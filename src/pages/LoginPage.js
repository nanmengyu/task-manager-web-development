import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // 表单校规则
    const validationSchema = Yup.object().shape({
        username:Yup.string().required("用户名不能为空"),
        password:Yup.string().required("密码不能为空"),
    });

    // 提交表单逻辑
    const handleSubmit = async (values,{ setSubmitting}) =>{
        try{
            const response = await axios.post("http://localhost:8000/api/users/login/",{
                username:values.username,
                password:values.password,

            });
            // 将 JWT 令牌存储到 localStorage
            localStorage.setItem("access_token",response.data.access);
            localStorage.setItem("refresh_token",response.data.refresh);
            setError("");//清除之前的错误信息
            navigate("/tasks");//跳转到任务列表页面
        }catch(err){
            setError("登录失败，请检查用户名和密码");
        }
        setSubmitting(false); //表单提交结束
    };

    return  (
        <div style={{maxWidth:"400px",margin:"50px auto",textAlign:"center"}}>
            <h1>登录</h1>
            {error && <div style={{color:"red",marginBottom:"10px"}}>{error}</div>}
            <Formik
                initialValues={{username:"",password:""}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div style={{marginBottom:"10px"}}>
                            <label htmlFor="username">用户名:</label>
                            <Field type="text" name="username" placeholder="输入用户名"/>
                            <ErrorMessage name="username" component="div" style={{color:"red"}}/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label htmFor="password">密码:</label>
                            <Field type="password" name="password" placeholder="输入密码"/>
                            <ErrorMessage name="password" component="div" style={{color:"red"}}/>
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "提交中...":"登录"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );

};
export default LoginPage;