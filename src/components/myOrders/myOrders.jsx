import React, { useContext, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import './myOrders.scss';
import { LanguageContext } from '../../context/LanguageContext';
import { fetchOrders } from '../../api/orders';
import formatPrice from '../../utils/formatPrice';

function OrderItem() {
  const { t } = useContext(LanguageContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOrders();
        if (Array.isArray(data)) setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return date;
    }
  };

  return (
    <div className="order-wrapper">
      <h2>{t('orders_page.title')}</h2>
      {orders.map((order) => (
        <div className="order-container" key={order.id}>
          <div className="order-left">
            <div className="order-number">
              {t('orders_page.order_number')} {order.id}
              <FaRegCopy className="copy-icon" />
            </div>
            <div className="order-info">
              <span className="order-data">
                {t('orders_page.from')} {formatDate(order.created_at)}
              </span>
              <span className="order-price">
                {formatPrice(order.total_amount)}
              </span>
            </div>
          </div>
          <div className="order-right">
            <label className="order-status">
              <span className="order-circle"></span>
              <span className="order-payment">{order.status}</span>
            </label>
          </div>
        </div>
      ))}
      {orders.length === 0 && <p>No orders</p>}
    </div>
  );
}

export default OrderItem;
