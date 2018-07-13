import React, { Component } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import Card from './Card';
import Title from './Title';

class Dash extends Component {

  render() {
    return (
      <React.Fragment>
        <Card>
          <Title>
            UX Website Click Tracker
          </Title>
        </Card>
        <Card>
          <Title>
            Clicks
        </Title>
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.elements}
              style={{}} >
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>
            Links
        </Title>
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.clicks}>
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>
            User Agent
        </Title>
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.user_agent}>
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>        
        <Card>
          <Title>
            IP Addresses
        </Title>
          <ResponsiveContainer width='100%' height={300} >
            <BarChart width={800} height={300} data={this.props.ip_addresses}
              style={{ width: '100% !important' }} >
              <XAxis dataKey="key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </React.Fragment>
    )
  }
}

export default Dash;
