export interface Challenge {
  id: string;
  title: string;
  level: number;
  levelName: string;
  description: string;
  targetExplanation: string;
  starterCode: string;
  solutionCode: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const challenges: Challenge[] = [
  // Level 1: Shapes & Colors
  {
    id: 'l1-c1',
    title: 'Blue Square',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a blue square in the center of the screen. The square should be 100x100 pixels.',
    targetExplanation: 'A simple 100x100 pixel blue square centered on the page.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .square {
    /* Add your styles here */
  }
</style>

<div class="square"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .square {
    width: 100px;
    height: 100px;
    background: #3b82f6;
  }
</style>

<div class="square"></div>`,
    xpReward: 10,
    difficulty: 'Easy'
  },
  {
    id: 'l1-c2',
    title: 'Red Circle',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a red circle in the center. The circle should be 120 pixels in diameter.',
    targetExplanation: 'A 120px diameter red circle centered using flexbox.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .circle {
    /* Add your styles here */
  }
</style>

<div class="circle"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .circle {
    width: 120px;
    height: 120px;
    background: #ef4444;
    border-radius: 50%;
  }
</style>

<div class="circle"></div>`,
    xpReward: 10,
    difficulty: 'Easy'
  },
  {
    id: 'l1-c3',
    title: 'Gradient Box',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a square with a gradient from purple to cyan. Size: 150x150 pixels.',
    targetExplanation: 'A 150px square with a linear gradient from purple (#8b5cf6) to cyan (#06b6d4).',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .gradient-box {
    /* Add your styles here */
  }
</style>

<div class="gradient-box"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .gradient-box {
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    border-radius: 8px;
  }
</style>

<div class="gradient-box"></div>`,
    xpReward: 15,
    difficulty: 'Easy'
  },
  {
    id: 'l1-c4',
    title: 'Green Triangle',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a green triangle pointing upward. Use CSS borders to create the triangle shape.',
    targetExplanation: 'A green triangle created using CSS border technique, 100px wide at the base.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .triangle {
    /* Add your styles here */
  }
</style>

<div class="triangle"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid #22c55e;
  }
</style>

<div class="triangle"></div>`,
    xpReward: 15,
    difficulty: 'Easy'
  },
  {
    id: 'l1-c5',
    title: 'Yellow Diamond',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a yellow diamond shape rotated 45 degrees. Size: 100x100 pixels.',
    targetExplanation: 'A yellow square rotated 45 degrees to create a diamond shape.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .diamond {
    /* Add your styles here */
  }
</style>

<div class="diamond"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .diamond {
    width: 100px;
    height: 100px;
    background: #eab308;
    transform: rotate(45deg);
  }
</style>

<div class="diamond"></div>`,
    xpReward: 15,
    difficulty: 'Easy'
  },
  {
    id: 'l1-c6',
    title: 'Rainbow Circle',
    level: 1,
    levelName: 'Shapes & Colors',
    description: 'Create a circle with a rainbow gradient border. The circle should be 120px in diameter with a 10px border.',
    targetExplanation: 'A circle with a conic gradient border creating a rainbow effect.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .rainbow-circle {
    /* Add your styles here */
  }
</style>

<div class="rainbow-circle"></div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .rainbow-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 10px solid;
    border-image: conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444) 1;
    background: transparent;
  }
</style>

<div class="rainbow-circle"></div>`,
    xpReward: 20,
    difficulty: 'Medium'
  },

  // Level 2: Layout & Positioning
  {
    id: 'l2-c1',
    title: 'Three Boxes Row',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Create three colored boxes in a horizontal row with equal spacing. Colors: red, green, blue. Each box is 80x80 pixels.',
    targetExplanation: 'Three 80px squares arranged horizontally using flexbox with gap spacing.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    /* Add your styles here */
  }
  
  .box {
    width: 80px;
    height: 80px;
  }
  
  .red { /* Add color */ }
  .green { /* Add color */ }
  .blue { /* Add color */ }
</style>

<div class="container">
  <div class="box red"></div>
  <div class="box green"></div>
  <div class="box blue"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    display: flex;
    gap: 20px;
  }
  
  .box {
    width: 80px;
    height: 80px;
    border-radius: 8px;
  }
  
  .red { background: #ef4444; }
  .green { background: #22c55e; }
  .blue { background: #3b82f6; }
</style>

<div class="container">
  <div class="box red"></div>
  <div class="box green"></div>
  <div class="box blue"></div>
</div>`,
    xpReward: 20,
    difficulty: 'Medium'
  },
  {
    id: 'l2-c2',
    title: 'Stacked Cards',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Create two cards stacked vertically, centered on the page. Each card: 200px wide, 60px tall, with rounded corners.',
    targetExplanation: 'Two cards stacked vertically using flexbox column direction.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .stack {
    /* Add your styles here */
  }
  
  .card {
    /* Add your styles here */
  }
  
  .card-1 { background: #f97316; }
  .card-2 { background: #8b5cf6; }
</style>

<div class="stack">
  <div class="card card-1"></div>
  <div class="card card-2"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .card {
    width: 200px;
    height: 60px;
    border-radius: 12px;
  }
  
  .card-1 { background: #f97316; }
  .card-2 { background: #8b5cf6; }
</style>

<div class="stack">
  <div class="card card-1"></div>
  <div class="card card-2"></div>
</div>`,
    xpReward: 20,
    difficulty: 'Medium'
  },
  {
    id: 'l2-c3',
    title: 'Corner Circles',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Place four small circles (40px) in each corner of a 200x200 container. Use absolute positioning.',
    targetExplanation: 'Four circles positioned absolutely in the corners of a relative container.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    width: 200px;
    height: 200px;
    position: relative;
    border: 2px dashed #4b5563;
    border-radius: 12px;
  }
  
  .circle {
    /* Add your styles here */
  }
  
  .top-left { /* Position it */ }
  .top-right { /* Position it */ }
  .bottom-left { /* Position it */ }
  .bottom-right { /* Position it */ }
</style>

<div class="container">
  <div class="circle top-left"></div>
  <div class="circle top-right"></div>
  <div class="circle bottom-left"></div>
  <div class="circle bottom-right"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    width: 200px;
    height: 200px;
    position: relative;
    border: 2px dashed #4b5563;
    border-radius: 12px;
  }
  
  .circle {
    width: 40px;
    height: 40px;
    background: #06b6d4;
    border-radius: 50%;
    position: absolute;
  }
  
  .top-left { top: -20px; left: -20px; }
  .top-right { top: -20px; right: -20px; }
  .bottom-left { bottom: -20px; left: -20px; }
  .bottom-right { bottom: -20px; right: -20px; }
</style>

<div class="container">
  <div class="circle top-left"></div>
  <div class="circle top-right"></div>
  <div class="circle bottom-left"></div>
  <div class="circle bottom-right"></div>
</div>`,
    xpReward: 25,
    difficulty: 'Medium'
  },
  {
    id: 'l2-c4',
    title: 'Centered Grid',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Create a 2x2 grid of colored squares, each 60x60 pixels. Colors: orange, purple, cyan, green. Center the grid on the page.',
    targetExplanation: 'A 2x2 grid layout using CSS Grid, centered on the page with gap spacing.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .grid {
    /* Add your styles here */
  }
  
  .box {
    width: 60px;
    height: 60px;
  }
  
  .orange { background: #f97316; }
  .purple { background: #8b5cf6; }
  .cyan { background: #06b6d4; }
  .green { background: #22c55e; }
</style>

<div class="grid">
  <div class="box orange"></div>
  <div class="box purple"></div>
  <div class="box cyan"></div>
  <div class="box green"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .box {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
  
  .orange { background: #f97316; }
  .purple { background: #8b5cf6; }
  .cyan { background: #06b6d4; }
  .green { background: #22c55e; }
</style>

<div class="grid">
  <div class="box orange"></div>
  <div class="box purple"></div>
  <div class="box cyan"></div>
  <div class="box green"></div>
</div>`,
    xpReward: 25,
    difficulty: 'Medium'
  },
  {
    id: 'l2-c5',
    title: 'Overlapping Circles',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Create three overlapping circles using z-index. Colors: red (back), blue (middle), green (front). Each circle is 100px in diameter.',
    targetExplanation: 'Three circles positioned to overlap using negative margins and z-index for layering.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    position: relative;
  }
  
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
  }
  
  .red { background: #ef4444; }
  .blue { background: #3b82f6; }
  .green { background: #22c55e; }
</style>

<div class="container">
  <div class="circle red"></div>
  <div class="circle blue"></div>
  <div class="circle green"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    position: relative;
    width: 200px;
    height: 100px;
  }
  
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
  }
  
  .red { 
    background: #ef4444; 
    left: 0;
    z-index: 1;
  }
  .blue { 
    background: #3b82f6; 
    left: 50px;
    z-index: 2;
  }
  .green { 
    background: #22c55e; 
    left: 100px;
    z-index: 3;
  }
</style>

<div class="container">
  <div class="circle red"></div>
  <div class="circle blue"></div>
  <div class="circle green"></div>
</div>`,
    xpReward: 30,
    difficulty: 'Hard'
  },
  {
    id: 'l2-c6',
    title: 'Diagonal Lineup',
    level: 2,
    levelName: 'Layout & Positioning',
    description: 'Create four small squares (50px each) arranged diagonally from top-left to bottom-right. Use absolute positioning within a 200x200 container.',
    targetExplanation: 'Four squares positioned absolutely along a diagonal line using calculated positions.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    width: 200px;
    height: 200px;
    position: relative;
    border: 2px dashed #4b5563;
    border-radius: 12px;
  }
  
  .square {
    width: 50px;
    height: 50px;
    position: absolute;
    background: #8b5cf6;
  }
</style>

<div class="container">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .container {
    width: 200px;
    height: 200px;
    position: relative;
    border: 2px dashed #4b5563;
    border-radius: 12px;
  }
  
  .square {
    width: 50px;
    height: 50px;
    position: absolute;
    background: #8b5cf6;
    border-radius: 4px;
  }
  
  .square:nth-child(1) { top: 0; left: 0; }
  .square:nth-child(2) { top: 50px; left: 50px; }
  .square:nth-child(3) { top: 100px; left: 100px; }
  .square:nth-child(4) { top: 150px; left: 150px; }
</style>

<div class="container">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>`,
    xpReward: 25,
    difficulty: 'Medium'
  },

  // Level 3: Mini UI Components
  {
    id: 'l3-c1',
    title: 'Simple Button',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a styled button with padding, rounded corners, and a gradient background. Text: "Click Me"',
    targetExplanation: 'A button with padding, gradient background, white text, and subtle shadow.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .btn {
    /* Add your styles here */
  }
</style>

<button class="btn">Click Me</button>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .btn {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  }
</style>

<button class="btn">Click Me</button>`,
    xpReward: 25,
    difficulty: 'Medium'
  },
  {
    id: 'l3-c2',
    title: 'Profile Card',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a simple profile card with a colored circle (avatar), a name, and a role text below it.',
    targetExplanation: 'A card with a circular avatar placeholder, name heading, and role subtitle.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .card {
    /* Add card styles */
  }
  
  .avatar {
    /* Add avatar styles */
  }
  
  .name {
    /* Add name styles */
  }
  
  .role {
    /* Add role styles */
  }
</style>

<div class="card">
  <div class="avatar"></div>
  <h3 class="name">Alex Coder</h3>
  <p class="role">Junior Developer</p>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .card {
    background: #262640;
    padding: 32px;
    border-radius: 16px;
    text-align: center;
    border: 1px solid #3b3b5c;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #f97316, #ec4899);
    border-radius: 50%;
    margin: 0 auto 16px;
  }
  
  .name {
    color: white;
    font-size: 20px;
    margin: 0 0 4px;
  }
  
  .role {
    color: #9ca3af;
    font-size: 14px;
    margin: 0;
  }
</style>

<div class="card">
  <div class="avatar"></div>
  <h3 class="name">Alex Coder</h3>
  <p class="role">Junior Developer</p>
</div>`,
    xpReward: 30,
    difficulty: 'Hard'
  },
  {
    id: 'l3-c3',
    title: 'Progress Bar',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a progress bar that shows 70% completion with a gradient fill and rounded ends.',
    targetExplanation: 'A progress bar container with a 70% wide inner bar using gradient colors.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .progress-container {
    /* Add container styles */
  }
  
  .progress-bar {
    /* Add bar styles */
  }
</style>

<div class="progress-container">
  <div class="progress-bar"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .progress-container {
    width: 300px;
    height: 16px;
    background: #262640;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .progress-bar {
    width: 70%;
    height: 100%;
    background: linear-gradient(90deg, #06b6d4, #8b5cf6);
    border-radius: 8px;
  }
</style>

<div class="progress-container">
  <div class="progress-bar"></div>
</div>`,
    xpReward: 25,
    difficulty: 'Medium'
  },
  {
    id: 'l3-c4',
    title: 'Badge Component',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a notification badge: a small pill-shaped element with "NEW" text inside.',
    targetExplanation: 'A small pill badge with gradient background and uppercase text.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .badge {
    /* Add your styles here */
  }
</style>

<span class="badge">NEW</span>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .badge {
    display: inline-block;
    padding: 6px 16px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
    background: linear-gradient(135deg, #22c55e, #06b6d4);
    border-radius: 20px;
  }
</style>

<span class="badge">NEW</span>`,
    xpReward: 20,
    difficulty: 'Easy'
  },
  {
    id: 'l3-c5',
    title: 'Toggle Switch',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a toggle switch component: a rounded rectangle with a sliding circle indicator. Default state: off (left side).',
    targetExplanation: 'A toggle switch with a background track and a circular slider that moves from left to right.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .toggle {
    /* Add container styles */
  }
  
  .slider {
    /* Add slider styles */
  }
</style>

<div class="toggle">
  <div class="slider"></div>
</div>`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .toggle {
    width: 60px;
    height: 30px;
    background: #262640;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    border: 2px solid #3b3b5c;
  }
  
  .slider {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: transform 0.3s;
  }
</style>

<div class="toggle">
  <div class="slider"></div>
</div>`,
    xpReward: 25,
    difficulty: 'Medium'
  },
  {
    id: 'l3-c6',
    title: 'Input Field',
    level: 3,
    levelName: 'Mini UI Components',
    description: 'Create a styled input field with rounded corners, padding, and a subtle border. Placeholder text: "Enter your name"',
    targetExplanation: 'An input field with modern styling: rounded corners, padding, border, and placeholder text.',
    starterCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .input {
    /* Add your styles here */
  }
</style>

<input type="text" class="input" placeholder="Enter your name" />`,
    solutionCode: `<style>
  body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1a1a2e;
  }
  
  .input {
    width: 300px;
    padding: 12px 16px;
    font-size: 16px;
    color: white;
    background: #262640;
    border: 2px solid #3b3b5c;
    border-radius: 12px;
    outline: none;
  }
  
  .input::placeholder {
    color: #9ca3af;
  }
  
  .input:focus {
    border-color: #8b5cf6;
  }
</style>

<input type="text" class="input" placeholder="Enter your name" />`,
    xpReward: 20,
    difficulty: 'Easy'
  }
];

export const getLevelChallenges = (level: number): Challenge[] => {
  return challenges.filter(c => c.level === level);
};

// Track shown challenges per level to ensure we cycle through all
const shownChallengesByLevel = new Map<number, string[]>();
const lastChallengeByLevel = new Map<number, string>();

export const getRandomChallenge = (level: number, excludeId?: string): Challenge | undefined => {
  const levelChallenges = getLevelChallenges(level);
  if (levelChallenges.length === 0) return undefined;
  
  // Get list of shown challenges for this level
  const shown = shownChallengesByLevel.get(level) || [];
  const lastChallenge = lastChallengeByLevel.get(level);
  
  // Filter out the last shown challenge and excluded challenge
  let availableChallenges = levelChallenges.filter(c => {
    if (excludeId && c.id === excludeId) return false;
    if (lastChallenge && c.id === lastChallenge) return false;
    return true;
  });
  
  // If we've shown all challenges, reset and allow all (except last shown)
  if (shown.length >= levelChallenges.length) {
    shownChallengesByLevel.set(level, []);
    // Still exclude the last one to avoid immediate repeat
    availableChallenges = levelChallenges.filter(c => c.id !== lastChallenge);
  }
  
  // If no available challenges (edge case), use all challenges
  if (availableChallenges.length === 0) {
    availableChallenges = levelChallenges;
  }
  
  // Pick a random challenge from available ones
  const randomIndex = Math.floor(Math.random() * availableChallenges.length);
  const selectedChallenge = availableChallenges[randomIndex];
  
  // Track that we've shown this challenge
  if (selectedChallenge) {
    const updatedShown = [...shown, selectedChallenge.id];
    shownChallengesByLevel.set(level, updatedShown);
    lastChallengeByLevel.set(level, selectedChallenge.id);
  }
  
  return selectedChallenge;
};

// Reset tracking for a level (useful when switching levels)
export const resetChallengeTracking = (level: number) => {
  shownChallengesByLevel.delete(level);
  lastChallengeByLevel.delete(level);
};

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(c => c.id === id);
};

export const levels = [
  {
    level: 1,
    name: 'Shapes & Colors',
    description: 'Master the basics: squares, circles, and colors',
    icon: '🎨',
    color: 'from-neon-cyan to-neon-purple',
    challengeCount: getLevelChallenges(1).length
  },
  {
    level: 2,
    name: 'Layout & Positioning',
    description: 'Learn flexbox and position elements like a pro',
    icon: '📐',
    color: 'from-neon-orange to-neon-pink',
    challengeCount: getLevelChallenges(2).length
  },
  {
    level: 3,
    name: 'Mini UI Components',
    description: 'Build real-world UI components from scratch',
    icon: '🧩',
    color: 'from-neon-green to-neon-cyan',
    challengeCount: getLevelChallenges(3).length
  }
];
