import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const screens = {
  home: {
    label: "Home",
    icon: "⌂",
    title: "Добро пожаловать",
    subtitle: "Легкое демо-приложение, которое можно установить на Android.",
    items: ["PWA-ready", "Работает как сайт", "Простая мобильная навигация"],
  },
  games: {
    label: "Games",
    icon: "◆",
    title: "Games",
    subtitle: "Небольшая витрина игровых карточек без API и бэкенда.",
    items: ["Lucky Cards", "Mini Slots", "Daily Spin"],
  },
  bonuses: {
    label: "Bonuses",
    icon: "★",
    title: "Bonuses",
    subtitle: "Демо-экран с бонусами, промо и ежедневными наградами.",
    items: ["Welcome bonus", "Daily reward", "Weekend boost"],
  },
  profile: {
    label: "Profile",
    icon: "●",
    title: "Profile",
    subtitle: "Пример профиля пользователя без авторизации и личных данных.",
    items: ["Demo user", "Level 4", "No account required"],
  },
};

function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const screen = screens[activeScreen];

  return (
    <main className="app-shell">
      <section className="screen">
        <div className="top-bar">
          <div>
            <span className="eyebrow">Demo PWA</span>
            <h1>{screen.title}</h1>
          </div>
          <div className="app-mark" aria-hidden="true">
            {screen.icon}
          </div>
        </div>

        <p className="subtitle">{screen.subtitle}</p>

        <div className="highlight">
          <span>Installable</span>
          <strong>Android Chrome</strong>
        </div>

        <div className="list">
          {screen.items.map((item) => (
            <article className="item" key={item}>
              <span>{item.charAt(0)}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="tab-bar" aria-label="Основная навигация">
        {Object.entries(screens).map(([id, item]) => (
          <button
            className={id === activeScreen ? "active" : ""}
            type="button"
            key={id}
            onClick={() => setActiveScreen(id)}
            aria-current={id === activeScreen ? "page" : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
