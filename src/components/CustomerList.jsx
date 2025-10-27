import React from "react";
import { List, Card } from "antd";

export default function CustomerList({ customers }) {
  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={customers}
      renderItem={customer => (
        <List.Item>
          <Card title={customer.name}>
            Email: {customer.email} <br />
            Phone: {customer.phone}
          </Card>
        </List.Item>
      )}
    />
  );
}
