# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Contractor Pro is a React Native mobile app built with Expo SDK 54 for contractors to manage clients, create estimates, and document job sites with photos.

## Commands

```bash
# Start development server (opens Metro bundler)
npm start

# Run on specific platforms
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Web browser
```

## Architecture

### Tech Stack
- **Framework**: Expo SDK 54 with React Native 0.81
- **Language**: TypeScript (strict mode via `expo/tsconfig.base`)
- **Navigation**: React Navigation v7 with bottom tabs
- **Camera/Photos**: expo-camera, expo-image-picker

### Source Structure (`src/`)
- `screens/` - Main app screens, exported via barrel file (`index.ts`)
- `types/` - TypeScript interfaces for domain models (`Client`, `Estimate`, `Photo`)
- `components/` - Reusable UI components (currently empty)
- `services/` - Business logic and data persistence (currently empty)
- `navigation/` - Navigation configuration (currently empty)
- `utils/` - Helper functions (currently empty)

### Key Patterns
- Screens use `SafeAreaView` from `react-native-safe-area-context`
- Styles are colocated with components using `StyleSheet.create()`
- Primary brand color: `#2563eb` (blue)
- State is currently local to screens (no global state management yet)
- Estimate status enum: `'draft' | 'sent' | 'accepted' | 'rejected'`

### Navigation Structure
Tab-based navigation with 4 main screens:
1. Dashboard - Overview and quick actions
2. Estimates - Job estimates with line items
3. Photos - Job site photo documentation
4. Clients - Client contact management
