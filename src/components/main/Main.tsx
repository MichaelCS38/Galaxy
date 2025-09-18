import React from "react";
import { Layout } from "antd";
import Header from "../common/Header";

import './style.scss';

const { Content } = Layout;
function Main({ children }: any) {

    return (

        <Layout>
            <Header />
            <Content className="content-children">{children}</Content>
        </Layout>
    );
}

export default Main;
