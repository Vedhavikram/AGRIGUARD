# **App Name**: AgriVision

## Core Features:

- AI Plant Doctor: Diagnose plant diseases and deficiencies using images uploaded by the user. Leverages Gemini 1.5 Pro's vision tool to analyze images and suggest treatments.
- Personalized Fertilizer Recommendations: Generate customized fertilizer recommendations based on identified diseases and crop type, tailored to local conditions. Uses LLM reasoning to incorporate all these parameters into the generated fertilizer prescription. Averages data from government APIs and crowdsourced pricing data.
- Market Connect: Integrate with Amazon, Flipkart, and IndiaMart via deep linking to enable farmers to purchase recommended fertilizers and products directly.
- Local Resources Locator: Locate nearby fertilizer shops and agricultural resources using Android implicit intents and Google Maps integration.
- Weather Intelligence: Access and display localized weather forecasts, including temperature, humidity, and precipitation, from the OpenWeatherMap API.
- Mandi Prices: Aggregate and display real-time market prices for crops from government APIs and other sources via a Firebase Cloud Function middleware to normalize the data.
- Report fertilizer price: Allow user to report prices to enhance the price aggregation module.

## Style Guidelines:

- Primary color: Deep green (#2E7D32) evoking growth and agriculture.
- Background color: Light green (#E8F5E9) for a calming, natural feel.
- Accent color: Amber (#FFC107) to highlight warnings, alerts, and important interactive elements.
- Body text: 'PT Sans', a humanist sans-serif for clarity in longer texts.
- Headline font: 'Playfair', a modern serif with a high-end feel.
- Intuitive pictograms accompanied by text labels to cater to users with varying literacy levels.
- Material 3 Design with high contrast, touch targets of at least 48x48dp, and enabled text scaling for accessibility.
- Loading animations during AI analysis and data synchronization to provide visual feedback during longer processes.