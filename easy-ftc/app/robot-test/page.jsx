export default function RobotTest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-2xl">
          {/* Robot Body */}
          <rect x="75" y="120" width="150" height="120" rx="15" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2"/>
          
          {/* Code Brackets on Body */}
          <text x="150" y="185" fontSize="32" fill="hsl(var(--primary))" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>
          
          {/* Robot Head */}
          <rect x="100" y="80" width="100" height="60" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
          
          {/* Eyes */}
          <circle cx="125" cy="105" r="8" fill="hsl(var(--primary))"/>
          <circle cx="175" cy="105" r="8" fill="hsl(var(--primary))"/>
          <circle cx="125" cy="105" r="4" fill="white"/>
          <circle cx="175" cy="105" r="4" fill="white"/>
          
          {/* Mouth/Speaker */}
          <rect x="140" y="120" width="20" height="8" rx="4" fill="hsl(var(--muted-foreground))"/>
          
          {/* Arms */}
          <rect x="45" y="140" width="30" height="15" rx="7" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2"/>
          <rect x="225" y="140" width="30" height="15" rx="7" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2"/>
          
          {/* Wheels */}
          <circle cx="100" cy="260" r="20" fill="hsl(var(--muted-foreground))" stroke="hsl(var(--border))" strokeWidth="2"/>
          <circle cx="200" cy="260" r="20" fill="hsl(var(--muted-foreground))" stroke="hsl(var(--border))" strokeWidth="2"/>
          <circle cx="100" cy="260" r="12" fill="hsl(var(--background))"/>
          <circle cx="200" cy="260" r="12" fill="hsl(var(--background))"/>
          
          
          {/* LED Strips */}
          <rect x="80" y="200" width="140" height="4" rx="2" fill="hsl(var(--primary))" fillOpacity="0.6"/>
          
          {/* Antenna */}
          <line x1="150" y1="80" x2="150" y2="60" stroke="hsl(var(--muted-foreground))" strokeWidth="2"/>
          <circle cx="150" cy="60" r="3" fill="hsl(var(--primary))"/>
        </svg>
        
        
      </div>
      
      {/* Info text */}
      <div className="absolute bottom-8 left-8 text-muted-foreground">
        <p>Robot SVG Test Page</p>
        <p className="text-sm">Navigate to: /robot-test</p>
      </div>
    </div>
  );
}
