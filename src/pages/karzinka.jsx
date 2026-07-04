import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";

export default function Karzinka() {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    sklad: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myCart")) || [];
    setCartItems(saved);
  }, []);

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("myCart", JSON.stringify(items));
  };

  const removeItem = (id) => {
    saveCart(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("myCart");
  };

  const changeQty = (id, newQty) => {
    if (newQty < 1) return;
    saveCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert(t('cart.requiredFieldsAlert'));
      return;
    }
    clearCart();
    setForm({ name: "", phone: "", email: "", sklad: "" });
    navigate("/oformleniye");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="text-sm text-gray-400 mb-4">
        <span
          className="cursor-pointer hover:text-[#0A61DE]"
          onClick={() => navigate("/")}
        >
          {t('cart.home')}
        </span>
        <span className="mx-1">•</span>
        <span className="text-gray-600">{t('cart.title')}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('cart.title')}</h1>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-500 transition-colors text-sm"
          >
            {t('cart.clearCart')}
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200">
          <ShoppingCartOutlinedIcon
            style={{ fontSize: 90, color: "#D1D5DB" }}
          />
          <h2 className="text-xl font-semibold mt-5 text-gray-500">
            {t('cart.emptyTitle')}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {t('cart.emptySubtitle')}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-8 py-3 bg-[#0A61DE] text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('cart.goToCatalog')}
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow flex flex-col gap-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4 relative"
              >
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors text-xl leading-none"
                  title="×"
                >
                  ×
                </button>

                <img
                  src={item.images}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                />

                <div className="flex-grow pr-6">
                  <h3 className="text-sm font-medium text-gray-700 leading-snug mb-3">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        {item.price.toLocaleString("ru-RU")} {t('cart.perItem')}
                      </span>

                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          onClick={() => changeQty(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => {
                            const v = parseInt(e.target.value, 10);
                            changeQty(item.id, isNaN(v) ? 1 : v);
                          }}
                          className="w-10 text-center text-sm outline-none border-x border-gray-300 h-7"
                        />
                        <button
                          onClick={() => changeQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-[#0A61DE] font-bold text-sm whitespace-nowrap">
                      {t('cart.total')} {(item.price * item.qty).toLocaleString("ru-RU")}{" "}
                      ₽
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[360px] flex-shrink-0">
            <form
              onSubmit={handleOrder}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4"
            >
              <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
                {t('cart.orderFormTitle')}
              </h2>

              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  name="name"
                  placeholder={t('cart.namePlaceholder')}
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0A61DE] transition-colors"
                />
                <span className="text-red-400 text-xs text-right">*</span>
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('cart.phonePlaceholder')}
                  value={form.phone}
                  onChange={handleFormChange}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0A61DE] transition-colors"
                />
                <span className="text-red-400 text-xs text-right">*</span>
              </div>

              <input
                type="email"
                name="email"
                placeholder={t('cart.emailPlaceholder')}
                value={form.email}
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0A61DE] transition-colors"
              />

              <select
                name="sklad"
                value={form.sklad}
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0A61DE] transition-colors text-gray-500 bg-white"
              >
                <option value="">{t('cart.selectWarehouse')}</option>
                <option value="sklad1">{t('cart.warehouse1')}</option>
                <option value="sklad2">{t('cart.warehouse2')}</option>
                <option value="sklad3">{t('cart.warehouse3')}</option>
              </select>

              <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-1">
                <span className="text-gray-600 text-sm font-medium">
                  {t('cart.itemsCount', { count: totalCount })}
                </span>
                <span className="text-[#0A61DE] font-bold text-base">
                  {t('cart.total')} {totalPrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0A61DE] hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-sm tracking-wider transition-all"
              >
                {t('cart.submit')}
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                {t('cart.policyText')}{" "}
                <span className="text-[#0A61DE] cursor-pointer hover:underline">
                  {t('cart.policyLink')}
                </span>{" "}
                {t('cart.and')}{" "}
                <span className="text-[#0A61DE] cursor-pointer hover:underline">
                  {t('cart.consentLink')}
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
