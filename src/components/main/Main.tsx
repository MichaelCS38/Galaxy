import React from "react";
import { Layout } from "antd";
import Header from "../common/Header";
import Footer from "../common/Footer";
import './style.scss';

const { Content } = Layout;
function Main({ children }: any) {

    return (

        <Layout>
            <Header />
            <Content className="content-children">{children}</Content>
            <Footer />
        </Layout>
    );
}

export default Main;
