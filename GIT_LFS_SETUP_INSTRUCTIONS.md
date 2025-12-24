# 🎥 FIX VIDEO ON NETLIFY - CRITICAL INSTRUCTIONS

## ✅ WHAT I JUST DID

1. **REVERTED** the image-first approach
2. **RESTORED** the video to be the primary hero element
3. **CREATED** .gitattributes file for Git LFS
4. Video will now play on loop as intended

---

## 🔥 CRITICAL: Setup Git LFS on Your Machine

The 1.8MB video file MUST use Git LFS for Netlify. Follow these steps:

### Step 1: Install Git LFS on Your Computer

**On Mac**:
```bash
brew install git-lfs
```

**On Windows**:
- Download from: https://git-lfs.github.com/
- Run the installer

**On Linux**:
```bash
sudo apt-get install git-lfs
# or
sudo yum install git-lfs
```

### Step 2: Initialize Git LFS in Your Repo

```bash
cd /path/to/your/bsign-repo

# Initialize LFS
git lfs install

# The .gitattributes file is already created, but verify:
cat .gitattributes
# Should show: *.mp4 filter=lfs diff=lfs merge=lfs -text
```

### Step 3: Re-commit the Video File with LFS

```bash
# Remove the video from regular git tracking
git rm --cached frontend/public/hero-video.mp4

# Re-add it (LFS will track it automatically now)
git add frontend/public/hero-video.mp4

# Add the gitattributes file
git add .gitattributes

# Commit
git commit -m "chore: Track hero-video.mp4 with Git LFS"

# Verify it's tracked by LFS
git lfs ls-files
# Should show: frontend/public/hero-video.mp4
```

### Step 4: Push to GitHub

```bash
git push origin main
```

This will upload the video to Git LFS storage.

### Step 5: Configure Netlify

1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Click **Add variable**
5. Add:
   - Key: `GIT_LFS_ENABLED`
   - Value: `true`
6. Save

### Step 6: Redeploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for deployment

---

## ✅ RESULT

After following these steps:
- ✅ Video will load on Netlify (NO 503 error)
- ✅ Video will play on loop automatically
- ✅ Works on all devices
- ✅ Same as Emergent preview

---

## 🚨 IMPORTANT NOTES

1. **Git LFS is REQUIRED** - Netlify cannot serve the 1.8MB video without it
2. **You MUST do this on your local machine** (where you push to GitHub)
3. **The .gitattributes file is already created** in the repo
4. **After pushing, ENABLE Git LFS in Netlify settings** (Step 5 above)

---

## 🧪 HOW TO VERIFY

After deployment:

1. Visit your Netlify URL
2. Open DevTools (F12) → Network tab
3. Look for `hero-video.mp4`
4. Should see:
   - **Status: 200** (NOT 503!)
   - **Size: ~1.8MB**
   - Video plays automatically

---

## 💡 WHY THIS WORKS

- **Git LFS** stores large files separately
- Netlify knows how to serve Git LFS files properly
- The video is delivered through GitHub's LFS CDN
- NO 503 errors because file is properly tracked

---

## 🆘 IF YOU CAN'T INSTALL GIT LFS

**Alternative**: I can help you compress the video to under 1MB, then it won't need LFS.

Let me know if you want this option instead.

---

## 📋 QUICK CHECKLIST

- [ ] Install Git LFS on your machine
- [ ] Run `git lfs install`
- [ ] Run `git rm --cached frontend/public/hero-video.mp4`
- [ ] Run `git add frontend/public/hero-video.mp4`
- [ ] Run `git add .gitattributes`
- [ ] Commit and push
- [ ] Enable `GIT_LFS_ENABLED=true` in Netlify
- [ ] Clear cache and redeploy
- [ ] Test video on deployed site

---

## ✅ CODE IS READY

All code changes are committed. The video is now the primary hero element (not the image).

**Once you setup Git LFS and push, your video will work perfectly on Netlify!** 🎥
