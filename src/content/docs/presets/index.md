---
title: Presets
description: Ready-to-use configurations for terrain, weather, water, vegetation, and more
---

# Presets

The `@strata/presets` package provides ready-to-use configurations for all Strata systems, allowing you to quickly set up professional-quality scenes with sensible defaults.

## Installation

```bash
npm install @strata/presets @jbcom/strata
# or
pnpm add @strata/presets @jbcom/strata
```

## Quick Start

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata/presets/terrain';
import { createWeatherPreset, WeatherPresets } from '@strata/presets/weather';
import { createWaterPreset, WaterTypes } from '@strata/presets/water';

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
| [Terrain](/presets/terrain/) | `@strata/presets/terrain` | Biomes, heightmaps, texturing |
| [Weather](/presets/weather/) | `@strata/presets/weather` | Rain, snow, fog, storms |
| [Water](/presets/water/) | `@strata/presets/water` | Ocean, lake, river, pool |
| [Vegetation](/presets/vegetation/) | `@strata/presets/vegetation` | Forests, grasslands, gardens |
| [Clouds](/presets/clouds/) | `@strata/presets/clouds` | Cumulus, stratus, stormy |
| [Camera](/presets/camera/) | `@strata/presets/camera` | First-person, third-person, cinematic |
| [Animation](/presets/animation/) | `@strata/presets/animation` | Walk cycles, IK, gaits |
| [Physics](/presets/physics/) | `@strata/presets/physics` | Collision, buoyancy, wind |
| [Audio](/presets/audio/) | `@strata/presets/audio` | Ambient, spatial, environment |

## Using Presets

### With Components

```tsx
import { Terrain, Water, ProceduralSky } from '@jbcom/strata';
import { TerrainPresets, WaterPresets, SkyPresets } from '@strata/presets';

<Terrain {...TerrainPresets.ISLAND} />
<Water {...WaterPresets.TROPICAL_OCEAN} />
<ProceduralSky {...SkyPresets.SUNSET} />
```

### Customizing Presets

```typescript
import { createTerrainPreset, TerrainBiomes } from '@strata/presets/terrain';

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
import { createScenePreset } from '@strata/presets';

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
import { registerPreset } from '@strata/presets';

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
import { TerrainPresets } from '@strata/presets';
<Terrain {...TerrainPresets.ALIEN_PLANET} />
```

## Related

- [Terrain Presets](/presets/terrain/) - Biome configurations
- [Weather Presets](/presets/weather/) - Weather effects
- [Water Presets](/presets/water/) - Water body types
