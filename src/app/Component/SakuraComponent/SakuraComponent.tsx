'use client'

import { useEffect } from "react";

export default function SakuraFallComponent() {
  useEffect(() => {
    const numPetals = 15;
    const container = document.createElement("div");
    container.className = "sakura-container";
    document.body.appendChild(container);

    for (let i = 0; i < numPetals; i++) {
      const petal = document.createElement("div");
      petal.className = "sakura-petal";

      // Set vị trí và random style
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.opacity = `${0.3 + Math.random() * 0.5}`;
      petal.style.transform = `rotateZ(${Math.random() * 360}deg)`;
      petal.style.animationDelay = `${Math.random() * 5}s`;
      petal.style.animationDuration = `${8 + Math.random() * 5}s`;

      container.appendChild(petal);
    }

    return () => {
      container.remove();
    };
  }, []);

  return null;
}
