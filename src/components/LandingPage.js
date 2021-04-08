import React, { useState, Suspense } from 'react'
import { Menu, Row, Col, PageHeader } from 'antd';
import { Link, Route } from 'react-router-dom'

import {Loading} from './Loading'
// const { SubMenu } = Menu;

export const LandingPage = function ({innerRoutes}) {

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
                    <Menu.Item key={route.name} icon={route.icon}>
                      <Link to={route.path}>{route.name}</Link>
                    </Menu.Item>
                  )
                })
              }
						</Menu>
					</Row> 
            <Col span = {8} />
            <Suspense fallback={<Loading />}>
              {innerRoutes.map((route, index) => {
                return (
                  <Route path={`${route.path}`}>
                    <route.Component key={index.toString()} {...route.props} />
                  </Route>
                )
              })}
            </Suspense>
        </>
    );
}