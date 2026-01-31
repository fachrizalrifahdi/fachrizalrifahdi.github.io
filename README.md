# Fachrizal Rifahdi - Developer Portfolio

## Adding Alan Walker "On My Way" Music

### Required Files:
1. **Download Alan Walker - On My Way MP3**
   - Visit: https://ytmp3.cc
   - Paste: https://youtube.com/watch?v=fm-nXA-K0Dg
   - Select: 320kbps quality
   - Download as: `audio.mp3`

2. **Add to Repository**
   ```bash
   mv audio.mp3 audio/
   git add audio/audio.mp3
   ```

3. **Features Implemented:**
   - ✅ **3-Attempt Delayed Autoplay** (2s, 4s, 6s delays)
   - ✅ **Ad-Free Playback** - Local audio file
   - ✅ **Alan Walker Original** - Authentic quality
   - ✅ **Simple Implementation** - Clean UX
   - ✅ **Space Theme** - Maintains portfolio aesthetic

### How It Works:
1. **Page loads** → Music attempts autoplay at 2s, 4s, 6s
2. **If successful** → Music plays with visual feedback
3. **If all attempts fail** → Manual control via music button
4. **Keyboard shortcut** → Press 'M' to toggle music

### Technical Implementation:
- **HTML5 Audio Element**: `<audio id="music-player" loop>`
- **JavaScript Delay Strategy**: Multiple timing attempts
- **CSS Styling**: Space theme with Alan Walker orange (#ff6b00)
- **Attribution**: Footer credit to original artist

### Browser Compatibility:
- ✅ Chrome/Safari/Firefox (modern browsers)
- ✅ Mobile responsive (music button accessible)
- ✅ Cross-platform audio support

### Note:
The delayed autoplay approach respects browser policies while maximizing success rate for automatic music playback.

---

**Portfolio Live at:** https://fachrizalrifahdi.github.io