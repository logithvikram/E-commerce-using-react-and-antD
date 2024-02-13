import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Table, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCart } from '../API/Index';

const Header = () => {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`)
  }

  return (
    <div className="appHeader">
      <Menu onClick={onMenuClick} mode="horizontal">
        <Menu.Item key="">
          <HomeFilled />
        </Menu.Item>
        <Menu.SubMenu title="Men" key="men">
          <Menu.Item key="mens-shirts">Men's Shirts</Menu.Item>
          <Menu.Item key="mens-shoes">Men's Shoes</Menu.Item>
          <Menu.Item key="mens-watches">Men's Watches</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="Women" key="women">
          <Menu.Item key="womens-dresses">Women's Dresses</Menu.Item>
          <Menu.Item key="womens-shoes">Women's Shoes</Menu.Item>
          <Menu.Item key="womens-watches">Women's Watches</Menu.Item>
          <Menu.Item key="womens-bags">Women's Bags</Menu.Item>
          <Menu.Item key="womens-jewellery">Women's Jewellery</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="fragrances">Fragrances</Menu.Item>
      </Menu>
      <Typography.Title>Store</Typography.Title>
      <AppCart />
    </div>
  )
}

function AppCart() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [CheckOutOpen,setCheckOutOpen] = useState(false);

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  const onConfirmOrder = (value)=>{
    console.log({value});
    setCartOpen(false);
    setCheckOutOpen(false);
    message.success("Your Order Had been Placed")
  }

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity, total: item.price * quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  return (
    <div>
      <Badge onClick={() => setCartOpen(true)} count={cartItems.length} className='shoppingCartIcon'>
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            { title: 'Title', dataIndex: 'title' },
            { title: 'Price', dataIndex: 'price', render: (value) => <span>${value}</span> },
            {
              title: 'Quantity',
              dataIndex: 'quantity',
              render: (value, record) => (
                <InputNumber
                  min={0}
                  value={value}
                  onChange={(quantity) => updateCartItemQuantity(record.id, quantity)}
                />
              ),
            },
            { title: 'Total', dataIndex: 'total', render: (value) => <span>${value}</span> },
          ]}
          dataSource={cartItems}
          summary={(data) => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>Total:</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>${getTotalPrice()}</Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
        <Button onClick={()=>{
          setCheckOutOpen(true);
        }}type='primary'> CheckOut Your Cart</Button>
      </Drawer>
      <Drawer open={CheckOutOpen} onClose={()=>{
        setCheckOutOpen(false);
      }}
      title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
        <Form.Item
  label='Full Name'
  name='full_name'
  rules={[
    {
      required: true,
      message: "Please enter your full name",
    },
  ]}
>
  <Input placeholder="Enter your full name"/>
</Form.Item>

<Form.Item
  label='Email'
  name='email'
  rules={[
    {
      required: true,
      type:'email',
      message: "Please enter a valid email",
    },
  ]}
>
  <Input placeholder="Enter your Email"/>
</Form.Item>

<Form.Item 
  label='Address'
  name='address'
  rules={[
    {
      required: true,
      message: "Please enter your address",
    },
  ]}
>
  <Input placeholder="Enter your address"/>
</Form.Item>

          <Form.Item>
            <Checkbox defaultChecked={true} disabled>
                  Cash On Delivery
            </Checkbox>
          </Form.Item>
          <Button type="primary" htmlType='submit'> Confirm Order</Button>
        </Form>

      </Drawer>
    </div>
  );
}

export default Header;
