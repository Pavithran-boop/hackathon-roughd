/**
 * FARMSPHERICA SMART GROW PLANNER — CORE ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 🎛️ PRICING & MATRIX CONFIGURATION
    // ==========================================
    const PRICING_CONFIG = {
        // Base starting values for the smallest system footprint
        baseSetupCost: 50,       // Minimum base cost to get started ($)
        costPerSquareFoot: 1.50, // Smooth continuous cost scaling per sq ft

        baseMonthlyCost: 5,      // Minimum monthly maintenance ($)
        monthlyPerSquareFoot: 0.10, // Continuous upkeep scaling per sq ft

        // Tier classification naming breakpoints
        tier2Threshold: 80,      // Sq ft where system transitions to A-Frame
        tier3Threshold: 500,     // Sq ft where system transitions to Industrial

        // Hardware Add-on Flat Pricing
        addons: {
            lights: 60,
            pump: 35,
            phKit: 25,
            nutrients: 30
        },

        groceryOffsetIndex: 0.75 // 75% grocery bill replacement efficiency index
    };

    // --- GLOBAL APP STATE ---
    const appState = {
        farmType: 'balcony',
        space: 40,
        budget: 350,
        sunlight: 5,
        spending: 120,
        addons: {
            lights: false,
            pump: false,
            ph: false,
            nutrients: false
        }
    };

    // --- EXECUTE INTRO SPLASH TIMING MATRIX SEQUENCE ---
    const runIntroSequence = () => {
        const splash = document.getElementById('intro-splash');
        const brand = document.getElementById('intro-brand');
        const presents = document.getElementById('intro-presents');
        const title = document.getElementById('intro-title');

        setTimeout(() => brand.classList.add('visible'), 400);
        setTimeout(() => presents.classList.add('visible'), 1100);
        setTimeout(() => title.classList.add('visible'), 1800);

        setTimeout(() => {
            splash.classList.add('fade-out');
            document.body.style.overflowY = 'auto';
        }, 3600);
    };

    document.body.style.overflowY = 'hidden';
    runIntroSequence();

    // --- DOM CACHE MATRIX ---
    const DOM = {
        farmRadioGroup: document.querySelectorAll('input[name="farmType"]'),
        spaceSlider: document.getElementById('spaceRange'),
        budgetSlider: document.getElementById('budgetRange'),
        sunlightSlider: document.getElementById('sunlightRange'),
        spendingSlider: document.getElementById('spendingRange'),

        spaceBadge: document.getElementById('spaceVal'),
        budgetBadge: document.getElementById('budgetVal'),
        sunlightBadge: document.getElementById('sunlightVal'),
        spendingBadge: document.getElementById('spendingVal'),

        chkLights: document.getElementById('addonLights'),
        chkPump: document.getElementById('addonPump'),
        chkPh: document.getElementById('addonPh'),
        chkNutrients: document.getElementById('addonNutrients'),

        lblSystemName: document.getElementById('calcSystemName'),
        lblSetupCost: document.getElementById('calcSetupCost'),
        lblMonthlyCost: document.getElementById('calcMonthlyCost'),
        lblAnnualCost: document.getElementById('calcAnnualCost'),
        lblYield: document.getElementById('calcYieldOutput'),
        lblWater: document.getElementById('calcWaterSavings'),
        lblRoi: document.getElementById('calcRoiTimeline'),
        lblSustainScore: document.getElementById('calcSustainabilityScore'),
        progressBar: document.getElementById('scoreProgressBar'),

        modal: document.getElementById('checkoutModal'),
        btnLock: document.getElementById('btnLockConfiguration'),
        btnCloseModal: document.getElementById('btnCloseModal'),
        btnModalAck: document.getElementById('btnModalAcknowledge'),
        modalScale: document.getElementById('modalSummaryScale'),
        modalCost: document.getElementById('modalSummaryCost'),

        envBalcony: document.getElementById('env-balcony'),
        envRooftop: document.getElementById('env-rooftop'),
        envBackyard: document.getElementById('env-backyard'),
        envCommercial: document.getElementById('env-commercial'),
        pipeTier1: document.getElementById('farm-pipes-tier1'),
        pipeTier2: document.getElementById('farm-pipes-tier2'),
        pipeTier3: document.getElementById('farm-pipes-tier3'),
        streamT1: document.getElementById('stream-t1'),
        streamT2: document.getElementById('stream-t2'),
        streamT3: document.getElementById('stream-t3'),
        simPumpLoop: document.getElementById('sim-water-pump-loop'),

        simLights: document.getElementById('sim-addon-lights'),
        fixtureTop: document.getElementById('light-fixture-top'),
        fixtureMid: document.getElementById('light-fixture-mid'),
        fixtureBtm: document.getElementById('light-fixture-btm'),
        simPump: document.getElementById('sim-addon-pump'),
        simPh: document.getElementById('sim-addon-ph'),
        simNutrients: document.getElementById('sim-addon-nutrients'),
        plantContainer: document.getElementById('plant-population-matrix'),
        globalLeaves: document.getElementById('global-leaves-canvas')
    };

    // --- METRIC CALCULATOR ENGINE ---
    const recalculateSystemMetrics = () => {
        // 1. FIXED CORRECTION: Setup cost scales smoothly based on exact square footage input
        let computedSetupTotal = PRICING_CONFIG.baseSetupCost + (appState.space * PRICING_CONFIG.costPerSquareFoot);
        let computedMonthlyTotal = PRICING_CONFIG.baseMonthlyCost + (appState.space * PRICING_CONFIG.monthlyPerSquareFoot);

        // 2. Classify system architecture tier naming dynamically based on space milestones
        let baseSystemName = "Micro DWC Frame";
        let tierScale = 1;

        if (appState.space > PRICING_CONFIG.tier3Threshold) {
            baseSystemName = "Industrial Multi-Rack Facility";
            tierScale = 3;
        } else if (appState.space > PRICING_CONFIG.tier2Threshold) {
            baseSystemName = "A-Frame Automated Vertical Deck";
            tierScale = 2;
        }

        // 3. Increment flat hardware options securely if toggled
        if (appState.addons.lights) computedSetupTotal += PRICING_CONFIG.addons.lights;
        if (appState.addons.pump) computedSetupTotal += PRICING_CONFIG.addons.pump;
        if (appState.addons.ph) computedSetupTotal += PRICING_CONFIG.addons.phKit;
        if (appState.addons.nutrients) computedSetupTotal += PRICING_CONFIG.addons.nutrients;

        // 4. Calculate continuous ROI break-even timeline
        const netValueIndex = appState.spending * PRICING_CONFIG.groceryOffsetIndex;
        let breakEvenMonths = netValueIndex > 0 ? (computedSetupTotal / netValueIndex) : 12;
        if (breakEvenMonths < 1) breakEvenMonths = 1;

        // 5. Calculate continuous harvest production outputs
        let yieldCoefficient = 0.35;
        if (appState.addons.lights) yieldCoefficient += 0.15;
        if (appState.addons.nutrients) yieldCoefficient += 0.10;
        const sunPerformanceMultiplier = 0.5 + (appState.sunlight / 12);
        let calculatedAnnualYield = appState.space * yieldCoefficient * 12 * sunPerformanceMultiplier;

        // 6. Compute ecological asset metrics
        let waterSavingsBase = 90;
        if (appState.addons.pump) waterSavingsBase += 3;
        if (appState.addons.ph) waterSavingsBase += 2;
        if (waterSavingsBase > 98) waterSavingsBase = 98;

        let rawSustainScore = 50;
        rawSustainScore += (waterSavingsBase - 90) * 4;
        if (appState.addons.lights) rawSustainScore += 10;
        if (appState.addons.nutrients) rawSustainScore += 15;
        if (appState.sunlight > 7) rawSustainScore += 10;
        if (rawSustainScore > 100) rawSustainScore = 100;

        // Route numbers down to numerical counter animations
        animateNumericalCounter(DOM.lblSetupCost, Math.round(computedSetupTotal), "$");
        animateNumericalCounter(DOM.lblMonthlyCost, Math.round(computedMonthlyTotal), "$");
        animateNumericalCounter(DOM.lblAnnualCost, Math.round(computedMonthlyTotal * 12), "$");
        animateNumericalCounter(DOM.lblYield, Math.round(calculatedAnnualYield), "", " lbs/yr");
        animateNumericalCounter(DOM.lblWater, waterSavingsBase, "", "%");
        animateNumericalCounter(DOM.lblRoi, parseFloat(breakEvenMonths.toFixed(1)), "", " Mos");
        animateNumericalCounter(DOM.lblSustainScore, Math.round(rawSustainScore), "");

        DOM.lblSystemName.innerText = `${baseSystemName} (Tier ${tierScale})`;
        DOM.progressBar.style.width = `${rawSustainScore}%`;

        syncVisualizerMatrixOutput(tierScale, sunPerformanceMultiplier);
    };

    const animateNumericalCounter = (element, targetValue, prefix = "", suffix = "") => {
        let currentValue = parseFloat(element.innerText.replace(/[^0-9.]/g, '')) || 0;
        if (currentValue === targetValue) return;

        const animationDuration = 250; // Faster duration for snappier slider tracking
        const frameRateTime = 1000 / 60;
        const incrementalStepCount = animationDuration / frameRateTime;
        const calculationDeltaDelta = (targetValue - currentValue) / incrementalStepCount;

        let frameIndex = 0;
        const trackingTimerLoop = setInterval(() => {
            frameIndex++;
            currentValue += calculationDeltaDelta;

            if (Number.isInteger(targetValue)) {
                element.innerText = prefix + Math.round(currentValue) + suffix;
            } else {
                element.innerText = prefix + currentValue.toFixed(1) + suffix;
            }

            if (frameIndex >= incrementalStepCount) {
                clearInterval(trackingTimerLoop);
                element.innerText = prefix + targetValue + suffix;
            }
        }, frameRateTime);
    };

    // --- VISUAL ARCHITECTURE CONTROL HUB ---
    const syncVisualizerMatrixOutput = (tier, sunFactor) => {
        DOM.envBalcony.style.display = appState.farmType === 'balcony' ? 'block' : 'none';
        DOM.envRooftop.style.display = appState.farmType === 'rooftop' ? 'block' : 'none';
        DOM.envBackyard.style.display = appState.farmType === 'backyard' ? 'block' : 'none';
        DOM.envCommercial.style.display = appState.farmType === 'commercial' ? 'block' : 'none';

        DOM.pipeTier2.style.display = tier >= 2 ? 'block' : 'none';
        DOM.pipeTier3.style.display = tier === 3 ? 'block' : 'none';

        DOM.simLights.style.display = appState.addons.lights ? 'block' : 'none';
        DOM.fixtureTop.style.display = (appState.addons.lights && tier === 3) ? 'block' : 'none';
        DOM.fixtureMid.style.display = (appState.addons.lights && tier >= 2) ? 'block' : 'none';
        DOM.fixtureBtm.style.display = appState.addons.lights ? 'block' : 'none';

        DOM.simPump.style.display = appState.addons.pump ? 'block' : 'none';
        DOM.simPh.style.display = appState.addons.ph ? 'block' : 'none';
        DOM.simNutrients.style.display = appState.addons.nutrients ? 'block' : 'none';

        if (appState.addons.pump) {
            DOM.simPumpLoop.style.display = 'block';
            DOM.streamT2.style.display = tier >= 2 ? 'block' : 'none';
            DOM.streamT3.style.display = tier === 3 ? 'block' : 'none';
        } else {
            DOM.simPumpLoop.style.display = 'none';
        }

        populateVisualCropNodes(tier, sunFactor);
    };

    const populateVisualCropNodes = (tier, sunFactor) => {
        DOM.plantContainer.innerHTML = "";
        const trackRowsY = [236];
        if (tier >= 2) trackRowsY.push(166);
        if (tier === 3) trackRowsY.push(96);

        const horizontalIntervalsX = [140, 180, 220, 260, 300, 340, 380, 420, 460];
        let maxEntityCap = horizontalIntervalsX.length;
        if (appState.space < 30) maxEntityCap = 4;
        else if (appState.space < 60) maxEntityCap = 6;

        trackRowsY.forEach((coordinateY) => {
            for (let i = 0; i < maxEntityCap; i++) {
                const coordinateX = horizontalIntervalsX[i];
                const groupNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
                groupNode.setAttribute("class", "plant-node-element sprout-action");
                groupNode.setAttribute("style", `transform-origin: ${coordinateX}px ${coordinateY}px; animation-delay: ${i * 20}ms;`);

                const leafScaleRadius = 10 * sunFactor;
                const foliageLeafLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
                foliageLeafLeft.setAttribute("d", `M ${coordinateX} ${coordinateY} C ${coordinateX - leafScaleRadius} ${coordinateY - (leafScaleRadius * 2)}, ${coordinateX - (leafScaleRadius * 2)} ${coordinateY - leafScaleRadius}, ${coordinateX} ${coordinateY}`);
                foliageLeafLeft.setAttribute("fill", appState.addons.nutrients ? "#16A34A" : "#22C55E");

                const foliageLeafRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
                foliageLeafRight.setAttribute("d", `M ${coordinateX} ${coordinateY} C ${coordinateX + leafScaleRadius} ${coordinateY - (leafScaleRadius * 2)}, ${coordinateX + (leafScaleRadius * 2)} ${coordinateY - leafScaleRadius}, ${coordinateX} ${coordinateY}`);
                foliageLeafRight.setAttribute("fill", appState.addons.nutrients ? "#15803D" : "#4ADE80");

                groupNode.appendChild(foliageLeafLeft);
                groupNode.appendChild(foliageLeafRight);
                DOM.plantContainer.appendChild(groupNode);
            }
        });
    };

    // --- EVENT INTERACTION BINDINGS ---
    DOM.farmRadioGroup.forEach(radioElement => {
        radioElement.addEventListener('change', (e) => {
            appState.farmType = e.target.value;
            if (appState.farmType === 'commercial' && appState.space < 400) {
                appState.space = 1200;
                DOM.spaceSlider.value = 1200;
                DOM.spaceBadge.innerText = "1200 sq ft";
            } else if (appState.farmType === 'balcony' && appState.space > 100) {
                appState.space = 30;
                DOM.spaceSlider.value = 30;
                DOM.spaceBadge.innerText = "30 sq ft";
            }
            recalculateSystemMetrics();
        });
    });

    const bindSliderConfigurationEvent = (sliderElement, stateFieldKey, unitSuffix) => {
        sliderElement.addEventListener('input', (e) => {
            const numericValue = parseInt(e.target.value);
            appState[stateFieldKey] = numericValue;

            if (stateFieldKey === 'space') DOM.spaceBadge.innerText = `${numericValue} ${unitSuffix}`;
            if (stateFieldKey === 'budget') DOM.budgetBadge.innerText = `$${numericValue}`;
            if (stateFieldKey === 'sunlight') DOM.sunlightBadge.innerText = `${numericValue} ${unitSuffix}`;
            if (stateFieldKey === 'spending') DOM.spendingBadge.innerText = `$${numericValue}${unitSuffix}`;

            recalculateSystemMetrics();
        });
    };

    bindSliderConfigurationEvent(DOM.spaceSlider, 'space', 'sq ft');
    bindSliderConfigurationEvent(DOM.budgetSlider, 'budget', '');
    bindSliderConfigurationEvent(DOM.sunlightSlider, 'sunlight', 'hrs/day');
    bindSliderConfigurationEvent(DOM.spendingSlider, 'spending', '/mo');

    const bindCheckboxComponentOption = (checkboxElement, stateAddonKey) => {
        checkboxElement.addEventListener('change', (e) => {
            appState.addons[stateAddonKey] = e.target.checked;
            recalculateSystemMetrics();
        });
    };

    bindCheckboxComponentOption(DOM.chkLights, 'lights');
    bindCheckboxComponentOption(DOM.chkPump, 'pump');
    bindCheckboxComponentOption(DOM.chkPh, 'ph');
    bindCheckboxComponentOption(DOM.chkNutrients, 'nutrients');

    // --- SMOOTH-SCROLLING FUNCTIONALITY ---
    document.querySelectorAll('[data-scroll-to], .nav-item').forEach(actionTrigger => {
        actionTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            let targetDomId = actionTrigger.getAttribute('data-scroll-to');
            if (!targetDomId && actionTrigger.getAttribute('href')) {
                targetDomId = actionTrigger.getAttribute('href').replace('#', '');
            }

            const targetElementNode = document.getElementById(targetDomId);
            if (targetElementNode) {
                targetElementNode.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle updates tracking active scroll sections inside navbar header
    const sectionContainers = document.querySelectorAll('section, footer');
    const navAnchors = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let activeElementId = "";
        const scrollPositionOffset = window.scrollY + 140;

        sectionContainers.forEach(sec => {
            const topBoundary = sec.offsetTop;
            const bottomBoundary = topBoundary + sec.offsetHeight;
            if (scrollPositionOffset >= topBoundary && scrollPositionOffset <= bottomBoundary) {
                activeElementId = sec.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === `#${activeElementId}`) {
                anchor.classList.add('active');
            }
        });
    });

    // --- MODAL DIALOG CONTROLS ---
    DOM.btnLock.addEventListener('click', () => {
        DOM.modalScale.innerText = DOM.lblSystemName.innerText;
        DOM.modalCost.innerText = DOM.lblSetupCost.innerText;
        DOM.modal.classList.add('open');
    });

    const closeSystemModal = () => DOM.modal.classList.remove('open');
    DOM.btnCloseModal.addEventListener('click', closeSystemModal);
    DOM.btnModalAck.addEventListener('click', closeSystemModal);

    // --- LEAF ENVIRONMENT ENGINE ---
    const buildGlobalAmbientFoliageEngine = (container, maxLeavesCount) => {
        if (!container) return;
        for (let i = 0; i < maxLeavesCount; i++) {
            const leafNode = document.createElement('div');
            leafNode.className = 'floating-leaf';
            leafNode.style.left = `${Math.random() * 100}%`;
            leafNode.style.top = `${Math.random() * 100}%`;
            leafNode.style.animationDelay = `${Math.random() * 8}s`;
            leafNode.style.animationDuration = `${6 + Math.random() * 6}s`;
            container.appendChild(leafNode);
        }
    };

    buildGlobalAmbientFoliageEngine(DOM.globalLeaves, 15);
    buildGlobalAmbientFoliageEngine(document.getElementById('intro-leaves'), 12);
    buildGlobalAmbientFoliageEngine(document.getElementById('hero-leaves'), 8);

    recalculateSystemMetrics();
});