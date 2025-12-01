# 🔍 Lokaler Quellen-Finder

KI-gestütztes Tool zum Finden von lokalen Nachrichtenquellen für deutsche Städte.

![Screenshot](screenshot.png)

## Features

- **KI-gestützte Suche**: Claude findet automatisch relevante Quellen
- **13 Kategorien**: Public Authority, Local Media, Sports, Religion, NGO, etc.
- **Trust-Scores**: Bewertung der Vertrauenswürdigkeit (0.0 - 1.0)
- **Bearbeitbar**: Alle Einträge können manuell angepasst werden
- **Export**: CSV und JSON Export
- **Import**: Frühere Suchen können importiert werden

## Kategorien

| Kategorie | Beispiele |
|-----------|-----------|
| Public Authority | Stadt, Landkreis, Polizei, Feuerwehr, THW |
| Local Media | Lokalzeitungen, Regionalradio |
| National Media | Überregionale Medien mit Lokalteil |
| Sports | Sportvereine, Fußballclubs |
| Religion & Community | Kirchen, Kirchenkreise |
| Care & Elderly Services | Krankenhäuser, DRK, Johanniter |
| NGO | Lions, Rotary, Tierschutz |
| Weather | DWD, Unwetterzentrale |
| Culture & Arts | Theater, Museen |
| Education | Schulen, Hochschulen, VHS |
| Political | CDU, SPD, Grüne, FDP, Linke, AfD |
| Corporate | Verkehrsbetriebe, lokale Unternehmen |
| Social Media | Facebook-Gruppen, Instagram, YouTube |

## Installation & Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/lokaler-quellen-finder.git
cd lokaler-quellen-finder

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## GitHub Pages Deployment

### Schritt 1: Repository erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. Name: `lokaler-quellen-finder`
3. Public Repository erstellen

### Schritt 2: Code hochladen

```bash
# Im Projektordner
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/lokaler-quellen-finder.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren

1. Repository Settings → Pages
2. Source: "GitHub Actions"
3. Workflow wird automatisch erstellt

### Schritt 4: GitHub Actions Workflow erstellen

Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Schritt 5: Base URL anpassen

In `vite.config.js` den Repository-Namen anpassen:

```js
base: '/lokaler-quellen-finder/',
```

## API-Key

Das Tool benötigt einen Anthropic API-Key:

1. Registrieren auf [console.anthropic.com](https://console.anthropic.com/)
2. API-Key erstellen
3. Key im Tool eingeben (wird lokal im Browser gespeichert)

## Lizenz

MIT License

## Autor

Erstellt für Yo! Lokalmedien
