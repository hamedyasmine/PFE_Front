import React, { useState, useEffect, useMemo } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
} from 'chart.js';

// Composants
import Sidebar from "./screens/Sidebar";
import UserDropdownAdmin from "./screens/UserDropDown";

// Styles
import './assets/css/theme.css';

// Images (import uniquement celles utilisées)
import p1 from './assets/images/icon/avatar-01.jpg';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PointElement, 
  LineElement,
  RadialLinearScale
);

// Couleurs du thème pour les graphiques
const CHART_COLORS = {
  primary: '#4B9CD3',
  secondary: '#FF6384',
  success: '#36A2EB',
  warning: '#FFCE56',
  info: '#4BC0C0',
  danger: '#FF9F40',
  light: '#E7E9ED',
  dark: '#252525',
  background: 'rgba(255, 255, 255, 0.8)',
};

// Configuration pour l'animation des graphiques
const CHART_ANIMATIONS = {
  duration: 1000,
  easing: 'easeOutQuart',
};

// Constantes pour les URL d'API
const API_BASE_URL = 'http://localhost:5000/api';
const API_ENDPOINTS = {
  APPLICATIONS_BY_STATUS: `${API_BASE_URL}/stats/applications-by-status`,
  APPLICATIONS_SIMPLIFIED_BY_STATUS: `${API_BASE_URL}/stats/applications-simplifiee-by-status`,
  TOTAL_APPLICATIONS: `${API_BASE_URL}/stats/total-applications`,
  TOTAL_APPLICATIONS_SIMPLIFIED: `${API_BASE_URL}/stats/total-applicationssimplifiee`,
  APPLICATIONS_BY_CATEGORY: `${API_BASE_URL}/stats/applications-by-category`,
  APPLICATION_TYPE_RATIO: `${API_BASE_URL}/stats/application-type-ratio`,
  TOP_JOBS: `${API_BASE_URL}/stats/top-jobs`,
  ACCEPTANCE_RATE: `${API_BASE_URL}/stats/acceptance-rate`,
  ACCEPTANCE_RATE_SIMPLIFIED: `${API_BASE_URL}/stats/acceptance-rate-simplifiee`,
  MESSAGE_STATS: `${API_BASE_URL}/stats/message-stats`,
  APPLICATIONS_BY_MONTH: `${API_BASE_URL}/stats/applications-by-month`,
};

// Utilitaires
const formatStatusLabel = (status) => {
  switch (status) {
    case 'accepted':
      return '✅ Acceptée';
    case 'rejected':
      return '❌ Refusée';
    case 'pending':
      return '⏳ En attente';
    default:
      return '❓ Inconnu';
  }
};

// Composant StatCard pour afficher les statistiques simples
const StatCard = ({ title, value, icon, color = 'blue-500' }) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow-sm flex flex-col gap-2 justify-between h-full">
    <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
    <div className="flex items-center justify-between">
      <div className="bg-white px-3 py-2 rounded-md shadow text-2xl font-bold">
        {value}
      </div>
      <div className={`text-${color} text-3xl`}>
        {icon}
      </div>
    </div>
  </div>
);



// Composant ChartCard pour encapsuler les graphiques
const ChartCard = ({ title, children, subtitle = null }) => (
  <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-all">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
    <div className="mt-2">
      {children}
    </div>
  </div>
);

function HomeAd() {
  // États pour les données
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    totalApps: 0,
    totalAppsSimplified: 0,
    appsByCategory: [],
    typeRatio: { normal: 0, simplifiee: 0, total: 0, percentageSimplifiee: '0%' },
    statusStats: [],
    simplifiedStatusStats: [],
    globalAcceptanceRate: null,
    globalAcceptanceRateSimplifiee: null,
    topJobs: [],
    appsByMonth: [],
    messageStats: {
      totalMessages: 0,
      importantMessages: 0,
      importancePercentage: '0%',
    }
  });

  // Fetch data effect
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [
          statusRes, 
          totalRes, 
          totalSimplRes, 
          catRes, 
          ratioRes, 
          topJobsRes, 
          acceptanceRateSimplifieeRes, 
          simplStatusRes, 
          messageRes, 
          monthRes, 
          acceptanceRateRes
        ] = await Promise.all([
          axios.get(API_ENDPOINTS.APPLICATIONS_BY_STATUS),
          axios.get(API_ENDPOINTS.TOTAL_APPLICATIONS),
          axios.get(API_ENDPOINTS.TOTAL_APPLICATIONS_SIMPLIFIED),
          axios.get(API_ENDPOINTS.APPLICATIONS_BY_CATEGORY),
          axios.get(API_ENDPOINTS.APPLICATION_TYPE_RATIO),
          axios.get(API_ENDPOINTS.TOP_JOBS),
          axios.get(API_ENDPOINTS.ACCEPTANCE_RATE_SIMPLIFIED),
          axios.get(API_ENDPOINTS.APPLICATIONS_SIMPLIFIED_BY_STATUS),
          axios.get(API_ENDPOINTS.MESSAGE_STATS),
          axios.get(API_ENDPOINTS.APPLICATIONS_BY_MONTH),
          axios.get(API_ENDPOINTS.ACCEPTANCE_RATE)
        ]);

        setData({
          totalApps: totalRes.data.total || 0,
          totalAppsSimplified: totalSimplRes.data.total || 0,
          appsByCategory: Array.isArray(catRes.data) ? catRes.data : [],
          typeRatio: ratioRes.data,
          statusStats: Array.isArray(statusRes.data) ? statusRes.data : [],
          simplifiedStatusStats: Array.isArray(simplStatusRes.data) ? simplStatusRes.data : [],
          globalAcceptanceRate: acceptanceRateRes.data.acceptanceRate,
          globalAcceptanceRateSimplifiee: acceptanceRateSimplifieeRes.data.acceptanceRate,
          topJobs: topJobsRes.data,
          appsByMonth: Array.isArray(monthRes.data) ? monthRes.data : [],
          messageStats: messageRes.data
        });
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
        setError("Impossible de charger les données. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Préparation des données pour les graphiques (Memoized)
  const chartData = useMemo(() => {
    const { 
      appsByCategory, 
      statusStats, 
      simplifiedStatusStats, 
      messageStats, 
      appsByMonth 
    } = data;

    // Données pour le graphique Pie des catégories
    const categoryData = {
      labels: appsByCategory.map(item => item?._id || 'Non catégorisé'),
      datasets: [{
        data: appsByCategory.map(item => item?.count || 0),
        backgroundColor: [
          CHART_COLORS.primary,
          CHART_COLORS.secondary,
          CHART_COLORS.success,
          CHART_COLORS.warning,
          CHART_COLORS.info,
          CHART_COLORS.danger
        ],
        borderWidth: 1,
        borderColor: CHART_COLORS.background,
      }]
    };

    // Données pour le graphique Bar des statuts
    const statusLabels = ['accepted', 'rejected', 'pending'];
    const comparativeStatusData = {
      labels: statusLabels.map(formatStatusLabel),
      datasets: [
        {
          label: 'Candidatures standard',
          data: statusLabels.map(
            (status) => statusStats.find(s => s.status === status)?.count || 0
          ),
          backgroundColor: CHART_COLORS.primary,
        },
        {
          label: 'Candidatures simplifiées',
          data: statusLabels.map(
            (status) => simplifiedStatusStats.find(s => s.status === status)?.count || 0
          ),
          backgroundColor: CHART_COLORS.secondary,
        },
      ],
    };

    // Données pour le graphique Pie des messages
    const messageData = {
      labels: ['Messages importants', 'Autres messages'],
      datasets: [
        {
          data: [
            messageStats.importantMessages,
            messageStats.totalMessages - messageStats.importantMessages,
          ],
          backgroundColor: [CHART_COLORS.success, CHART_COLORS.light],
          borderColor: CHART_COLORS.background,
          borderWidth: 1,
        },
      ],
    };

    // Données pour le graphique Line des candidatures par mois
    const monthlyData = {
      labels: appsByMonth.map(item => {
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        return item?._id ? monthNames[item._id - 1] || `Mois ${item._id}` : 'Inconnu';
      }),
      datasets: [{
        label: 'Nombre de candidatures',
        data: appsByMonth.map(item => item?.count || 0),
        borderColor: CHART_COLORS.primary,
        backgroundColor: `${CHART_COLORS.primary}33`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: CHART_COLORS.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: CHART_COLORS.primary
      }],
    };

    // Données pour le graphique Doughnut du ratio type de candidatures
    const typeRatioData = {
      labels: ['Standard', 'Simplifiée'],
      datasets: [{
        data: [data.typeRatio.normal, data.typeRatio.simplifiee],
        backgroundColor: [CHART_COLORS.primary, CHART_COLORS.secondary],
        borderColor: CHART_COLORS.background,
        borderWidth: 1,
      }]
    };

    return {
      categoryData,
      comparativeStatusData,
      messageData,
      monthlyData,
      typeRatioData
    };
  }, [data]);

  // Options communes pour les graphiques
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        cornerRadius: 4
      }
    },
    animation: CHART_ANIMATIONS
  };

  // Si données en cours de chargement
  if (isLoading) {
    return (
      <div className="page-wrapper flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Si erreur lors du chargement des données
  if (error) {
    return (
      <div className="page-wrapper flex items-center justify-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-xl shadow max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Erreur de chargement</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Sidebar />
      <div className="page-container">
        <header className="header-desktop">
          <div className="section__content section__content--p30">
            <div className="container-fluid">
              <div className="header-wrap">
                <form className="form-header" method="POST">
                  <input 
                    className="au-input au-input--xl" 
                    type="text" 
                    name="search" 
                    placeholder="Rechercher des données et rapports..." 
                  />
                  <button className="au-btn--submit" type="submit">
                    <i className="zmdi zmdi-search" />
                  </button>
                </form>
                <div className="header-button">
                  <div className="account-wrap">
                    <UserDropdownAdmin />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tableau de bord analytique</h1>
          
          </div>

          {/* Cartes statistiques principales */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <StatCard 
    title="Total des candidatures" 
    value={data.totalApps} 
    icon="📄" 
    color="blue-500"
  />
  <StatCard 
    title="Candidatures simplifiées" 
    value={data.totalAppsSimplified} 
    icon="📝" 
    color="green-500"
  />
  <StatCard 
    title="Taux d'acceptation" 
    value={data.globalAcceptanceRate || "N/A"} 
    icon="✅" 
    color="emerald-500"
  />
  <StatCard 
    title="Messages importants" 
    value={`${data.messageStats.importancePercentage}`} 
    icon="📨" 
    color="indigo-500"
  />
</div>


          {/* Première rangée de graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ChartCard title="Distribution des candidatures par type">
              <div className="h-64">
                <Doughnut 
                  data={chartData.typeRatioData}
                  options={{
                    ...chartOptions,
                    cutout: '60%',
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                <strong>{data.typeRatio.percentageSimplifiee}</strong> des candidatures sont en format simplifié
              </div>
            </ChartCard>

            <ChartCard title="Candidatures par catégorie">
              <div className="h-64">
                <Pie 
                  data={chartData.categoryData}
                  options={chartOptions}
                />
              </div>
            </ChartCard>
          </div>

          {/* Deuxième rangée - Comparaison des statuts */}
          <div className="mb-6">
            <ChartCard 
              title="Comparaison des candidatures par statut" 
              subtitle="Répartition des statuts entre candidatures standard et simplifiées"
            >
              <div className="h-72">
                <Bar
                  data={chartData.comparativeStatusData}
                  options={{
                    ...chartOptions,
                    scales: {
                      x: {
                        grid: {
                          display: false
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </ChartCard>
          </div>

          {/* Troisième rangée - Statistiques détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <ChartCard title="Taux d'acceptation" subtitle="Comparatif des deux types de candidatures">
              <div className="space-y-4 px-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Candidatures standard</span>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-500 h-4 rounded-full" 
                        style={{ width: data.globalAcceptanceRate || '0%' }}
                      ></div>
                    </div>
                    <span className="ml-3 font-bold">{data.globalAcceptanceRate || '0%'}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Candidatures simplifiées</span>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-pink-500 h-4 rounded-full" 
                        style={{ width: data.globalAcceptanceRateSimplifiee || '0%' }}
                      ></div>
                    </div>
                    <span className="ml-3 font-bold">{data.globalAcceptanceRateSimplifiee || '0%'}</span>
                  </div>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Statistiques des messages">
              <div className="h-56">
                <Doughnut 
                  data={chartData.messageData}
                  options={{
                    ...chartOptions,
                    cutout: '70%'
                  }}
                />
              </div>
              <div className="mt-3 text-center text-sm">
                <div><strong>{data.messageStats.totalMessages}</strong> messages au total</div>
                <div><strong>{data.messageStats.importantMessages}</strong> messages importants</div>
              </div>
            </ChartCard>

            <ChartCard title="Top 5 des offres populaires">
              <ul className="space-y-3">
                {data.topJobs.length > 0 ? (
                  data.topJobs.map((job, index) => (
                    <li key={index} className="flex items-center">
                      <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${index < 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {index + 1}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="font-medium truncate">{job.jobTitle || 'Titre non défini'}</div>
                        <div className="text-sm text-gray-500">{job.count} candidatures</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-center py-4">Aucune donnée disponible</li>
                )}
              </ul>
            </ChartCard>
          </div>

          {/* Statistiques par mois */}
          <div className="mb-6">
            <ChartCard title="Évolution des candidatures par mois" subtitle="Tendance sur la période">
              <div className="h-80">
                <Line
                  data={chartData.monthlyData}
                  options={{
                    ...chartOptions,
                    scales: {
                      x: {
                        grid: {
                          display: false
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }}
                />
              </div>
            </ChartCard>
          </div>

          {/* Tableaux détaillés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Détails des candidatures standards</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pourcentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.statusStats.map((stat, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium">{formatStatusLabel(stat.status)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{stat.count}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stat.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Détails des candidatures simplifiées</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pourcentage</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.simplifiedStatusStats.map((stat, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium">{formatStatusLabel(stat.status)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{stat.count}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{stat.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAd;