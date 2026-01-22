import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DashboardHome = () => {
  const { theme } = useTheme();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // =============================
  // 🔥 FETCH REAL DATA FROM BACKEND
  // =============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pharmacy/stats"); 
        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 font-bold">Loading...</p>;
  if (!stats) return <p className="text-center mt-10 text-red-500 font-bold">Failed to load dashboard data</p>;

  const inStockPercentage = Math.round((stats.inStock / stats.totalMedicines) * 100);
  const outOfStockPercentage = Math.round((stats.outOfStock / stats.totalMedicines) * 100);

  // =============================
  // 📊 Recharts Data Formatting
  // =============================
  const barData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Out of Stock", value: stats.outOfStock },
    { name: "Pending", value: stats.pendingApprovals },
  ];

  const pieData = [
    { name: "In Stock", value: stats.inStock },
    { name: "Out of Stock", value: stats.outOfStock },
  ];

  const COLORS = [theme.primary, "#EF4444"];

  const summaryCards = [
    {
      title: "Total Medicines",
      value: stats.totalMedicines,
      color: theme.primary,
    },
    {
      title: "In Stock",
      value: stats.inStock,
      color: theme.primary,
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      color: "#EF4444",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      color: "#F59E0B",
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#2D2D49" }}>
          Welcome back, {stats.pharmacyName}!
        </h1>
        <p className="text-gray-600">Here’s your updated analytics overview.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <h3 className="text-sm text-gray-500">{card.title}</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 🟦 BAR CHART */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2D2D49" }}>
            Stock Summary
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={theme.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🟠 PIE CHART */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2D2D49" }}>
            Stock Distribution
          </h2>

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
