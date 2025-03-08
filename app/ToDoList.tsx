"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ToDoList() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <button className={styles.toggleTodoList} onClick={() => setIsVisible(!isVisible)}>
        <i className={`fa ${isVisible ? "fa-times" : "fa-list"}`}></i>
      </button>

      <div className={`${styles.todoList} ${!isVisible ? styles.hidden : ""}`}>
        <h3>📌 To-Do List</h3>
        <ul className={styles.todoItems}>
          <li className={styles.todoItem}>
            <i className="fa fa-check-circle"></i> Ajouter un graphique
          </li>
          <li className={styles.todoItem}>
            <i className="fa fa-check-double"></i> Vérifier les données
          </li>
          <li className={styles.todoItem}>
            <i className="fa fa-calendar-alt"></i> Mettre à jour les rapports
          </li>
          <li className={styles.todoItem}>
            <i className="fa fa-user-plus"></i> Ajouter un client
          </li>
        </ul>
      </div>
    </>
  );
}
