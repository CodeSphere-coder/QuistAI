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
  options: ImageGenerationOptions,
  challengeId?: string
): string {
  const { prompt, challengeTitle, targetExplanation } = options;

  // Skip Gemini API call and directly generate visual representation
  // Gemini API is a text model and doesn't generate images
  return generateVisualRepresentation(challengeTitle || 'CSS Challenge', targetExplanation || prompt, challengeId);
}

/**
 * Generate a visual representation using canvas
 * Creates unique visuals for each challenge based on challenge ID
 */
function generateVisualRepresentation(title: string, description?: string, challengeId?: string): string {
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
  
  // Generate unique visual based on challenge ID
  if (challengeId) {
    drawChallengeVisual(ctx, challengeId, title, description);
  } else if (description) {
    drawVisualFromDescription(ctx, description);
  }
  
  return canvas.toDataURL('image/png');
}

/**
 * Draw specific visual for each challenge based on ID
 */
function drawChallengeVisual(ctx: CanvasRenderingContext2D, challengeId: string, title: string, description?: string) {
  const id = challengeId.toLowerCase();
  
  // Level 1: Shapes & Colors
  if (id === 'target-l1-c1' || id.includes('l1-c1')) {
    // Blue Square
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(150, 150, 100, 100);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.strokeRect(150, 150, 100, 100);
  } else if (id === 'target-l1-c2' || id.includes('l1-c2')) {
    // Red Circle
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(200, 200, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else if (id === 'target-l1-c3' || id.includes('l1-c3')) {
    // Gradient Box
    const gradient = ctx.createLinearGradient(125, 125, 275, 275);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(125, 125, 150, 150);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(125, 125, 150, 150);
  } else if (id === 'target-l1-c4' || id.includes('l1-c4')) {
    // Green Triangle
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(150, 220);
    ctx.lineTo(250, 220);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else if (id === 'target-l1-c5' || id.includes('l1-c5')) {
    // Yellow Diamond
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.strokeRect(150, 150, 100, 100);
  } else if (id === 'target-l1-c6' || id.includes('l1-c6')) {
    // Rainbow Circle
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(200, 200, 60, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(200, 200, 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(200, 200, 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Level 2: Layout & Positioning
  else if (id === 'target-l2-c1' || id.includes('l2-c1')) {
    // Three Boxes Row
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(80, 170, 80, 80);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(160, 170, 80, 80);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(240, 170, 80, 80);
  } else if (id === 'target-l2-c2' || id.includes('l2-c2')) {
    // Stacked Cards
    ctx.fillStyle = '#f97316';
    ctx.fillRect(100, 140, 200, 60);
    ctx.strokeStyle = '#fb923c';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 140, 200, 60);
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(100, 220, 200, 60);
    ctx.strokeStyle = '#a78bfa';
    ctx.strokeRect(100, 220, 200, 60);
  } else if (id === 'target-l2-c3' || id.includes('l2-c3')) {
    // Corner Circles
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(100, 100, 200, 200);
    ctx.setLineDash([]);
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(90, 90, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(310, 90, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(90, 310, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(310, 310, 20, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'target-l2-c4' || id.includes('l2-c4')) {
    // Centered Grid
    ctx.fillStyle = '#f97316';
    ctx.fillRect(120, 140, 60, 60);
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(220, 140, 60, 60);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(120, 200, 60, 60);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(220, 200, 60, 60);
  } else if (id === 'target-l2-c5' || id.includes('l2-c5')) {
    // Overlapping Circles
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(150, 200, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(250, 200, 50, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'target-l2-c6' || id.includes('l2-c6')) {
    // Diagonal Lineup
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(100, 100, 200, 200);
    ctx.setLineDash([]);
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(100, 100, 50, 50);
    ctx.fillRect(150, 150, 50, 50);
    ctx.fillRect(200, 200, 50, 50);
    ctx.fillRect(250, 250, 50, 50);
  }
  // Level 3: Mini UI Components
  else if (id === 'target-l3-c1' || id.includes('l3-c1')) {
    // Simple Button
    const btnGradient = ctx.createLinearGradient(100, 170, 300, 230);
    btnGradient.addColorStop(0, '#8b5cf6');
    btnGradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = btnGradient;
    ctx.fillRect(100, 170, 200, 60);
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 170, 200, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Click Me', 200, 205);
  } else if (id === 'target-l3-c2' || id.includes('l3-c2')) {
    // Profile Card
    ctx.fillStyle = '#262640';
    ctx.fillRect(100, 120, 200, 160);
    ctx.strokeStyle = '#3b3b5c';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 120, 200, 160);
    const avatarGradient = ctx.createLinearGradient(170, 140, 230, 200);
    avatarGradient.addColorStop(0, '#f97316');
    avatarGradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = avatarGradient;
    ctx.beginPath();
    ctx.arc(200, 160, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Alex Coder', 200, 230);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Arial';
    ctx.fillText('Junior Developer', 200, 250);
  } else if (id === 'target-l3-c3' || id.includes('l3-c3')) {
    // Progress Bar
    ctx.fillStyle = '#262640';
    ctx.fillRect(50, 190, 300, 20);
    ctx.strokeStyle = '#3b3b5c';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 190, 300, 20);
    const progressGradient = ctx.createLinearGradient(50, 190, 260, 210);
    progressGradient.addColorStop(0, '#06b6d4');
    progressGradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = progressGradient;
    ctx.fillRect(50, 190, 210, 20); // 70% of 300
  } else if (id === 'target-l3-c4' || id.includes('l3-c4')) {
    // Badge Component
    const badgeGradient = ctx.createLinearGradient(150, 180, 250, 220);
    badgeGradient.addColorStop(0, '#22c55e');
    badgeGradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = badgeGradient;
    ctx.fillRect(150, 180, 100, 40);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 180, 100, 40);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('NEW', 200, 205);
  } else if (id === 'target-l3-c5' || id.includes('l3-c5')) {
    // Toggle Switch
    ctx.fillStyle = '#262640';
    ctx.fillRect(170, 185, 60, 30);
    ctx.strokeStyle = '#3b3b5c';
    ctx.lineWidth = 2;
    ctx.strokeRect(170, 185, 60, 30);
    const sliderGradient = ctx.createLinearGradient(175, 188, 195, 212);
    sliderGradient.addColorStop(0, '#8b5cf6');
    sliderGradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = sliderGradient;
    ctx.beginPath();
    ctx.arc(185, 200, 12, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'target-l3-c6' || id.includes('l3-c6')) {
    // Input Field
    ctx.fillStyle = '#262640';
    ctx.fillRect(50, 180, 300, 40);
    ctx.strokeStyle = '#3b3b5c';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 180, 300, 40);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Enter your name', 60, 205);
  } else {
    // Fallback: draw based on description
    drawVisualFromDescription(ctx, description || title);
  }
}

/**
 * Fallback: Draw visual from description if challenge ID not found
 */
function drawVisualFromDescription(ctx: CanvasRenderingContext2D, description: string) {
  const descLower = description.toLowerCase();
  
  if (descLower.includes('square') || descLower.includes('box')) {
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(150, 120, 100, 100);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 120, 100, 100);
  } else if (descLower.includes('circle') || descLower.includes('round')) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(200, 170, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (descLower.includes('gradient')) {
    const gradient = ctx.createLinearGradient(100, 100, 300, 300);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.fillRect(120, 120, 160, 160);
  } else if (descLower.includes('button')) {
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
    ctx.fillStyle = '#262640';
    ctx.fillRect(100, 130, 200, 120);
    ctx.strokeStyle = '#3b3b5c';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 130, 200, 120);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(200, 160, 20, 0, Math.PI * 2);
    ctx.fill();
  } else if (descLower.includes('progress')) {
    ctx.fillStyle = '#262640';
    ctx.fillRect(80, 170, 240, 20);
    const progressGradient = ctx.createLinearGradient(80, 170, 248, 190);
    progressGradient.addColorStop(0, '#06b6d4');
    progressGradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = progressGradient;
    ctx.fillRect(80, 170, 168, 20);
  } else {
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(150, 150, 100, 100);
  }
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
  // Pass challengeId to generate unique visuals
  const imageUrl = generateChallengeImage(options, challengeId);
  
  // Cache it
  imageCache.set(challengeId, imageUrl);
  
  return imageUrl;
}

