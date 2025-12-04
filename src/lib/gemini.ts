const GEMINI_API_KEY = 'AIzaSyC_YJZNiMUGOXOaPkPXMWU-EAbVV_n9a04';
// Try gemini-2.0-flash-exp first, fallback to gemini-1.5-flash if needed
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface ImageGenerationOptions {
  prompt: string;
  challengeTitle?: string;
  targetExplanation?: string;
}

/**
 * Generate a visual representation based on challenge description
 * Since Gemini API doesn't generate images, we create visual representations using canvas
 */
export function generateChallengeImage(
  options: ImageGenerationOptions
): string {
  const { prompt, challengeTitle, targetExplanation } = options;

  // Skip Gemini API call and directly generate visual representation
  // Gemini API is a text model and doesn't generate images
  return generateVisualRepresentation(challengeTitle || 'CSS Challenge', targetExplanation || prompt);
}

/**
 * Generate a visual representation using canvas
 */
function generateVisualRepresentation(title: string, description?: string): string {
  // Create a canvas and draw a visual representation
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Dark background matching the app theme
  const bgGradient = ctx.createLinearGradient(0, 0, 400, 400);
  bgGradient.addColorStop(0, '#1a1a2e');
  bgGradient.addColorStop(1, '#16213e');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 400, 400);
  
  // Add animated gradient border
  const borderGradient = ctx.createLinearGradient(0, 0, 400, 400);
  borderGradient.addColorStop(0, '#8b5cf6');
  borderGradient.addColorStop(0.5, '#06b6d4');
  borderGradient.addColorStop(1, '#22c55e');
  ctx.strokeStyle = borderGradient;
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 394, 394);
  
  // Draw visual elements based on description
  if (description) {
    const descLower = description.toLowerCase();
    
    // Draw shapes based on challenge type
    if (descLower.includes('square') || descLower.includes('box')) {
      // Draw a square
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(150, 120, 100, 100);
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.strokeRect(150, 120, 100, 100);
    } else if (descLower.includes('circle') || descLower.includes('round')) {
      // Draw a circle
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(200, 170, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (descLower.includes('gradient')) {
      // Draw gradient box
      const gradient = ctx.createLinearGradient(100, 100, 300, 300);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = gradient;
      ctx.fillRect(120, 120, 160, 160);
    } else if (descLower.includes('button')) {
      // Draw a button
      const btnGradient = ctx.createLinearGradient(100, 150, 300, 200);
      btnGradient.addColorStop(0, '#8b5cf6');
      btnGradient.addColorStop(1, '#06b6d4');
      ctx.fillStyle = btnGradient;
      ctx.fillRect(100, 150, 200, 50);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Click Me', 200, 180);
    } else if (descLower.includes('card')) {
      // Draw a card
      ctx.fillStyle = '#262640';
      ctx.fillRect(100, 130, 200, 120);
      ctx.strokeStyle = '#3b3b5c';
      ctx.lineWidth = 2;
      ctx.strokeRect(100, 130, 200, 120);
      // Avatar circle
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(200, 160, 20, 0, Math.PI * 2);
      ctx.fill();
    } else if (descLower.includes('progress')) {
      // Draw progress bar
      ctx.fillStyle = '#262640';
      ctx.fillRect(80, 170, 240, 20);
      const progressGradient = ctx.createLinearGradient(80, 170, 248, 190);
      progressGradient.addColorStop(0, '#06b6d4');
      progressGradient.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = progressGradient;
      ctx.fillRect(80, 170, 168, 20); // 70% of 240
    } else {
      // Default: draw a centered element
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(150, 150, 100, 100);
    }
  }
  
  // Add title text at the top
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, 200, 50);
  
  // Add description text at the bottom if provided
  if (description) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Arial';
    const words = description.split(' ');
    let line = '';
    let y = 320;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 360 && i > 0) {
        ctx.fillText(line, 200, y);
        line = words[i] + ' ';
        y += 18;
        if (y > 380) break;
      } else {
        line = testLine;
      }
    }
    if (line) {
      ctx.fillText(line, 200, y);
    }
  }
  
  return canvas.toDataURL('image/png');
}

/**
 * Cache for generated images to avoid regenerating
 */
const imageCache = new Map<string, string>();

/**
 * Get or generate cached image for a challenge
 */
export function getChallengeImage(
  challengeId: string,
  options: ImageGenerationOptions
): string {
  // Check cache first
  if (imageCache.has(challengeId)) {
    return imageCache.get(challengeId)!;
  }

  // Generate new image (synchronous, no API call needed)
  const imageUrl = generateChallengeImage(options);
  
  // Cache it
  imageCache.set(challengeId, imageUrl);
  
  return imageUrl;
}

