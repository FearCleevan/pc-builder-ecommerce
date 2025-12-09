import React from 'react';
import { 
  FiPackage, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiXCircle,
  FiTrendingUp 
} from 'react-icons/fi';
import styles from './StatisticsOverview.module.css';

const StatisticsOverview = ({ statistics }) => {
  const statsCards = [
    {
      id: 'total',
      title: 'Total Products',
      value: statistics.totalProducts,
      icon: <FiPackage size={24} />,
      color: '#3498db',
      bgColor: '#e8f4fc',
      trend: '+12%',
      trendUp: true
    },
    {
      id: 'in_stock',
      title: 'In Stock',
      value: statistics.inStock,
      icon: <FiCheckCircle size={24} />,
      color: '#27ae60',
      bgColor: '#d4edda',
      trend: '+8%',
      trendUp: true
    },
    {
      id: 'low_stock',
      title: 'Low Stock',
      value: statistics.lowStock,
      icon: <FiAlertTriangle size={24} />,
      color: '#f39c12',
      bgColor: '#fff3cd',
      trend: '-5%',
      trendUp: false
    },
    {
      id: 'out_of_stock',
      title: 'Out of Stock',
      value: statistics.outOfStock,
      icon: <FiXCircle size={24} />,
      color: '#e74c3c',
      bgColor: '#f8d7da',
      trend: '+3%',
      trendUp: false
    }
  ];

  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.statsHeader}>
        <h3 className={styles.statsTitle}>Product Overview</h3>
        <div className={styles.statsPeriod}>
          <span>Last 30 days</span>
          <FiTrendingUp size={16} />
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statsCards.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div 
              className={styles.statIcon}
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statTitle}>{stat.title}</div>
            </div>
            <div className={`${styles.statTrend} ${stat.trendUp ? styles.trendUp : styles.trendDown}`}>
              <span>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Distribution */}
      {Object.keys(statistics.categories).length > 0 && (
        <div className={styles.categoryDistribution}>
          <h4 className={styles.distributionTitle}>Category Distribution</h4>
          <div className={styles.categoriesList}>
            {Object.entries(statistics.categories).map(([category, count]) => {
              const percentage = (count / statistics.totalProducts) * 100;
              return (
                <div key={category} className={styles.categoryItem}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{category}</span>
                    <span className={styles.categoryCount}>{count} products</span>
                  </div>
                  <div className={styles.categoryBar}>
                    <div 
                      className={styles.categoryBarFill}
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: getCategoryColor(category)
                      }}
                    />
                  </div>
                  <span className={styles.categoryPercentage}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to generate consistent colors for categories
const getCategoryColor = (category) => {
  const colors = {
    'CPU': '#3498db',
    'GPU': '#9b59b6',
    'RAM': '#2ecc71',
    'Storage': '#e74c3c',
    'Motherboard': '#f39c12',
    'PSU': '#1abc9c',
    'Case': '#34495e',
    'Monitor': '#e67e22',
    'Keyboard': '#16a085',
    'Mouse': '#8e44ad',
    'Headphones': '#d35400'
  };
  
  return colors[category] || '#95a5a6';
};

export default StatisticsOverview;