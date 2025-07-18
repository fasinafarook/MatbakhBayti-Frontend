"use client";

import { Globe, Bell, CreditCard, Truck, Save } from "lucide-react";
import React from "react";

// ===== CUSTOM UI COMPONENTS =====

const Card = ({ children, className }) => (
  <div className={`rounded-lg border ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-800">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 space-y-4 ${className}`}>{children}</div>
);

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 rounded text-sm bg-black text-white border border-yellow-500/20 ${className}`}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 rounded text-sm bg-black text-white border border-yellow-500/20 ${className}`}
  />
);

const Label = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block mb-1 text-sm ${className}`}>
    {children}
  </label>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Switch = ({ defaultChecked }) => (
  <input
    type="checkbox"
    defaultChecked={defaultChecked}
    className="w-10 h-5 rounded-full bg-gray-600 checked:bg-yellow-500 appearance-none relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-5 transition-all"
  />
);

// ===== SETTINGS PAGE =====

export function Settings() {
  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your restaurant settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Info */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-yellow-500" />
              Restaurant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="restaurant-name" className="text-gray-400">
                Restaurant Name
              </Label>
              <Input
                id="restaurant-name"
                defaultValue="Delicious Bites"
              />
            </div>
            <div>
              <Label htmlFor="restaurant-address" className="text-gray-400">
                Address
              </Label>
              <Input
                id="restaurant-address"
                defaultValue="123 Food Street, City"
              />
            </div>
            <div>
              <Label htmlFor="restaurant-phone" className="text-gray-400">
                Phone
              </Label>
              <Input
                id="restaurant-phone"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="restaurant-description" className="text-gray-400">
                Description
              </Label>
              <Textarea
                id="restaurant-description"
                defaultValue="Fresh, delicious food delivered to your door."
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {[
              {
                label: "New Orders",
                desc: "Get notified when new orders arrive",
                defaultChecked: true,
              },
              {
                label: "Order Updates",
                desc: "Notifications for order status changes",
                defaultChecked: true,
              },
              {
                label: "Low Stock Alerts",
                desc: "Alert when items are running low",
                defaultChecked: false,
              },
              {
                label: "Daily Reports",
                desc: "Receive daily sales reports",
                defaultChecked: true,
              },
            ].map(({ label, desc, defaultChecked }) => (
              <div
                key={label}
                className="flex items-center justify-between"
              >
                <div>
                  <Label className="text-white">{label}</Label>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
                <Switch defaultChecked={defaultChecked} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Truck className="h-5 w-5 text-yellow-500" />
              Delivery Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="delivery-radius" className="text-gray-400">
                Delivery Radius (km)
              </Label>
              <Input id="delivery-radius" type="number" defaultValue="10" />
            </div>
            <div>
              <Label htmlFor="delivery-fee" className="text-gray-400">
                Delivery Fee ($)
              </Label>
              <Input id="delivery-fee" type="number" step="0.01" defaultValue="3.99" />
            </div>
            <div>
              <Label htmlFor="min-order" className="text-gray-400">
                Minimum Order ($)
              </Label>
              <Input id="min-order" type="number" step="0.01" defaultValue="15.00" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Free Delivery</Label>
                <p className="text-gray-400 text-sm">Enable free delivery over certain amount</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="bg-gray-900 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-yellow-500" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {[
              {
                label: "Credit Cards",
                desc: "Accept credit card payments",
                defaultChecked: true,
              },
              {
                label: "PayPal",
                desc: "Accept PayPal payments",
                defaultChecked: true,
              },
              {
                label: "Cash on Delivery",
                desc: "Allow cash payments on delivery",
                defaultChecked: false,
              },
            ].map(({ label, desc, defaultChecked }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <Label className="text-white">{label}</Label>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
                <Switch defaultChecked={defaultChecked} />
              </div>
            ))}

            <div>
              <Label htmlFor="tax-rate" className="text-gray-400">
                Tax Rate (%)
              </Label>
              <Input id="tax-rate" type="number" step="0.01" defaultValue="8.25" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
