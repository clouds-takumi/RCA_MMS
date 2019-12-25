import React from 'react';
// import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import logo from '../../assets/logo.png'
import './login.less'
// import { reqLogin } from '../../api'
// import storageUtils from '../../utils/storageUtils'
// import memoryUtils from '../../utils/memoryUtils'

function Login(props) {
    // const user = memoryUtils.user;
    // if (user._id) {
    //     return <Redirect to='/' />
    // }

    const { getFieldDecorator } = props.form;

    const handleSubmit = (e) => {
        e.preventDefault()

        message.success("登陆成功")
        props.history.replace('/admin')

        // props.form.validateFields(async (err, values) => {
        //     const { username, password } = values;
        //     if (!err) {
        //         const result = await reqLogin(username, password);
        //         if (result.status === 0) {
        //             const user = result.data
        //             storageUtils.saveUser(user)
        //             memoryUtils.user = user

        //             props.history.replace('/admin')
        //             message.success("登陆成功")
        //         } else {
        //             message.error(result.msg)
        //         }
        //     } else {
        //         alert(`验证失败, username=${username}, password=${password}`)
        //     }
        // })
    }

    function validatorPwd(rule, value, callback) {
        value = value.trim()
        if (!value) {
            callback('必须输入密码')
        } else if (value.length < 4) {
            callback("密码长度不能小于4位")
        } else if (value.length > 4) {
            callback("密码长度不能大于12位")
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文、数字或下划线组成")
        } else {
            callback()
        }
    }

    return (
        <div className="login">
            <div className="login-header">
                <img src={logo} alt="logo" />
                <h1>React项目：后台管理</h1>
            </div>
            <div className="login-content">
                <h1>管理系统登陆</h1>
                <Form onSubmit={handleSubmit} className="login-form">
                    <h3>邮箱或手机号</h3>
                    <Form.Item>
                        {
                            getFieldDecorator('username',
                                {
                                    rules: [
                                        { required: true, whitespace: true, message: '必须输入用户名' },
                                        { min: 4, message: '用户名不能小于4位' },
                                        { max: 12, message: "用户名不能大于12位" },
                                        {
                                            pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或下划线组成"
                                        }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />,
                                )
                        }
                    </Form.Item>
                    <h3>密码</h3>
                    < Form.Item >
                        {
                            getFieldDecorator('password',
                                {
                                    rules: [{ validator: validatorPwd }],
                                })(
                                    <Input.Password
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                    />)
                        }
                    </Form.Item>
                    <Form.Item >
                        <Checkbox>保持我的登陆状态</Checkbox>
                        <span>忘记密码?</span>
                        <a className="login-form-forgot" href=" ">重置密码</a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                    </Form.Item>

                    <div className='login-form-footer'>
                        <div style={{ color: " #606c80", margiBottom: "16px" }}>扫码登录方式</div>
                    <span>[wx-logo] 个人微信登陆</span>

                    </div>
                </Form>
        </div>

        </div >
    )
}

const WrappedLogin = Form.create()(Login)
export default WrappedLogin;