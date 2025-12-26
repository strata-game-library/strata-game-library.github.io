---
title: Presets
description: Ready-to-use configurations for terrain, weather, water, vegetation, and more
---

# Presets

The `@strata-game-library/presets` package provides ready-to-use configurations for all Strata systems, allowing you to quickly set up professional-quality scenes with sensible defaults.

## Installation

```bash
npm install @strata-game-library/presets @strata-game-library/core
# or
pnpm add @strata-game-library/presets @strata-game-library/core
```

## Quick Start

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata-game-library/presets/terrain';
import { createWeatherPreset, WeatherPresets } from '@strata-game-library/presets/weather';
import { createWaterPreset, WaterTypes } from '@strata-game-library/presets/water';

// Create terrain with predefined biomes
const terrain = createTerrainPreset({
  biomes: [TerrainBiomes.GRASSLAND, TerrainBiomes.MOUNTAIN],
  resolution: 128,
});

// Apply weather preset
const weather = createWeatherPreset(WeatherPresets.RAIN);

// Create water body
const water = createWaterPreset(WaterTypes.OCEAN);
```

## Available Presets

| Category | Import | Description |
|----------|--------|-------------|
| [Terrain](/presets/terrain/) | `@strata-game-library/presets/terrain` | Biomes, heightmaps, texturing |
| [Weather](/presets/weather/) | `@strata-game-library/presets/weather` | Rain, snow, fog, storms |
| [Water](/presets/water/) | `@strata-game-library/presets/water` | Ocean, lake, river, pool |
| [Vegetation](/presets/vegetation/) | `@strata-game-library/presets/vegetation` | Forests, grasslands, gardens |
| [Clouds](/presets/clouds/) | `@strata-game-library/presets/clouds` | Cumulus, stratus, stormy |
| [Camera](/presets/camera/) | `@strata-game-library/presets/camera` | First-person, third-person, cinematic |
| [Animation](/presets/animation/) | `@strata-game-library/presets/animation` | Walk cycles, IK, gaits |
| [Physics](/presets/physics/) | `@strata-game-library/presets/physics` | Collision, buoyancy, wind |
| [Audio](/presets/audio/) | `@strata-game-library/presets/audio` | Ambient, spatial, environment |

## Using Presets

### With Components

```tsx
import { Terrain, Water, ProceduralSky } from '@strata-game-library/core';
import { TerrainPresets, WaterPresets, SkyPresets } from '@strata-game-library/presets';

<Terrain {...TerrainPresets.ISLAND} />
<Water {...WaterPresets.TROPICAL_OCEAN} />
<ProceduralSky {...SkyPresets.SUNSET} />
```

### Customizing Presets

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata-game-library/presets/terrain';

// Start with a preset, then customize
const customTerrain = createTerrainPreset({
  biomes: [TerrainBiomes.MOUNTAIN],
  resolution: 128,
});

// Override specific values
customTerrain.amplitude = 150;  // Taller mountains
customTerrain.snowHeight = 80;  // Lower snow line
```

### Combining Presets

```typescript
import { createScenePreset } from '@strata-game-library/presets';

const forestScene = createScenePreset({
  terrain: 'FOREST_HILLS',
  weather: 'LIGHT_RAIN',
  water: 'STREAM',
  vegetation: 'DENSE_FOREST',
  sky: 'OVERCAST',
});

// Returns combined configuration for all systems
<Scene {...forestScene} />
```

## Preset Structure

All presets follow a consistent structure:

```typescript
interface Preset<T> {
  name: string;
  description: string;
  category: string;
  settings: T;
  variants?: Record<string, Partial<T>>;
}
```

## Creating Custom Presets

```typescript
import { registerPreset } from '@strata-game-library/presets';

// Register a custom terrain preset
registerPreset('terrain', 'ALIEN_PLANET', {
  name: 'Alien Planet',
  description: 'Purple terrain with crystal formations',
  settings: {
    biomes: ['alien'],
    colors: {
      low: '#7b2cbf',
      mid: '#9d4edd',
      high: '#c77dff',
    },
    amplitude: 80,
    crystalFormations: true,
  },
});

// Use it like any other preset
import { TerrainPresets } from '@strata-game-library/presets';
<Terrain {...TerrainPresets.ALIEN_PLANET} />
```

## Related

- [Terrain Presets](/presets/terrain/) - Biome configurations
- [Weather Presets](/presets/weather/) - Weather effects
- [Water Presets](/presets/water/) - Water body types
