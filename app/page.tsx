"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from "chart.js";
import "font-awesome/css/font-awesome.css";
import ToDoList from "./ToDoList"; // Import du composant séparé

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export default function Home() {
  // Données pour les graphiques
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Revenu en ligne",
        data: [5000, 7000, 8000, 6500, 9000, 10000, 8500, 9500],
        borderColor: "#8b5cf6",
        fill: false,
      },
      {
        label: "Revenu hors ligne",
        data: [4000, 6000, 7000, 5500, 7500, 8500, 8000, 9100],
        borderColor: "#34d399",
        fill: false,
      },
    ],
  };

  const salesData = {
    labels: ["Énergie Optimisée", "Non Optimisée", "Autre"],
    datasets: [
      {
        data: [67, 20, 12],
        backgroundColor: ["#10b981", "#ef4444", "#3b82f6"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Section des Statistiques principales */}
        <section className={styles.stats}>
          <div className={styles.card} style={{ backgroundColor: "#c69642" }}>
            <h3>Énergie Consommée</h3>
            <p>59 467 kWh</p>
            <p>Tendance: High 311+</p>
            <p>Description: Consommation d'énergie pour ce mois.</p>
          </div>

          <div className={styles.card} style={{ backgroundColor: "#4f6a7b" }}>
            <h3>Énergie Économisée</h3>
            <p>28 085 kWh</p>
            <p>Tendance: High 2,98+</p>
            <p>Description: Énergie économisée grâce aux optimisations ML.</p>
          </div>

          <div className={styles.card} style={{ backgroundColor: "#8a6fa5" }}>
            <h3>Consommation Optimisée</h3>
            <p>44 148 kWh</p>
            <p>Tendance: Low 1,12+</p>
            <p>Description: Consommation d'énergie optimisée grâce au ML.</p>
          </div>
        </section>

        {/* Section des KPI (Clients, Conversion, Revenu) */}
        <section className={styles.kpi}>
          <div className={styles.card} style={{ backgroundColor: "#474931" }}>
            <h3>Clients</h3>
            <p>Total Clients : 92 556</p>
            <p>Tendance : +1.35% par rapport au mois dernier</p>
          </div>

          <div className={styles.card} style={{ backgroundColor: "#507692" }}>
            <h3>Conversion</h3>
            <p>Total Conversion : 53 812</p>
            <p>Tendance : -0.17% par rapport au mois dernier</p>
          </div>

          <div className={styles.card} style={{ backgroundColor: "#4b4551" }}>
            <h3>Revenu</h3>
            <p>Total Revenu : 40 008</p>
            <p>Tendance : +0.06% par rapport au mois dernier</p>
          </div>
        </section>

        {/* Section des Graphiques */}
        <section className={styles.graphs}>
          <div className={styles.chart}>
            <h3>Revenu des 30 Derniers Jours</h3>
            <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          <div className={styles.chart}>
            <h3>Toutes les Ventes en Ligne</h3>
            <Doughnut data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </section>
      </main>

      {/* Composant To-Do List */}
      <ToDoList />
    </div>
  );
}
