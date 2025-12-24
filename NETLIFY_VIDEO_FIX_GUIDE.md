# Netlify Deployment Fix - Video Playback Issues

## Issues Fixed

### 1. **Content Security Policy (CSP) - media-src**
   - **Problem**: CSP was blocking video playback with restrictive `media-src` directive
   - **Solution**: Updated CSP to allow `blob:`, `data:`, and `https:` sources for videos
   - **File**: `/app/frontend/index.html` (line 60)
   - **Change**: 
     ```
     OLD: media-src 'self' https://customer-assets.emergentagent.com
     NEW: media-src 'self' blob: data: https:
     ```

### 2. **HeroSection Video Implementation**
   - **Problem**: Overcomplicated video logic with retry mechanisms and multiple event listeners causing conflicts
   - **Solution**: Simplified to match DiNocPage implementation (which works correctly)
   - **File**: `/app/frontend/src/components/HeroSection.tsx`
   - **Changes**:
     - Removed intersection observer
     - Removed visibility change handlers
     - Removed retry logic
     - Simple playVideo function called once on mount

### 3. **Netlify Configuration**
   - **Problem**: Missing proper headers for video delivery and caching
   - **Solution**: Enhanced netlify.toml with video-specific configurations
   - **Files**:
     - `/app/netlify.toml` (root)
     - `/app/frontend/netlify.toml`
     - `/app/frontend/public/_headers` (NEW)
   
   **Key Additions**:
   ```toml
   # Video file headers
   [[headers]]
     for = "/*.mp4"
     [headers.values]
       Content-Type = "video/mp4"
       Cache-Control = "public, max-age=31536000, immutable"
       Accept-Ranges = "bytes"
   ```

### 4. **Vite Build Configuration**
   - **Problem**: React context errors due to chunk splitting
   - **Solution**: Consolidated React and related packages into single vendor chunk
   - **File**: `/app/frontend/vite.config.ts`
   - **Status**: Already fixed (from previous issue)

## Files Modified

1. ✅ `/app/frontend/index.html` - Updated CSP
2. ✅ `/app/frontend/src/components/HeroSection.tsx` - Simplified video logic
3. ✅ `/app/frontend/netlify.toml` - Enhanced with video headers
4. ✅ `/app/netlify.toml` - Root config with build settings
5. ✅ `/app/frontend/public/_headers` - NEW file for Netlify headers

## Deployment Checklist

### Before Pushing to GitHub:

1. ✅ **Verify video file exists**:
   ```bash
   ls -lh /app/frontend/public/hero-video.mp4
   # Should show: 1.8M file
   ```

2. ✅ **Build succeeds**:
   ```bash
   cd /app/frontend && npm run build
   # Check dist/hero-video.mp4 is copied
   ```

3. ✅ **Verify all config files**:
   ```bash
   ls /app/frontend/dist/netlify.toml
   ls /app/frontend/dist/_headers
   ls /app/frontend/dist/hero-video.mp4
   ```

### After Pushing to GitHub:

1. **Netlify Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Node version: `18`

2. **Verify Deployment**:
   - Check build logs for errors
   - Verify `hero-video.mp4` is deployed (check file size in deploy details)
   - Test video playback on deployed site

3. **If video still doesn't play**:
   - Check browser console for CSP errors
   - Verify video file URL is accessible: `https://your-site.netlify.app/hero-video.mp4`
   - Check Network tab for video loading (should see 206 Partial Content responses)

## Why Video Works on Di-Noc Page But Not Home Page

**Di-Noc Page**:
- Uses external URL: `https://customer-assets.emergentagent.com/...mp4`
- Simple video implementation with minimal event listeners
- Always allowed by CSP

**Home Page (Before Fix)**:
- Uses local file: `/hero-video.mp4`
- Complex video implementation with IntersectionObserver, retries, visibility handlers
- CSP was too restrictive for local videos

**After Fix**:
- Home page now uses same simple implementation as Di-Noc page
- CSP allows all video sources
- Proper headers ensure video is served correctly

## Testing Commands

```bash
# Local testing
cd /app/frontend
npm run build
npm run preview  # Test production build locally

# Check video in dist
ls -lh dist/hero-video.mp4

# Verify headers file
cat dist/_headers

# Verify netlify config
cat dist/netlify.toml
```

## Common Issues and Solutions

### Issue: Video shows black screen
**Solution**: Check CSP in browser console, ensure `media-src` allows the video source

### Issue: Video doesn't autoplay on mobile
**Solution**: Video must be `muted` and have `playsInline` attribute (✅ already fixed)

### Issue: Video takes long to load
**Solution**: 
- Compress video file (current: 1.8MB is reasonable)
- Ensure `Accept-Ranges: bytes` header is set (✅ done in _headers)
- Use `preload="metadata"` (already set)

### Issue: GitHub not picking up latest changes
**Solution**:
1. Ensure all files are committed: `git status`
2. Check .gitignore doesn't exclude necessary files
3. Verify push succeeded: `git log --oneline`
4. Trigger manual deploy in Netlify dashboard

## Video File Information

- **Location**: `/app/frontend/public/hero-video.mp4`
- **Size**: 1.8MB (1,832,455 bytes)
- **Format**: MP4 (H.264 video, AAC audio recommended)
- **Copies to**: `/app/frontend/dist/hero-video.mp4` during build

## Success Criteria

✅ Video file exists in dist after build
✅ No CSP errors in console
✅ Video element found on page with src="/hero-video.mp4"
✅ Video is not paused (playing state)
✅ Video is muted (required for autoplay)
✅ No JavaScript errors related to video playback

## Next Steps

1. **Commit all changes to GitHub**:
   ```bash
   git add .
   git commit -m "Fix: Video playback on Netlify - Updated CSP and simplified video logic"
   git push origin main
   ```

2. **Netlify will auto-deploy** (if connected to GitHub)

3. **Verify on deployed site**:
   - Visit your Netlify URL
   - Check if video plays automatically
   - Open browser console to check for any errors

4. **If issues persist**:
   - Check Netlify build logs
   - Verify environment variables (if any)
   - Test video URL directly: `https://your-site.netlify.app/hero-video.mp4`

## Support

If video still doesn't work after deployment:
1. Share Netlify deploy URL
2. Share browser console errors
3. Check Network tab for video request status
