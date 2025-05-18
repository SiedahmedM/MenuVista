'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('restaurant');

  useEffect(() => {
    async function fetchData() {
      try {
        const url = restaurantId 
          ? `/api/analytics/dashboard?restaurant=${restaurantId}`
          : '/api/analytics/dashboard';
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        
        const data = await response.json();
        setAnalyticsData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchData();
  }, [restaurantId]);

  if (loading) {
    return <div className="p-8">Loading analytics data...</div>;
  }
  
  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }
  
  if (!analyticsData) {
    return <div className="p-8">No analytics data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MenuVista Analytics Dashboard</h1>
        {restaurantId && (
          <h2 className="text-xl mb-2">Restaurant: {restaurantId}</h2>
        )}
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Total Sessions</h3>
          <p className="text-3xl">{analyticsData.sessionCount}</p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Most Viewed Menu Items</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {analyticsData.mostViewedItems?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Views</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.mostViewedItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="text-right p-2">{item.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No view data available yet. Try interacting with the menu.</p>
          )}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {analyticsData.popularCategories?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Views</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.popularCategories.map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{category.name}</td>
                    <td className="text-right p-2">{category.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No category data available yet. Try changing menu tabs.</p>
          )}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Menu Item Analysis</h2>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          {analyticsData.itemAnalysis?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Views</th>
                  <th className="text-right p-2">Avg. View Time (sec)</th>
                  <th className="text-right p-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.itemAnalysis.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="text-right p-2">{item.views}</td>
                    <td className="text-right p-2">{item.avgViewTime}</td>
                    <td className="text-right p-2">{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No item analysis data available yet.</p>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <Link href={`/sababa-falafel`} className="text-blue-600 hover:underline">
          ← Back to Restaurant
        </Link>
      </div>
    </div>
  );
}