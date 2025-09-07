# 🎸 Elvis 3D Character Setup Guide

## 📁 File Placement

1. **Copy your `elvis.fbx` file** to the `public` folder in your project
2. **Rename it** to `elvis.fbx` (if it's not already named that)
3. **Final path should be**: `public/elvis.fbx`

## 🎭 Animation Setup (Recommended)

For the best experience, your Elvis.fbx file should contain these animations:

### **Required Animations:**
1. **Walking Animation** (index 0) - For when Elvis moves between form fields
2. **Pointing Animation** (index 1) - For when Elvis points at form fields  
3. **Idle Animation** (index 2) - For when Elvis is standing still

### **Animation Tips:**
- **Walking**: Should be a loop-able animation (8-12 frames)
- **Pointing**: Should point with one arm (3-4 frames)
- **Idle**: Subtle breathing or standing animation (4-6 frames)

## ⚙️ Customization Options

### **Scale Adjustment**
If Elvis appears too big or small, modify the scale in `ContactGuide3D.tsx`:
```typescript
fbx.scale.setScalar(0.01); // Adjust this value (0.005 = smaller, 0.02 = bigger)
```

### **Position Adjustment**
Modify the positions array in `ContactGuide3D.tsx`:
```typescript
const positions: [number, number, number][] = [
  [10, 0, 0], // Off-screen right
  [8, 0, 0],  // Peeking over edge
  [3, 1, 0],  // Near name field
  [3, 0, 0],  // Near email field
  [3, -1, 0], // Near message field
  [2, -2, 0], // Final position
];
```

### **Animation Timing**
Adjust the delays array for different timing:
```typescript
const delays = [0, 1500, 3000, 4500, 6000, 7500]; // Milliseconds
```

## 🎨 Styling Options

### **Lighting**
Modify the lighting setup in the Canvas:
```typescript
<ambientLight intensity={0.6} />
<directionalLight position={[10, 10, 5]} intensity={1} />
<pointLight position={[-10, -10, -10]} intensity={0.5} />
```

### **Environment**
Change the environment preset:
```typescript
<Environment preset="sunset" /> // Options: sunset, dawn, night, warehouse, forest, apartment, studio, city, park, lobby
```

## 🚀 Testing Your Setup

1. **Place your `elvis.fbx` file** in the `public` folder
2. **Start the development server**: `npm run dev`
3. **Navigate to** `/contact` page
4. **Watch Elvis** appear and guide users through the form!

## 🔧 Troubleshooting

### **Character Not Loading**
- Check that `elvis.fbx` is in the `public` folder
- Check browser console for errors
- Verify the file path is correct

### **Character Too Big/Small**
- Adjust the scale value in the component
- Try values between 0.005 and 0.05

### **Animations Not Working**
- Ensure your FBX file contains animations
- Check that animations are properly exported
- Verify animation names and indices

### **Performance Issues**
- Reduce the scale if the model is too detailed
- Consider optimizing the FBX file
- Check if animations are too complex

## 🎯 Next Steps

Once Elvis is working:
1. **Fine-tune the positioning** for your specific form layout
2. **Adjust animation timing** to match your preferences
3. **Customize the speech bubbles** and interactions
4. **Add more animations** if desired (dancing, waving, etc.)

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your FBX file is valid and contains animations
3. Test with a simpler FBX file first
4. Check the Three.js documentation for advanced features

---

**Happy coding! 🎸✨**
