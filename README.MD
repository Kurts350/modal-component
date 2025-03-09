# Modal-component

Un composant Modal React moderne, léger et élégant, converti depuis un plugin jQuery. Ce composant a été spécialement conçu pour le projet HRnet afin d'améliorer les performances et la stabilité de l'application.

## Installation

```bash
npm install kurts350-modal-component
```

ou

```bash
yarn add kurts350-modal-component
```

## Dépendances

Ce composant utilise [styled-components](https://styled-components.com/) pour la gestion des styles. Assurez-vous que vous avez styled-components installé dans votre projet :

```bash
npm install styled-components
```

## Caractéristiques

- 🚀 Performances optimisées par rapport à la version jQuery
- 🎨 Animations fluides d'ouverture et fermeture
- 🔄 Transitions personnalisables
- 📱 Responsive design avec largeur maximale configurable
- ♿ Accessible (gestion du focus, navigation au clavier, attributs ARIA)
- 🧩 Utilisation de styled-components pour un style encapsulé

## Utilisation

```jsx
import React, { useState } from 'react';
import Modal from 'kurts350-modal-component';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Ouvrir la modal</button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title="Employé créé avec succès !"
        closeText="Fermer"
        maxWidth={500}
        fadeDuration={400}
      >
        <p>Le nouvel employé a été ajouté à la base de données.</p>
      </Modal>
    </div>
  );
}
```

## Props

| Prop          | Type     | Description                              | Défaut       |
|---------------|----------|------------------------------------------|--------------|
| `isOpen`      | boolean  | État d'ouverture de la modal             | Obligatoire  |
| `onClose`     | function | Fonction appelée lors de la fermeture    | Obligatoire  |
| `children`    | node     | Contenu de la modal                      | `null`       |
| `title`       | string   | Titre affiché dans l'en-tête de la modal | `"Success!"` |
| `closeText`   | string   | Texte du bouton de fermeture             | `"Close"`    |
| `maxWidth`    | number   | Largeur maximale en pixels               | `400`        |
| `className`   | string   | Classe CSS additionnelle pour le contenu | `""`         |
| `fadeDuration`| number   | Durée de l'animation en ms               | `300`        |

## Comportements

- Fermeture par clic sur l'overlay
- Fermeture par appui sur la touche Echap
- Verrouillage du défilement de la page (scroll) lorsque la modal est ouverte
- Animations fluides à l'ouverture et à la fermeture

## Accessibilité

Ce composant suit les bonnes pratiques d'accessibilité :
- Utilisation de `role="dialog"` et `aria-modal="true"`
- Attribut `aria-labelledby` reliant le titre à la modal
- Bouton de fermeture avec `aria-label`
- Support de la navigation au clavier (Echap pour fermer)

## Styles et personnalisation

Le composant utilise styled-components pour encapsuler les styles, mais vous pouvez également personnaliser l'apparence en surchargeant les classes CSS ou en passant des props spécifiques.

```css
/* Styles par défaut du composant */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-overlay.modal-visible {
  opacity: 1;
}

.modal-content {
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-content.modal-visible {
  transform: translateY(0);
  opacity: 1;
}

.modal-button {
  padding: 8px 16px;
  margin-top: 15px;
  background-color: #009879;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.modal-button:hover {
  background-color: #008068;
}

.modal-button:focus {
  outline: 2px solid #00634f;
  outline-offset: 2px;
}
```

## Performances

Ce composant a été développé en mettant l'accent sur les performances :
- Utilisation de `React.memo` pour éviter les rendus inutiles
- Optimisation des animations CSS pour une meilleure fluidité
- Gestion efficace des cycles de vie et des effets React


## Compatibilité

- Compatible avec React 17.x et 18.x
- Compatible avec les projets utilisant styled-components v5.x ou v6.x
- Support pour les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Testé avec Create React App, Next.js, et Vite

## Licence

MIT

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request sur GitHub.