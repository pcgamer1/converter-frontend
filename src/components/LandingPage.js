import React, { useState, Suspense } from 'react'
import { Menu, Row, Col, PageHeader } from 'antd';
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import {Loading} from './Loading'
// const { SubMenu } = Menu;

export const LandingPage = function ({innerRoutes, routeComponents}) {

    const [current, setCurrent] = useState([])

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
    };

    return (
        <>
          <Row>
						<PageHeader
							title="Universal Converter"
							subTitle="Your one stop solution for API format and schema conversions."
						/>
          </Row>
					<Row>
          <Col span = {8} />
						<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
              {
                innerRoutes.map((route) => {
                  return (
                    <Menu.Item key={route.name} icon={<MailOutlined />}>
                      <Link to={route.path}>{route.name}</Link>
                    </Menu.Item>
                  )
                })
              }
						</Menu>
					</Row> 
					<Row>
            <Col span = {8} />
            <Suspense fallback={<Loading />}>
              {routeComponents}
            </Suspense>
          </Row>
        </>
    );
}