import React from "react";
import "./StatCardList.css";
import StatCard from "./StatCard";

const StatCardList = ({ cards }) => {
  return (
    <div className="card-list-container" data-testid="stat-card-list">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          data-testid={`stat-card-${index}`}
        />
      ))}
    </div>
  );
};

export default StatCardList;
