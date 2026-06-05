# Hafidz Mulia - Portfolio Website

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://hafmul.site)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

Static portfolio website for Hafidz Mulia, positioned around product building, technical problem solving, and leadership across education, internal operations, GIS, and health-support products.

## About

This portfolio is used as a public showcase for:

- Product delivery with Laravel, PHP, Next.js, React, React Native, and TypeScript
- Database-driven systems using MySQL, MongoDB, PostgreSQL, PostGIS, Appwrite, and Firebase
- Admin dashboards, reporting tools, operational systems, and education platforms
- Public project cards plus detailed project case-study pages via `porto-show.html`

## Project Catalog

The projects section is now driven from `js/project-data.js` and grouped into switchable categories instead of a single static featured list.

Default front view highlights featured work such as:

- `ArahBelajar`
- `mainbipa.id`
- `nechcode.id`
- `REAL KEKE`
- `SMARTBALITA`
- `Rapor HIMATIKA`

Available project filters include:

- `Featured`
- `All Repos`
- `Next.js / React`
- `Laravel / PHP`
- `GIS / Maps`
- `Health-Tech`
- `Education`
- `Internal Systems`
- `Frontend`
- `Experiments`

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Google Fonts

### Portfolio Data Layer
- `js/project-data.js` contains shared portfolio metadata for featured projects
- `porto-show.html` reads project slugs from query parameters and renders detailed project pages
- `js/porto-show.js` handles detail-page rendering and screenshot carousel behavior

### Tooling
- Git and GitHub
- Formspree
- Static hosting via custom domain

## Project Structure

```text
haf/
|-- index.html
|-- porto-show.html
|-- README.md
|-- css/
|   `-- style.css
|-- js/
|   |-- script.js
|   |-- project-data.js
|   `-- porto-show.js
|-- img/
|   |-- CV.pdf
|   `-- [project preview images]
`-- project-descriptions/
```

## Adding Project Screenshots Later

Each featured project already has a dedicated detail page rendered from `porto-show.html?project=<slug>`.

To add screenshots later:

1. Put the new image files inside the folder referenced by `mediaFolder`, for example `img/arahbelajar/`, `img/mainbipa/`, or `img/realkeke/`
2. Open `js/project-data.js`
3. Keep the files named sequentially as `1.png`, `2.png`, `3.png`, and so on

The detail page is generated automatically from `mediaFolder`, scenes, and the `createProjectScreenshots(...)` helper in `js/project-data.js`. If no screenshots are available, the detail page shows carousel placeholders automatically.

## Local Usage

1. Clone the repository
2. Open `index.html` in a browser, or use Live Server in VS Code
3. Update content in `index.html`, `js/project-data.js`, and `README.md` as needed

## Contact

- Website: [hafmul.site](https://hafmul.site)
- LinkedIn: [linkedin.com/in/hafidz-mulia](https://www.linkedin.com/in/hafidz-mulia/)
- GitHub: [github.com/hafidzmulia-its](https://github.com/hafidzmulia-its)
- Email: `hafidzmuliia@gmail.com`

## License

This project is licensed under the MIT License.
