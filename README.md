# Livret de Musculation - EPS (version 4.0)

PWA de suivi d'entraînement en musculation (CA5) pour les iPad de l'établissement.

## Contenu du dépôt

```
index.html            Application
sw.js                 Service worker (hors ligne) - numéro de version en haut du fichier
manifest.json         Configuration PWA
favicon.ico           Icône navigateur
icon-192.png          Icône appli
icon-512.png          Icône appli
apple-touch-icon.png  Icône écran d'accueil iPad
libs/chart.umd.min.js Graphiques (hors ligne)
libs/jspdf.umd.min.js Fiches PDF (hors ligne)
```

## Mise en ligne

GitHub Pages : Settings > Pages > Deploy from branch `main`, dossier `/ (root)`.

## Sur chaque iPad

1. Ouvrir l'adresse de l'appli dans Safari.
2. Bouton Partager > « Sur l'écran d'accueil ».
3. Toujours ouvrir l'appli depuis cette icône (sinon Safari peut effacer les données après 7 jours sans visite).

Chaque élève garde le même iPad pendant tout le cycle. Les données restent sur l'iPad ; l'export (onglet Profil) permet d'en garder une copie.

## Mises à jour

À chaque nouvelle version, le numéro est changé dans `sw.js` (`CACHE_NAME`) et dans `index.html` (`APP_VERSION`), affiché en bas de l'onglet Profil.
