# GLB Models Directory

This directory contains 3D GLB model files for the product 3D viewer.

## File Naming Convention
GLB files should be named to match product images:
- `door-sign-395.glb` matches `door-sign-395.jpg`
- `door-sign-159.glb` matches `door-sign-159.jpg`
- etc.

## Model Requirements
- Format: GLB (Binary glTF)
- MIME type: model/gltf-binary
- Recommended size: < 10MB for web performance
- No auto-playing animations (will be paused on load)

## Browser Support
The model-viewer component provides:
- WebGL-based rendering
- AR support on compatible mobile devices
- Fallback to static images on unsupported devices

## Usage
Models are automatically loaded based on product image names, or you can specify a custom `glbUrl` prop when using the 3D viewer components.