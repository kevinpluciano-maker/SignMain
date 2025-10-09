# Admin Panel & WYSIWYG Editor Guide

## Overview
This guide explains the new Admin Panel with WYSIWYG editor functionality for managing website content.

---

## Features Implemented

### 1. ✅ Zoom Feature Removed from Product Images
- **Location**: Product detail pages and image galleries
- **Changes Made**:
  - Removed zoom-in icon overlay from `ImageGallery.tsx`
  - Removed zoom state and zoom handlers from `ProductImageGallery.tsx`
  - Removed `cursor-zoom-in` class from image containers
  - Images now display at normal scale without zoom functionality

### 2. ✅ WYSIWYG Editor Integration
- **Editor**: React Quill (Lightweight and feature-rich)
- **Features**:
  - Rich text formatting (bold, italic, underline, strike)
  - Headers (H1-H6)
  - Text colors and backgrounds
  - Lists (ordered and unordered)
  - Alignment options
  - Links, images, and videos
  - Code blocks and blockquotes
  - Font family selection
  - Font size selection
  - Live preview mode
  - Auto-save to localStorage
  - Save to database via API

### 3. ✅ Performance Optimizations (Already Completed)
All performance optimizations were completed in the previous task. See `/app/PERFORMANCE_OPTIMIZATIONS.md` for details.

---

## Accessing the Admin Panel

### URL
Navigate to: `http://localhost:3000/admin` or `https://your-domain.com/admin`

### Authentication
Currently using simple localStorage authentication. To access:
1. Log in to your account at `/login`
2. After login, navigate to `/admin`
3. The system will check for authentication

**Note**: In production, implement proper JWT-based authentication.

---

## Using the WYSIWYG Editor

### Content Sections Available
1. **Hero Section Title** - Homepage main title
2. **Hero Section Description** - Homepage description text
3. **About Page Content** - About page main content
4. **Footer Description** - Footer text

### Editor Interface

#### Tabs
1. **Editor Tab**:
   - Rich text editor with toolbar
   - All formatting options available
   - Paste content from Word/Google Docs
   - Add links, images, videos

2. **Typography Settings Tab**:
   - Font Family selector (Inter, Nunito, Arial, etc.)
   - Font Size selector (12px - 48px)
   - Live preview of typography changes

#### Toolbar Options
```
Headers      | H1, H2, H3, H4, H5, H6
Fonts        | Select from available fonts
Size         | Small, Normal, Large, Huge
Format       | Bold, Italic, Underline, Strike
Colors       | Text color, Background color
Scripts      | Subscript, Superscript
Lists        | Ordered, Bullet, Indent
Align        | Left, Center, Right, Justify
Insert       | Link, Image, Video
Other        | Blockquote, Code block, Clean format
```

### Workflow

#### 1. Edit Content
```
1. Select a section (e.g., "Hero Section Title")
2. Use the rich text editor to modify content
3. Apply formatting using the toolbar
4. Switch to "Typography Settings" to change fonts
5. Click "Preview" to see how it looks
```

#### 2. Save Changes
```
1. Make your edits
2. Click "Save Changes" button
3. Content is saved to:
   - localStorage (immediate backup)
   - Backend database (via API)
4. Success notification appears
```

#### 3. Reset Changes
```
1. Click "Reset" button to discard unsaved changes
2. Content reverts to last saved state
```

---

## Database Schema

### Content Sections Collection
```javascript
{
  "_id": ObjectId,
  "id": "uuid-string",
  "section_id": "hero-title",
  "content": "<h1>Professional Acrylic Braille Signs</h1>",
  "font_size": "48px",
  "font_family": "Inter",
  "plain_text": "Professional Acrylic Braille Signs",
  "timestamp": ISODate("2025-01-09T10:30:00Z")
}
```

### Fields Explanation
- **id**: Unique UUID for the document
- **section_id**: Identifier for the content section (e.g., "hero-title")
- **content**: HTML formatted content from the editor
- **font_size**: Selected font size
- **font_family**: Selected font family
- **plain_text**: Plain text version (for search/indexing)
- **timestamp**: Last updated timestamp

---

## API Endpoints

### Save Content Section
```http
POST /api/content/{section_id}

Request Body:
{
  "section_id": "hero-title",
  "content": "<h1>New Title</h1>",
  "font_size": "48px",
  "font_family": "Inter",
  "plain_text": "New Title"
}

Response: 200 OK
{
  "id": "uuid",
  "section_id": "hero-title",
  "content": "<h1>New Title</h1>",
  "font_size": "48px",
  "font_family": "Inter",
  "plain_text": "New Title",
  "timestamp": "2025-01-09T10:30:00Z"
}
```

### Get Content Section
```http
GET /api/content/{section_id}

Response: 200 OK
{
  "id": "uuid",
  "section_id": "hero-title",
  "content": "<h1>Title</h1>",
  "font_size": "48px",
  "font_family": "Inter",
  "plain_text": "Title",
  "timestamp": "2025-01-09T10:30:00Z"
}
```

### Get All Content
```http
GET /api/content

Response: 200 OK
[
  {
    "id": "uuid",
    "section_id": "hero-title",
    ...
  },
  {
    "id": "uuid",
    "section_id": "hero-description",
    ...
  }
]
```

---

## Files Modified/Created

### New Files
1. `/app/frontend/src/components/admin/WYSIWYGEditor.tsx` - WYSIWYG editor component
2. `/app/frontend/src/pages/AdminPanel.tsx` - Admin panel page
3. `/app/ADMIN_PANEL_GUIDE.md` - This documentation

### Modified Files
1. `/app/frontend/src/components/ProductImageGallery.tsx` - Removed zoom
2. `/app/frontend/src/components/ImageGallery.tsx` - Removed zoom icon
3. `/app/backend/server.py` - Added content API endpoints
4. `/app/frontend/src/App.tsx` - Added admin route

### Dependencies Added
- `react-quill` - WYSIWYG editor
- `quill` - Core editor library

---

## Customization

### Adding New Content Sections

#### 1. In AdminPanel.tsx
```typescript
const defaultSections: ContentSection[] = [
  // ... existing sections
  {
    id: 'new-section-id',
    name: 'New Section Name',
    content: '<p>Default content</p>',
    fontSize: '16px',
    fontFamily: 'Inter'
  }
];
```

#### 2. Use in Frontend Component
```typescript
import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load from API
    fetch('/api/content/new-section-id')
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};
```

### Customizing Editor Toolbar
In `WYSIWYGEditor.tsx`, modify the `modules` configuration:

```typescript
const modules = useMemo(() => ({
  toolbar: [
    // Add or remove toolbar options
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    // ... more options
  ]
}), []);
```

### Adding Font Families
```typescript
const fontFamilies = [
  { value: 'Inter', label: 'Inter' },
  { value: 'YourFont', label: 'Your Font Name' },
  // Add more fonts
];
```

---

## Security Considerations

### Current Implementation
⚠️ **Development Level Security** - Not production-ready

### For Production

#### 1. Implement Proper Authentication
```typescript
// Use JWT tokens
const token = localStorage.getItem('auth_token');

fetch('/api/content/section-id', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### 2. Add Role-Based Access Control
```python
# Backend - Add middleware
from fastapi import Depends, HTTPException

def verify_admin(token: str = Depends(oauth2_scheme)):
    # Verify token and check if user is admin
    if not is_admin(token):
        raise HTTPException(status_code=403, detail="Not authorized")
```

#### 3. Sanitize HTML Content
```typescript
import DOMPurify from 'dompurify';

const sanitizeContent = (content: string) => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};
```

#### 4. Rate Limiting
```python
# Backend - Add rate limiting
from slowapi import Limiter

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/content/{section_id}")
@limiter.limit("10/minute")
async def save_content(...):
    pass
```

---

## Testing

### Manual Testing Steps
1. Navigate to `/admin`
2. Edit content in each section
3. Change font family and size
4. Click "Preview" to verify appearance
5. Save changes
6. Reload page to verify persistence
7. Navigate to the actual page (e.g., homepage) to see changes

### API Testing
```bash
# Save content
curl -X POST http://localhost:8001/api/content/test-section \
  -H "Content-Type: application/json" \
  -d '{
    "section_id": "test-section",
    "content": "<h1>Test</h1>",
    "font_size": "24px",
    "font_family": "Inter",
    "plain_text": "Test"
  }'

# Get content
curl http://localhost:8001/api/content/test-section

# Get all content
curl http://localhost:8001/api/content
```

---

## Troubleshooting

### Editor Not Loading
**Issue**: White screen or loading spinner
**Solution**:
- Check browser console for errors
- Verify React Quill CSS is imported
- Clear browser cache

### Save Not Working
**Issue**: Changes don't persist
**Solution**:
- Check browser console for API errors
- Verify backend is running: `sudo supervisorctl status backend`
- Check MongoDB connection

### Styles Not Applying
**Issue**: Font changes don't show
**Solution**:
- Ensure fonts are loaded in `index.html`
- Check CSS specificity conflicts
- Use browser inspector to verify applied styles

### Images in Editor
**Issue**: Images not displaying
**Solution**:
- Use image URLs (not base64 for large images)
- Ensure image URLs are accessible
- Check CORS settings for external images

---

## Future Enhancements

### Planned Features
- [ ] Image upload and management
- [ ] Version history and rollback
- [ ] Collaborative editing
- [ ] Multi-language support
- [ ] Template system
- [ ] Bulk operations
- [ ] Export/Import content
- [ ] Advanced permissions

### Integration Ideas
- Integration with CDN for images
- AI-powered content suggestions
- SEO optimization hints
- Accessibility checker
- Content scheduling
- A/B testing support

---

## Support

### Common Questions

**Q: Can I use custom fonts?**
A: Yes, add them to the `fontFamilies` array and ensure they're loaded in your CSS.

**Q: How do I backup content?**
A: Content is automatically backed up to localStorage and the database. For manual backup, use the "Get All Content" API endpoint.

**Q: Can I edit HTML directly?**
A: Currently, you can use the "Source" button in the toolbar to view/edit HTML.

**Q: What's the maximum content size?**
A: No hard limit, but keep content reasonable for performance. Consider pagination for very long content.

---

## Summary

All requested features have been implemented:
✅ Zoom feature removed from product images
✅ WYSIWYG editor with rich formatting
✅ Font family and size selection
✅ Save to database functionality
✅ Admin panel interface
✅ Performance optimizations (completed previously)

The system is ready for use in development. For production deployment, implement the security enhancements outlined in this guide.
