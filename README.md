# -intuji-frontend-associate-challenge\
\
This repository contains my submission for the Intuji Associate Software Engineer (Frontend) assignment

## Table of Contents

- 
  - [Project Overview](#project-overview)
  - [How to Run](#how-to-run)
  - [Folder / File Structure](#folder--file-structure)
  - [Screenshots](#screenshots)
  - Features and Notable Points

### Project Overview

This project implements the "FInance Dashboard" design from the provided Figma file to a responsive HTML/CSS and Javascript webpage. It serves as a dashboard with an overview, analytics chart, saving plan, and recent transactions. The goal is to closely match the Figma design while following the best practices for structure, responsiveness, and maintainable code.

### How to Run

- **Clone or Download**
  - Clone this repository to your local machine or download the ZIP file and extract it.
- **Open** `index.html`
  - Navigate to the root folder where the `index.html` file resides.

  - Double-click `index.html` or open it in your browser of choice.

### Folder/File Structure

```
root-folder/
│
├── index.html                 # Main HTML file with the dashboard layout
├── styles.css                 # Global CSS importing other CSS files
├── README.md                  # Documentation (this file)
│
├── css/
│   ├── navbar.css             # Styles for the sidebar and navigation
│   ├── header.css             # Styles for the top header and search bar
│   ├── main-overview.css      # Styles for the 'Overview' cards
│   ├── chart.css              # Styles for the analytics chart section
│   ├── saving-plan.css        # Styles for the 'Saving Plan' aside
│   └── recent-transactions.css # Styles for the 'Recent Transactions' aside
│
├── js/
│   ├── chart.js               # JavaScript controlling the chart
│   ├── saving-plan.js         # JavaScript controlling the saving plan data
│   └── side-bar.js            # JavaScript for sidebar toggles,
│
├── assets/
│   ├── icons/                 # Icons used in the page
│   └── images/                # Any images if needed
```

### Screenshots

Desktop Size:

![](https://holocron.so/uploads/c40291e0-image.png)

Mobile Screens (With Nav):

![](https://holocron.so/uploads/68e0ca7e-image.png)


![](https://holocron.so/uploads/83c115f2-image.png)

### Features and Notable Points

1. Responsive Layout 
   - Utilizes CSS media queries to adapt desktop and mobile viewports
2. Animations
   - **Analytics Chart**: Subtle transitions when rendering chart data or toggling between timeframes.
   - **Search Bar**: Animated focus effect that changes background positioning.
   - **Savings Plan**: Smooth progress bar transitions show savings progress in a visually engaging way.
3. Folder Organizations
   - Separated CSS files for each major component (navbar, header, overview cards, etc.).
   - Dedicated JavaScript files for different functionalities (chart logic, saving plan data, sidebar toggles).