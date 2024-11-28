import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const [success, setSuccess] = useState("");

    //表单校验规则
    const validationSchema = Yup.object().shape({
        username:Yup.string()
            .required("用户名不能为空")
            .min(3,"用户名至少需要3个字符"),
        password: Yup.string()
            .required("密码不能为空")
            .min(6,"密码至少需要6个字符"),
        confirmPassword:Yup.string()
            .required("请确认密码")
            .oneOf([Yup.ref("password")],"两次输入的密码不一致"),
    });

    //提交表单逻辑
    const hadnleSubmit = async (values,{setSubmitting}) => {
        try {
            await axios.post("http://localhost:8000/api/users/register/",{
                username:values.username,
                password:values.password,
            });
            setError(""); //清除错误信息
            setSuccess("注册成功！请前往登录页面。");
            setTimeout(() => navigate("/login"),3000);
        }catch (err){
            setError("注册失败，请检查用户名是否已被使用");
            setSuccess("");
        }
        setSubmitting(false);
    };

    return (
        <div style={{maxWidth:"400px",margin:"50px auto",textAlign:"center"}}>
            <h1>注册</h1>
            {error && <div style={{color:"red",marginBottom:"10px"}}>{error}</div>}
            {success && <div style={{color:"green",marginBottom:"10px"}}>{success}</div>}
            <Formik
                initialValues={{username:"",password:"",confirmPassword:""}}
                validationSchema={validationSchema}
                onSubmit={hadnleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div style={{marginBottom:"10px"}}>
                            <label htmlFor="username">用户名</label>
                            <Field type="text" name="username" placeholder="请输入用户名"/>
                            <ErrorMessage name="username" component="div" style={{color: "red"}}/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <lable htmlFor="password">密码</lable>
                            <Field type="password" name="password" placeholder="输入密码"/>
                            <ErrorMessage name="password" component="div" style={{color:"red"}}/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label htmlFor="confirmPassword">确认密码:</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="再次输入密码"
                            />
                            <ErrorMessage 
                                name="confirmPassword"
                                component="div"
                                style={{color:"red"}}
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting?"提交中...":"注册"}
                        </button>
                        
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default RegisterPage;