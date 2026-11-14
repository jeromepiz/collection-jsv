# Collection JSV

Appli web de collection de cartes de la journée sécurité de l'agence de Valence.

**Adresse :** https://jeromepiz.github.io/collection-jsv/

- **Collection** : les 9 cartes de la série, avec une clé de sauvegarde pour retrouver sa collection.
- **Ajouter** : scan du QR code par la caméra, photo du QR code ou saisie du code imprimé.
- **Combat** : 3 manches contre les Dangers de la tournée (Angle Mort, Sol Glissant, Bac Trop Lourd, Mauvais Tri, Précipitation).

Le site fonctionne sans compte et sans serveur. La collection reste sur le téléphone. On peut installer l'appli sur l'écran d'accueil, et elle marche alors sans réseau.

Scanner un QR code avec l'appareil photo du téléphone ouvre l'appli et ajoute directement la carte.

## Mettre à jour

1. Modifier les fichiers, en particulier le tableau `CARDS` dans `index.html` pour ajouter une carte (image dans `cards/`).
2. Dans `sw.js`, changer `VERSION` (par exemple `jsv-v2`) et ajouter les nouvelles images à la liste `FILES`.

Les codes des cartes ne sont pas dans ce dépôt : `index.html` ne contient que leur empreinte (SHA-256).

`vendor/jsQR.js` : bibliothèque jsQR (licence Apache 2.0). Polices : Cinzel, Inter et Bebas Neue (licence SIL Open Font).
