My details :
Student name: Pavithran Bhagavan
Grade: 9th
Class:9-B
School:Chrysalis High School
Project title:Farmspherica Smart Grow Planner – A Hydroponic Farm Planning and Visualization Platform



# Farmspherica Smart Grow Planner

## Overview  
Farmspherica Smart Grow Planner is a web‑based tool that lets you design and see a virtual hydroponic farm. You pick the type of farm, how big it is, your budget, sunlight, and optional gear (lights, pump, pH sensor, nutrients). The app instantly shows you the cost, monthly running expense, when you’ll break even, expected yearly harvest, water‑saving stats, and an overall sustainability score—all with smooth animations.

## Technologies Used  
* HTML5  
* CSS3  
* Plain JavaScript (no frameworks)

## Main Features  
* Intro splash with fading text  
* Sticky navigation that scrolls smoothly to sections  
* Interactive planner with sliders, radio buttons, and checkboxes  
* Live SVG farm visual that changes with your selections  
* Add‑on system (LED lights, pump, pH kit, nutrient kit)  
* Cost & ROI calculator with animated number counters  
* Yield, water‑saving, and sustainability metrics  
* Floating leaf animations across the page  
* Fully responsive layout for mobile and desktop  

## File Structure  

| File | What it does |
|------|--------------|
| **index.html** | Holds the page markup, sections, SVG visualizer, and links to the CSS and JS files |
| **style.css** | Defines colors, fonts, layout grids, responsive rules, and all the keyframe animations |
| **script.js** | Stores the app’s logic: state handling, calculations, SVG updates, UI event binding, and leaf animation creation |

## How the Calculator Works  
1. **Base cost** = fixed start price + (footprint × cost per sq ft).  
2. **Monthly cost** = fixed base + (footprint × monthly rate).  
3. Add‑on prices are added on top if you check the boxes.  
4. **ROI** = setup cost ÷ (your current grocery spend × 0.75).  
5. **Yield** = footprint × a base coefficient, boosted by lights and nutrients, then multiplied by a sunlight factor.  
6. **Water saving** starts at 90 % and climbs a few points if you add a pump or pH kit.  
7. **Sustainability score** starts at 50 and gains points from water savings, add‑ons, and good sunlight; max 100.  

All numbers animate smoothly whenever you change a setting.

## Farm Visualization Logic  
* The SVG shows different “environment” groups (balcony, rooftop, backyard, commercial) based on your farm type.  
* Pipe groups appear when the footprint passes certain thresholds, representing higher‑tier systems.  
* When you enable add‑ons, their corresponding SVG pieces appear (lights, pump, etc.).  
* Plant nodes are drawn in rows; their size grows with more sunlight, and their colors change if you select nutrients.

## Animation System (what you actually see)  
* Intro text fades in one after another.  
* Floating leaf elements drift across the page.  
* Numbers count up/down to the new values.  
* Buttons and navigation links have subtle hover effects.  
* Add‑on graphics slide in/out as you toggle the checkboxes.

## Local Storage  
The app does not save your choices; everything resets when you reload the page.

## Responsive Design  
The layout uses CSS Grid and a media query that collapses the header into a vertical stack on screens narrower than 480 px. Everything scales nicely on phones and tablets.

## How to Run  
1. Double‑click **`index.html`** (or open it in any modern browser).  
2. Play with the sliders, radio buttons, and checkboxes to see the calculations and visual updates instantly. No server or build step is needed.

## Conclusion  
Farmspherica Smart Grow Planner is a sleek, interactive web app that makes exploring hydroponic farm designs quick and visual. It packs all the core calculations, live SVG feedback, and smooth animations into a lightweight, client‑only solution
