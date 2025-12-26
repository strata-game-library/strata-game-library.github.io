---
title: Shaders
description: Standalone GLSL shader collection for Three.js - terrain, water, clouds, volumetric effects
---

# Shaders

The `@strata/shaders` package provides a standalone collection of GLSL shaders that work with any Three.js project—no Strata dependency required.

## Installation

```bash
npm install @strata/shaders
# or
pnpm add @strata/shaders
```

## Quick Start

```typescript
import { waterVertexShader, waterFragmentShader } from '@strata/shaders';
import * as THREE from 'three';

const material = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uWaterColor: { value: new THREE.Color(0x0077be) },
  }
});
```

## Available Shaders

### Terrain Shaders

| Shader | Description |
|--------|-------------|
| `terrainVertexShader` | Height-based vertex displacement |
| `terrainFragmentShader` | Multi-texture blending with triplanar mapping |

### Water Shaders

| Shader | Description |
|--------|-------------|
| `waterVertexShader` | Basic wave animation |
| `waterFragmentShader` | Fresnel reflections, transparency |
| `advancedWaterVertexShader` | Gerstner wave simulation |
| `advancedWaterFragmentShader` | Reflections, refractions, caustics, foam |

### Sky & Atmosphere

| Shader | Description |
|--------|-------------|
| `skyVertexShader` | Sky dome vertex shader |
| `skyFragmentShader` | Rayleigh/Mie scattering, sun rendering |
| `atmosphereVertexShader` | Atmospheric scattering vertex |
| `atmosphereFragmentShader` | Physically-based atmosphere |

### Cloud Shaders

| Shader | Description |
|--------|-------------|
| `cloudLayerVertexShader` | 2D cloud layer positioning |
| `cloudLayerFragmentShader` | Procedural cloud patterns |
| `volumetricCloudVertexShader` | 3D cloud ray marching setup |
| `volumetricCloudFragmentShader` | Volumetric cloud rendering |

### Volumetric Effects

| Shader | Description |
|--------|-------------|
| `volumetricFogShader` | Distance and height-based fog |
| `underwaterShader` | Underwater overlay with caustics |
| `godRaysVertexShader` | Light shaft positioning |
| `godRaysFragmentShader` | Volumetric god rays |

### Material Effects

| Shader | Description |
|--------|-------------|
| `toonVertexShader` / `toonFragmentShader` | Cel-shading / cartoon style |
| `hologramVertexShader` / `hologramFragmentShader` | Holographic effect |
| `dissolveVertexShader` / `dissolveFragmentShader` | Dissolve transition |
| `forcefieldVertexShader` / `forcefieldFragmentShader` | Energy shield effect |
| `glitchVertexShader` / `glitchFragmentShader` | Digital glitch effect |

### Vegetation

| Shader | Description |
|--------|-------------|
| `grassWindVertexShader` | Wind animation for grass instances |
| `treeWindVertexShader` | Wind animation for tree instances |

## Usage Examples

### Water with Animation

```typescript
import { waterVertexShader, waterFragmentShader } from '@strata/shaders';

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uWaterColor: { value: new THREE.Color(0x0077be) },
    uWaveHeight: { value: 0.5 },
    uWaveSpeed: { value: 1.0 },
    uOpacity: { value: 0.8 },
  },
  transparent: true,
});

// Update in render loop
function animate() {
  waterMaterial.uniforms.uTime.value += 0.016;
  requestAnimationFrame(animate);
}
```

### Procedural Sky

```typescript
import { skyVertexShader, skyFragmentShader } from '@strata/shaders';

const skyMaterial = new THREE.ShaderMaterial({
  vertexShader: skyVertexShader,
  fragmentShader: skyFragmentShader,
  uniforms: {
    sunPosition: { value: new THREE.Vector3(100, 50, 100) },
    turbidity: { value: 10 },
    rayleigh: { value: 2 },
    mieCoefficient: { value: 0.005 },
    mieDirectionalG: { value: 0.8 },
  },
  side: THREE.BackSide,
});

const sky = new THREE.Mesh(
  new THREE.SphereGeometry(1000, 32, 32),
  skyMaterial
);
```

### Volumetric Fog

```typescript
import { volumetricFogShader } from '@strata/shaders';

const fogMaterial = new THREE.ShaderMaterial({
  vertexShader: volumetricFogShader.vertex,
  fragmentShader: volumetricFogShader.fragment,
  uniforms: {
    uDensity: { value: 0.02 },
    uColor: { value: new THREE.Color(0x8899aa) },
    uCameraPos: { value: camera.position },
  },
  transparent: true,
  depthWrite: false,
});
```

## Shader Chunks

Reusable GLSL code chunks:

```typescript
import { noiseChunk, fbmChunk, sdfChunk } from '@strata/shaders/chunks';

// Use in custom shaders
const customFragment = `
  ${noiseChunk}
  ${fbmChunk}
  
  void main() {
    float n = fbm(vPosition * 0.1);
    gl_FragColor = vec4(vec3(n), 1.0);
  }
`;
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type { ShaderUniforms, WaterUniforms, SkyUniforms } from '@strata/shaders';

const uniforms: WaterUniforms = {
  uTime: { value: 0 },
  uWaterColor: { value: new THREE.Color(0x0077be) },
  uWaveHeight: { value: 0.5 },
  // TypeScript will catch any missing or incorrect uniforms
};
```

## Related

- [Water Shaders](/shaders/water/) - Detailed water shader docs
- [Sky Shaders](/shaders/sky/) - Atmosphere rendering
- [Volumetric Shaders](/shaders/volumetrics/) - Fog and effects
- [Material Effects](/shaders/materials/) - Special material shaders
