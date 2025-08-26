"use client";

import {
  Globe,
  Bell,
  CreditCard,
  Truck,
  Save,
  Utensils,
  Home,
  CalendarClock,
  User,
  MapPin,
  Phone,
} from "lucide-react";
import React, { useState } from "react";

// ===== CUSTOM UI COMPONENTS =====
const Card = ({ children, className }) => (
  <div className={`rounded-xl border bg-gradient-to-br ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-800">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-xl font-bold flex items-center gap-2 ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 space-y-4 ${className}`}>{children}</div>
);

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-lg text-base bg-black/30 backdrop-blur-sm text-white border border-amber-500/30 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 ${className}`}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    {...props}
    className={`w-full px-4 py-3 rounded-lg text-base bg-black/30 backdrop-blur-sm text-white border border-amber-500/30 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 ${className}`}
  />
);

const Label = ({ children, htmlFor, className }) => (
  <label
    htmlFor={htmlFor}
    className={`block mb-2 text-base font-medium ${className}`}
  >
    {children}
  </label>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Switch = ({ defaultChecked, id }) => (
  <label htmlFor={id} className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        defaultChecked={defaultChecked}
        className="sr-only"
      />
      <div
        className={`block w-14 h-7 rounded-full ${
          defaultChecked ? "bg-amber-600" : "bg-gray-700"
        }`}
      ></div>
      <div
        className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform ${
          defaultChecked ? "translate-x-7" : ""
        }`}
      ></div>
    </div>
  </label>
);

// ===== SETTINGS PAGE =====
export function Settings() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [deliveryRadius, setDeliveryRadius] = useState(15);
  const [deliveryFee, setDeliveryFee] = useState(10);
  const [minOrder, setMinOrder] = useState(50);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(100);
  const [taxRate, setTaxRate] = useState(15);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-black to-amber-950/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64">
            <div className="mb-8 text-center p-4 bg-gradient-to-r from-amber-800/30 to-black/50 rounded-xl border border-amber-500/30 backdrop-blur-sm">
              <img
                src="https://yt3.googleusercontent.com/2n1mMw31wtZbE1ri4audS-SG9sMs0jY8vEJ4Sx9CFXTkkW3V5hmJl4xACqgsgfCw-nzOPYvE4Q=s160-c-k-c0x00ffffff-no-rj"
                alt="Admin Logo"
                className="w-24 h-24 mx-auto mb-4 rounded-xl border-2 border-dashed border-amber-500/30 shadow-lg"
              />

              <h1 className="text-3xl font-bold text-amber-300 mb-2">
                Matbakh Baytli
              </h1>
              <p className="text-amber-200 text-lg">Home Kitchen</p>
            </div>

            <nav className="bg-gradient-to-b from-amber-900/30 to-black/50 backdrop-blur-sm rounded-xl border border-amber-500/30 p-2">
              {[
                {
                  id: "restaurant",
                  label: "Restaurant Info",
                  icon: <Home size={20} />,
                },
                {
                  id: "delivery",
                  label: "Delivery Settings",
                  icon: <Truck size={20} />,
                },
                {
                  id: "payment",
                  label: "Payment Methods",
                  icon: <CreditCard size={20} />,
                },
                {
                  id: "notifications",
                  label: "Notifications",
                  icon: <Bell size={20} />,
                },
                {
                  id: "hours",
                  label: "Operating Hours",
                  icon: <CalendarClock size={20} />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full text-left p-3 rounded-lg mb-1 transition-all ${
                    activeTab === tab.id
                      ? "bg-amber-600/30 text-amber-300 border border-amber-500/50"
                      : "text-gray-300 hover:bg-amber-900/30"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-4xl font-bold text-amber-300 mb-2">
                Restaurant Settings
              </h1>
              <p className="text-amber-200 text-lg max-w-2xl">
                Manage your home kitchen settings, delivery preferences, and
                payment methods
              </p>
            </div>

            {/* Restaurant Info */}
            {activeTab === "restaurant" && (
              <Card className="from-amber-900/20 to-black/50 border-amber-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    <Home className="h-5 w-5 text-amber-400" />
                    Restaurant Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="restaurant-name"
                        className="text-amber-200"
                      >
                        Restaurant Name
                      </Label>
                      <Input
                        id="restaurant-name"
                        defaultValue="Matbakh Baytli"
                        className="bg-amber-900/10"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="restaurant-phone"
                        className="text-amber-200"
                      >
                        Phone
                      </Label>
                      <Input
                        id="restaurant-phone"
                        defaultValue="+91 90876 54433"
                        className="bg-amber-900/10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="restaurant-address"
                        className="text-amber-200"
                      >
                        Address
                      </Label>
                      <Input
                        id="restaurant-address"
                        defaultValue="Melethalakkal, Vallapuzha, pattambi, palakkad, Kerala 673808"
                        className="bg-amber-900/10"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label
                        htmlFor="restaurant-description"
                        className="text-amber-200"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="restaurant-description"
                        defaultValue="Authentic home-cooked meals prepared with traditional recipes and love. Experience the taste of Kerala in every bite."
                        rows={4}
                        className="bg-amber-900/10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Settings */}
            {activeTab === "delivery" && (
              <Card className="from-amber-900/20 to-black/50 border-amber-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    <Truck className="h-5 w-5 text-amber-400" />
                    Delivery Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-amber-200">
                        Delivery Radius: {deliveryRadius} km
                      </Label>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={deliveryRadius}
                        onChange={(e) =>
                          setDeliveryRadius(parseInt(e.target.value))
                        }
                        className="w-full accent-amber-600"
                      />
                    </div>

                    <div>
                      <Label htmlFor="delivery-fee" className="text-amber-200">
                        Delivery Fee (₹)
                      </Label>
                      <Input
                        id="delivery-fee"
                        type="number"
                        value={deliveryFee}
                        onChange={(e) =>
                          setDeliveryFee(parseFloat(e.target.value))
                        }
                        className="bg-amber-900/10"
                      />
                    </div>

                    <div>
                      <Label htmlFor="min-order" className="text-amber-200">
                        Minimum Order (₹)
                      </Label>
                      <Input
                        id="min-order"
                        type="number"
                        value={minOrder}
                        onChange={(e) =>
                          setMinOrder(parseFloat(e.target.value))
                        }
                        className="bg-amber-900/10"
                      />
                    </div>

                    <div>
                      <Label htmlFor="free-delivery" className="text-amber-200">
                        Free Delivery Threshold (₹)
                      </Label>
                      <Input
                        id="free-delivery"
                        type="number"
                        value={freeDeliveryThreshold}
                        onChange={(e) =>
                          setFreeDeliveryThreshold(parseFloat(e.target.value))
                        }
                        className="bg-amber-900/10"
                      />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between p-4 bg-amber-900/10 rounded-lg border border-amber-500/30">
                      <div>
                        <Label className="text-amber-200">
                          Enable Delivery
                        </Label>
                        <p className="text-amber-300/80 text-sm">
                          Accept delivery orders
                        </p>
                      </div>
                      <Switch id="delivery-enabled" defaultChecked={true} />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between p-4 bg-amber-900/10 rounded-lg border border-amber-500/30">
                      <div>
                        <Label className="text-amber-200">
                          Pickup Available
                        </Label>
                        <p className="text-amber-300/80 text-sm">
                          Allow customers to pick up orders
                        </p>
                      </div>
                      <Switch id="pickup-enabled" defaultChecked={true} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Settings */}
            {activeTab === "payment" && (
              <Card className="from-amber-900/20 to-black/50 border-amber-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    <CreditCard className="h-5 w-5 text-amber-400" />
                    Payment Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "credit-cards",
                        label: "Credit/Debit Cards",
                        desc: "Accept card payments online",
                        defaultChecked: true,
                      },
                      {
                        id: "cash-delivery",
                        label: "Cash on Delivery",
                        desc: "Accept cash payments at delivery",
                        defaultChecked: true,
                      },
                      {
                        id: "upi",
                        label: "UPI Payments",
                        desc: "Accept UPI payments (PhonePe, GPay, etc.)",
                        defaultChecked: true,
                      },
                      {
                        id: "paypal",
                        label: "PayPal",
                        desc: "Accept PayPal payments",
                        defaultChecked: false,
                      },
                    ].map(({ id, label, desc, defaultChecked }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 bg-amber-900/10 rounded-lg border border-amber-500/30"
                      >
                        <div>
                          <Label className="text-amber-200">{label}</Label>
                          <p className="text-amber-300/80 text-sm">{desc}</p>
                        </div>
                        <Switch id={id} defaultChecked={defaultChecked} />
                      </div>
                    ))}

                    <div className="mt-6">
                      <Label htmlFor="tax-rate" className="text-amber-200">
                        Tax Rate (%)
                      </Label>
                      <Input
                        id="tax-rate"
                        type="number"
                        step="0.01"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                        className="bg-amber-900/10 max-w-[200px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <Card className="from-amber-900/20 to-black/50 border-amber-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    <Bell className="h-5 w-5 text-amber-400" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "new-orders",
                        label: "New Orders",
                        desc: "Get notified when new orders arrive",
                        defaultChecked: true,
                      },
                      {
                        id: "order-updates",
                        label: "Order Updates",
                        desc: "Notifications for order status changes",
                        defaultChecked: true,
                      },
                      {
                        id: "reviews",
                        label: "Customer Reviews",
                        desc: "Notify me when customers leave reviews",
                        defaultChecked: true,
                      },
                      {
                        id: "stock-alerts",
                        label: "Low Stock Alerts",
                        desc: "Alert when ingredients are running low",
                        defaultChecked: true,
                      },
                      {
                        id: "daily-reports",
                        label: "Daily Reports",
                        desc: "Receive daily sales reports",
                        defaultChecked: true,
                      },
                    ].map(({ id, label, desc, defaultChecked }) => (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 bg-amber-900/10 rounded-lg border border-amber-500/30"
                      >
                        <div>
                          <Label className="text-amber-200">{label}</Label>
                          <p className="text-amber-300/80 text-sm">{desc}</p>
                        </div>
                        <Switch id={id} defaultChecked={defaultChecked} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Operating Hours */}
            {activeTab === "hours" && (
              <Card className="from-amber-900/20 to-black/50 border-amber-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-amber-300">
                    <CalendarClock className="h-5 w-5 text-amber-400" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { day: "Monday", open: "10:00 AM", close: "10:00 PM" },
                      { day: "Tuesday", open: "10:00 AM", close: "10:00 PM" },
                      { day: "Wednesday", open: "10:00 AM", close: "10:00 PM" },
                      { day: "Thursday", open: "10:00 AM", close: "10:00 PM" },
                      { day: "Friday", open: "12:00 PM", close: "11:00 PM" },
                      { day: "Saturday", open: "9:00 AM", close: "11:00 PM" },
                      { day: "Sunday", open: "9:00 AM", close: "10:00 PM" },
                    ].map(({ day, open, close }) => (
                      <div
                        key={day}
                        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-amber-900/10 rounded-lg border border-amber-500/30"
                      >
                        <div className="w-32 text-amber-200 font-medium">
                          {day}
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                          <div className="flex-1">
                            <Label className="text-amber-200">
                              Opening Time
                            </Label>
                            <Input
                              defaultValue={open}
                              className="bg-amber-900/10"
                            />
                          </div>
                          <div className="flex-1">
                            <Label className="text-amber-200">
                              Closing Time
                            </Label>
                            <Input
                              defaultValue={close}
                              className="bg-amber-900/10"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch id={`${day}-enabled`} defaultChecked={true} />
                          <span className="text-amber-300/80">Open</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button className="bg-gradient-to-r from-amber-600 to-amber-800 text-amber-50 hover:from-amber-500 hover:to-amber-700 hover:scale-[1.02] shadow-lg shadow-amber-900/50">
                <Save className="h-5 w-5 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
