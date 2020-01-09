import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'
import storageUtils from '../utils/storageUtils'
import { Layout, Menu, Icon, Modal } from 'antd'
import './admin-layout.less';
import LinkButton from '../components/link-button'
import { menuLists } from '../routers'

import Home from '../pages/home'
// import Products from '../pages/admin-product/products'
// import ProductDetail from '../pages/admin-product/detail'
// import AddUpdateProduct from '../pages/admin-product/add_update'
// import GenPageWithMobile from '../pages/gen-page/mobile'
// import Role from '../pages/role'
// import User from '../pages/user/user'


const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // collapsed: false
        }
        this.menuNodes = this.getMenuNodes(menuLists)
    }

    logout = () => {
        let that = this;
        Modal.confirm({
            title: '确认退出吗',
            onOk() {
                storageUtils.removeUser();
                that.props.history.replace('/');
            },
            onCancel() { }
        })
    }

    getMenuNodes = (menuLists) => {
        const selectedKey = this.props.location.pathname;
        return menuLists.map(item => {
            if (!item.children) {
                if (item.round) {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key} ><Icon type={item.icon} /><span>{item.title}</span></Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key} ><span>{item.title}</span></Link>
                        </Menu.Item>
                    )
                }
            } else {
                const cItem = item.children.find(cItem => cItem.key === selectedKey)
                if (cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

    onCollapse = (collapsed) => { this.setState({ collapsed }) }


    render() {
        if (!storageUtils.getUser().username) { return <Redirect to='/' /> };
        // const { collapsed } = this.state;
        let selectedKey = this.props.location.pathname;
        if (selectedKey.indexOf('/product') === 0) { selectedKey = '/product' }

        return (
            <Layout>
                <Header className="header">
                    <div className='header-left-wrap'>项目</div>
                    <div className='header-content'></div>
                    <div className='header-right'>
                        <button className='avatar' size={30}>{storageUtils.getUser().username}</button>
                        <LinkButton onClick={this.logout}>退出</LinkButton>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        className='sider'
                        width={180}
                        theme="light"
                    // collapsible
                    // collapsed={collapsed}
                    // onCollapse={this.onCollapse}
                    >
                        <Menu
                            mode='inline'
                            theme='light'
                            defaultOpenKeys={[this.openKey]}
                            selectedKeys={[selectedKey]}
                        >
                            {
                                this.menuNodes
                            }
                        </Menu>
                    </Sider>
                    <Layout >
                        <Content className='content'>
                            <Switch>
                                <Route path='/admin/home' component={Home} />
                                {/* <Route path='/admin/products' component={Products} />
                                <Route path='/admin/product/detail' component={ProductDetail} />
                                <Route path='/admin/reproduct' component={AddUpdateProduct} />
                                <Route path='/gen-page/mobile' component={GenPageWithMobile} />
                                <Route path='/admin/user' component={User} />
                                <Route path='/admin/role' component={Role} /> */}
                                <Redirect to='/admin/home' />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(Admin);