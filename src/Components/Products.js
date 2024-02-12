import React, { useEffect, useState } from 'react';
import { addToCart, getAllProduct, getProductsByCategory } from '../API/Index';
import { Badge, Button, Card, Image, List, Rate, Spin, Typography, message } from 'antd';
import { useParams } from 'react-router-dom';

function Products() {
  const param = useParams()
  const [items, setItems] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
  setLoading(true);

  (param?.categoryId ?
    getProductsByCategory(param.categoryId)
    :getAllProduct())
    .then(res => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);

  if(loading)
  return <Spin spinning/>

  return (
    <div className="productsContainer">
      <List
        grid={{ column: 3 }}
        dataSource={items}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={`${product.discountPercentage}% Off`}
              color="pink"
            >
              <Card
                className="itemCard"
                title={product.title}
                key={product.id} 
                cover={<Image className="itemCardImage" src={product.thumbnail} />}
                actions={[<Rate allowHalf disabled value={product.rating}/>,
                <AddToCartButton item={product} />,]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          product.price +
                          (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          );
        }}
      />
    </div>
  );
}
function AddToCartButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  );
}

export default Products;
