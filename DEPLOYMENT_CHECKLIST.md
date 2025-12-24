# 🚀 NETLIFY DEPLOYMENT CHECKLIST

## ⚠️ CRITICAL: Must Clear Cache!

Before deploying, you MUST clear Netlify's build cache:

### Option 1: Netlify Dashboard
1. Open Netlify Dashboard → Your Site
2. **Site Configuration** → **Build & deploy**
3. Click **"Clear cache and retry deploy"**

### Option 2: Redeploy Button
1. In Netlify Dashboard, click **"Deploys"**
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ Deployment Steps

### 1. Verify Changes Locally
```bash
cd /app/frontend
npm run build

# Should see ONE bundle:
ls -lh dist/assets/js/
# ✅ Expected: index-[hash].js (~849KB)
# ❌ Should NOT see: vendor-misc-*.js, vendor-react-*.js
```

### 2. Commit to GitHub
```bash
cd /app
git add .
git commit -m "Fix: Netlify createContext error + video playback"
git push origin main
```

### 3. Clear Netlify Cache (CRITICAL!)
- Use Option 1 or 2 above
- **DO NOT skip this step!**

### 4. Wait for Build
- Monitor build logs
- Should complete in ~2-3 minutes

### 5. Test Deployed Site
```
✅ Homepage loads
✅ No console errors
✅ Video plays
✅ Navigation works
✅ Cart works
```

---

## 🎯 What to Check After Deploy

### Browser Console (F12)
- ✅ NO "createContext" errors
- ✅ NO "vendor-misc" errors
- ✅ Should see: "Hero video playing"

### Network Tab
- ✅ Single index-*.js bundle
- ✅ NO vendor-misc-*.js files
- ✅ hero-video.mp4 loads (200/206 status)

---

## 🐛 If Issues Persist

1. **Hard refresh browser**: Ctrl+Shift+R (or Cmd+Shift+R)
2. **Check build logs** in Netlify for errors
3. **Verify Node version** in logs: should use Node 18
4. **Clear browser cache** completely
5. **Try different browser** to rule out cache

---

## 📋 Files Changed

- ✅ vite.config.ts - Removed manual chunking
- ✅ index.html - Updated CSP for videos
- ✅ HeroSection.tsx - Simplified video logic
- ✅ .nvmrc files - Node 18
- ✅ netlify.toml - Build config
- ✅ _headers - Asset headers

---

## 🎉 Success = No Errors!

If you can browse the site without console errors, you're done! ✅

---

**Need Help?** Check `/app/NETLIFY_CRITICAL_FIX.md` for detailed troubleshooting.
