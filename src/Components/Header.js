import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons'
import { Menu, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const OnMenuClick=(item)=>{
    navigate(`/${item.key}`)
  }
  return (
    <div className="appHeader">
      <Menu
      onClick={OnMenuClick}
      mode="horizontal"
      items ={[
        {
          label:<HomeFilled/>,
          key:""
        },
        {
          label:"Men",
          key:"men",
          children: [
            {
              label: "Men's Shirts",
              key: "mens-shirts",
            },
            {
              label: "Men's Shoes",
              key: "mens-shoes",
            },
            {
              label: "Men's Watches",
              key: "mens-watches",
            },
          ],
        },
        {
          label:"Women",
          key:"women",children: [
            {
              label: "Women's Dresses",
              key: "womens-dresses",
            },
            {
              label: "Women's Shoes",
              key: "womens-shoes",
            },
            {
              label: "Women's Watches",
              key: "womens-watches",
            },
            {
              label: "Women's Bags",
              key: "womens-bags",
            },
            {
              label: "Women's Jewellery",
              key: "womens-jewellery",
            },
          ],
        },
        {
          label:"Fragrances",
          key:"fragrances"
        },
      ]}
      />
      <Typography.Title>Store</Typography.Title>
      <ShoppingCartOutlined className='shoppingCartIcon'/>
    </div>
  )
}

export default Header