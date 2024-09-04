import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {
  Assessment,
  People,
  Inventory,
  ShoppingCart,
  QuestionAnswer,
  LocalOffer
} from "@mui/icons-material";

const AdminDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [services, setServices] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        offersResponse,
        servicesResponse,
        inquiriesResponse,
        reservationsResponse,
        customersResponse
      ] = await Promise.all([
        axios.get("http://127.0.0.1:5000/offers"),
        axios.get("http://127.0.0.1:5000/services"),
        axios.get("http://127.0.0.1:5000/inquiry"),
        axios.get("http://127.0.0.1:5000/reservation"),
        axios.get("http://127.0.0.1:5000/customer")
      ]);
      setOffers(offersResponse.data.offers);
      setServices(servicesResponse.data.services);
      setInquiries(inquiriesResponse.data.inquiries);
      setReservations(reservationsResponse.data.reservations);
      setCustomers(customersResponse.data.customers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  console.log(offers?.length);
  console.log(services?.length);
  console.log(inquiries?.length);
  console.log(customers?.length);

  const reservationData = reservations.map((reservation) => ({
    name: reservation.created_at,
    reservations: 1
  }));

  const inquiryData = inquiries.map((inquiry) => ({
    name: inquiry.created_at,
    inquiries: 1
  }));

  const customerData = customers.map((customer) => ({
    name: customer.CREATED_ON,
    customers: 1
  }));

  const gradientOffset = () => {
    const dataMax = Math.max(...customerData.map((i) => i.customers));
    const dataMin = Math.min(...customerData.map((i) => i.customers));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-cards">
        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              <LocalOffer /> Active Offers
            </Typography>
            <Typography variant="h3">{offers.length}</Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              <Inventory /> Active Services
            </Typography>
            <Typography variant="h3">{services.length}</Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              <People /> Customers
            </Typography>
            <Typography variant="h3">{customers.length}</Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              <ShoppingCart /> Reservations
            </Typography>
            <Typography variant="h3">{reservations.length}</Typography>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent>
            <Typography variant="h5" component="h2">
              <QuestionAnswer /> Inquiries
            </Typography>
            <Typography variant="h3">{inquiries.length}</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-chart">
        <Card className="dashboard-chart">
          <CardContent>
            <Typography variant="h5" component="h2">
              Reservations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reservationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="reservations"
                  stroke={`url(#colorUv)`}
                  fill={`url(#colorUv)`}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-chart">
          <CardContent>
            <Typography variant="h5" component="h2">
              Inquiries
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inquiryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="inquiries"
                  stroke={`url(#colorUv)`}
                  fill={`url(#colorUv)`}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;