# Hero Image Options

## Current Implementation
I've added Rhonda Patrick's image to the hero section with a side-by-side layout:
- Image on the left (300px wide)
- Text on the right
- Responsive: stacks vertically on mobile

## To Use Your Own Image

### Option 1: Direct URL
Replace the image URL in `index.html` line 24:
```html
<img src="YOUR_IMAGE_URL_HERE" alt="Description" />
```

### Option 2: Local Image
1. Add your image to the website folder (e.g., `hero-image.jpg`)
2. Update the HTML:
```html
<img src="hero-image.jpg" alt="Description" />
```

### Option 3: Background Image
To use as a background instead:

```css
/* In style.css */
.hero {
    background: linear-gradient(rgba(52, 73, 94, 0.8), rgba(52, 73, 94, 0.8)), 
                url('YOUR_IMAGE_URL') center/cover;
    color: white;
}
```

## Alternative Hero Layouts

### 1. Centered Overlay
```css
.hero-content {
    position: relative;
    text-align: center;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    z-index: -1;
}
```

### 2. Split Screen
```css
.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    padding: 0;
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 3. Circular Image
```css
.hero-image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
}
```

## Image Recommendations

- **Size**: 600-800px wide for faster loading
- **Format**: JPEG for photos, PNG for graphics
- **Optimization**: Use TinyPNG.com to compress
- **Alt text**: Always include for accessibility

## Free Image Sources
- Unsplash.com - Free stock photos
- Pexels.com - Free stock photos
- Use Rhonda's official images from FoundMyFitness

## Current Image Details
- Source: FoundMyFitness website
- Shows Rhonda with phone/crowdcast setup
- Professional quality
- Already optimized for web