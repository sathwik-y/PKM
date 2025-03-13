import { useEffect, useRef } from 'react';

const CardGrid = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      title: "Quick Notes",
      description: "Capture your thoughts instantly with our quick note feature."
    },
    {
      title: "Smart Categories",
      description: "Automatically organize your content with AI-powered categorization."
    },
    {
      title: "File Storage",
      description: "Store and manage all your important documents in one place."
    }
  ];

  return (
    <section className="cards-grid">
      {cards.map((card, index) => (
        <div 
          key={index}
          ref={el => cardsRef.current[index] = el}
          className="card"
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </section>
  );
};

export default CardGrid;
