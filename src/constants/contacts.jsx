import { Phone, MapPin, Clock, Truck } from "lucide-react"

export const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Order Hotline",
      details: "+91 98765 43210",
      subtitle: "Call for instant orders",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Kitchen",
      details: "Matbakh Bayti, Kochi, Kerala",
      subtitle: "Authentic home-style cooking",
      bgColor: "bg-black",
      textColor: "text-yellow-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Kitchen Hours",
      details: "11:00 AM - 11:00 PM",
      subtitle: "Fresh meals all day",
      bgColor: "bg-yellow-400",
      textColor: "text-black",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Home Delivery",
      details: "Free delivery over ₹500",
      subtitle: "Hot & fresh to your door",
      bgColor: "bg-black",
      textColor: "text-yellow-400",
    },
  ]
