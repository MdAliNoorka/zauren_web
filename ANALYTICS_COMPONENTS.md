# Analytics Components Guide

## CompactAnalytics vs RealTimeAnalytics

### CompactAnalytics (New - Space Efficient)
- **Use when**: You need analytics in a limited space area
- **Features**:
  - Compact horizontal layout (4 key metrics in a row)
  - Smaller card with minimal padding
  - Dismissible (users can close it)
  - Live updates every 3 seconds
  - Hover effects for interactivity
  - Responsive grid (2 columns on mobile, 4 on desktop)

### RealTimeAnalytics (Original - Full Featured)
- **Use when**: You have dedicated space for detailed analytics
- **Features**:
  - Large comprehensive dashboard
  - 6 key metrics in grid layout
  - Platform activity breakdown
  - More detailed information display
  - Larger visual elements
  - Better for dedicated analytics pages

## Current Implementation
The main page now uses `CompactAnalytics` to save space while still providing real-time insights. The original `RealTimeAnalytics` component is still available for use in dashboard pages or where more detailed analytics are needed.

## Customization
Both components can be easily customized by:
- Modifying the `initialMetrics` array to show different data
- Adjusting the update interval (currently 3 seconds)
- Changing colors and styling
- Adding or removing metrics as needed
