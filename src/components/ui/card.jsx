// src/components/ui/card.jsx

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow ${className || ""}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className || ""}`}>
    {children}
  </div>
);

export default Card;
