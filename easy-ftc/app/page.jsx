import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default async function Home() {
  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center min-h-[80vh] px-6 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            ✨ New: Interactive Java Editor
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Learn Java.
            <br />
            Code-A-Robot.
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master robotics programming with hands-on Java lessons designed specifically for 
            <span className="text-foreground font-medium"> FTC teams</span>. 
            Build, code, and compete with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/sign-up"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-medium text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Get Started Free
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <Link
              href="/sign-in"
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 font-medium text-lg transition-all duration-200 hover:scale-105 border border-border/50"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Everything you need to succeed in FTC
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Created for new FTC teams to learn the basics of Java programming for robotics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Coding</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Write and test Java code directly in your browser with our interactive playground and instant feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Robot Fundamentals</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn essential robotics concepts including sensors, motors, autonomous programming, and control systems.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Competition Ready</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn the skills needed to program competition-ready robots.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Structured Learning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Follow carefully crafted curriculum that builds from basic Java concepts to programming robots.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Team Advancement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kickstart your new FTC team with comprehensive resources and tools designed to enhance learning.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor your learning journey with detailed progress tracking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Roadmap Section */}
      <div className="px-6 py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🗺️ Learning Path
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Your Journey from Java to Robotics
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our carefully structured curriculum that takes you from programming fundamentals to building competition-ready robots.
            </p>
          </div>

          <div className="relative">
            {/* Course Sections with Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/50 transform md:-translate-x-px"></div>

              {/* Course Sections */}
              <div className="space-y-12">
                {/* Phase 1: Java Fundamentals */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-blue-500 mb-2">Java Fundamentals</h3>
                        <p className="text-muted-foreground mb-4">
                          Master the building blocks of programming with hands-on Java lessons.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Basic Java Syntax</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Object-Oriented Programming</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Methods & Functions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Logic & Iteration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Arrays & ArrayLists</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2: FTC Setup */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-cyan-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div className="ml-12 md:ml-auto md:w-1/2 md:pl-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-cyan-500 mb-2">Getting Ready for FTC</h3>
                        <p className="text-muted-foreground mb-4">
                          Transition from Java to robotics programming with FTC-specific tools and concepts.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span>Programming Options</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span>Environment Setup</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span>REV Control System</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span>Hardware Overview</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3: Robot Programming */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-indigo-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-indigo-500 mb-2">Robot Control Basics</h3>
                        <p className="text-muted-foreground mb-4">
                          Learn to control robot hardware and create your first working programs.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>OpModes & Gamepads</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>Hardware Mapping</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>Motor Control</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <span>Servo Control</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4: Advanced Control */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-amber-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div className="ml-12 md:ml-auto md:w-1/2 md:pl-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-amber-500 mb-2">Sensors & Feedback</h3>
                        <p className="text-muted-foreground mb-4">
                          Implement precise robot control using sensors and feedback systems.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span>Encoder Navigation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span>IMU Sensors</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span>Distance Sensors</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 5: Autonomous Programming */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">5</span>
                    </div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-emerald-500 mb-2">Autonomous Programming</h3>
                        <p className="text-muted-foreground mb-4">
                          Create sophisticated autonomous programs for competition success.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Path Planning</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Road Runner</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Competition Strategies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 6: Competition Ready */}
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-rose-500 rounded-full border-4 border-background transform md:-translate-x-4 flex items-center justify-center z-10">
                      <span className="text-white text-sm font-bold">6</span>
                    </div>
                    <div className="ml-12 md:ml-auto md:w-1/2 md:pl-8">
                      <div className="bg-card p-6 rounded-xl border shadow-sm">
                        <h3 className="text-xl font-bold text-rose-500 mb-2">TeleOp & Beyond</h3>
                        <p className="text-muted-foreground mb-4">
                          Master driver-controlled programming and prepare for advanced concepts.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span>TeleOp Programs</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span>Drive Systems</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span>Best Practices</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span>Next Steps</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skip Option Callout - Separate from timeline */}
            <div className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6 text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-2">Already Know Java?</h3>
              <p className="text-orange-600 dark:text-orange-400 mb-4">
                Skip straight to robotics programming! Start with "Getting Ready for FTC" and jump into hardware control.
              </p>
              <div className="text-sm text-orange-500 dark:text-orange-500">
                💡 This option is available on your dashboard after signing up
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Editor Showcase */}
      <div className="px-6 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🚀 Featured Tool
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Code Like a Pro with Our Interactive Editor
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience hands-on learning with our browser-based Java editor. Write, compile, and test your code 
              instantly with real-time feedback and syntax highlighting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Features */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instant Code Execution</h3>
                  <p className="text-muted-foreground">
                    Run your Java code immediately in the browser with our integrated compiler. No setup required.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Smart Error Detection</h3>
                  <p className="text-muted-foreground">
                    Get real-time syntax highlighting and error detection to catch mistakes as you type.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Practice What You Learn</h3>
                  <p className="text-muted-foreground">
                    Apply your knowledge with interactive coding challenges and projects at the end of each lesson.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-all duration-200 hover:scale-105"
                >
                  Try the Editor Now
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Right side - Screenshot */}
            <div className="relative order-1 lg:order-2">
              <div className="relative bg-[#1E1E1E] rounded-lg shadow-2xl overflow-hidden border border-gray-700 w-full max-w-[600px] mx-auto">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#1e1f1c] border-b border-gray-700">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="text-xs sm:text-sm text-gray-400">JAVA</div>
                    <div className="text-xs sm:text-sm text-yellow-400">• Modified</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 sm:px-3 rounded text-xs sm:text-sm">
                      Run Code
                    </button>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  {/* Left side - Editor */}
                  <div className="flex flex-col lg:w-2/3">
                    {/* File Tab */}
                    <div className="flex bg-[#1e1f1c] border-b border-gray-700">
                      <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-[#272822] text-white border-r border-gray-700 flex items-center space-x-2">
                        <span>AutonomousOpMode.java</span>
                        <span className="text-yellow-400">•</span>
                      </div>
                    </div>

                    {/* Code editor mockup with line numbers */}
                    <div className="bg-[#272822] flex">
                      {/* Line numbers */}
                      <div className="bg-[#2F3129] px-2 sm:px-3 py-4 text-xs text-gray-500 font-mono border-r border-gray-600">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>
                        <div>11</div>
                        <div>12</div>
                        <div>13</div>
                        <div>14</div>
                        <div>15</div>
                        <div>16</div>
                        <div>17</div>
                        <div>18</div>
                        <div>19</div>
                        <div>20</div>
                        <div>21</div>
                        <div>22</div>
                        <div>23</div>
                        <div>24</div>
                        <div>25</div>
                        <div>26</div>
                      </div>
                      
                      {/* Code content */}
                      <div className="p-2 sm:p-4 font-mono text-xs sm:text-sm flex-1">
                        <div className="space-y-1">
                          <div className="text-[#75715E]">// Robot autonomous movement example</div>
                          <div className="text-[#66D9EF]">public class <span className="text-[#A6E22E]">AutonomousOpMode</span> extends <span className="text-[#A6E22E]">LinearOpMode</span> {'{'}</div>
                          <div className="ml-2 sm:ml-4">
                            <div className="text-[#A6E22E]">@Override</div>
                            <div className="text-[#66D9EF]">public void <span className="text-[#A6E22E]">runOpMode</span>() {'{'}</div>
                            <div className="ml-2 sm:ml-4 space-y-1">
                              <div className="text-[#75715E]">// Initialize hardware</div>
                              <div className="text-[#F8F8F2] break-all">DcMotor leftMotor = hardwareMap.get(DcMotor.class, <span className="text-[#E6DB74]">"left_motor"</span>);</div>
                              <div className="text-[#F8F8F2] break-all">DcMotor rightMotor = hardwareMap.get(DcMotor.class, <span className="text-[#E6DB74]">"right_motor"</span>);</div>
                              <div className="text-[#F8F8F2]">waitForStart();</div>
                              <div className="text-[#75715E]">// Move forward for 2 seconds</div>
                              <div className="text-[#F8F8F2]">leftMotor.setPower(<span className="text-[#AE81FF]">0.5</span>);</div>
                              <div className="text-[#F8F8F2]">rightMotor.setPower(<span className="text-[#AE81FF]">0.5</span>);</div>
                              <div className="text-[#F8F8F2]">sleep(<span className="text-[#AE81FF]">2000</span>);</div>
                            </div>
                            <div className="text-[#66D9EF]">{'}'}</div>
                          </div>
                          <div className="text-[#66D9EF]">{'}'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-4 py-1 bg-[#1e1f1c] border-t border-gray-700 text-xs text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div>UTF-8</div>
                        <div>JAVA</div>
                      </div>
                    </div>
                  </div>

                  {/* Resize Handle */}
                  <div className="w-full h-1 lg:w-1 lg:h-auto bg-gray-700"></div>

                  {/* Right side - Terminal */}
                  <div className="flex-1 lg:border-l border-gray-700 flex flex-col">
                    <div className="bg-[#1e1f1c] px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button className="px-3 py-1 rounded bg-[#37373D] text-white text-sm">
                          Terminal
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                          <span className="text-xs text-gray-400">Running...</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#272822] p-3 font-mono text-xs flex-1 min-h-[150px] lg:min-h-[200px]">
                      <div className="space-y-1">
                        <div className="text-green-400">
                          <span className="text-gray-500">$ </span>
                          AutonomousOpMode.java
                        </div>
                        <div className="text-gray-300">✓ Compilation successful</div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Robot Showcase Section */}
      <div className="px-6 py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              🤖 Build & Program
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              From Code to Competition
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how your Java skills translate into real robot control. Our curriculum covers everything needed to get started programming robots.
            </p>
          </div>

          <div className="relative">
            {/* Robot SVG Illustration */}
            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-sm mx-auto">
                <svg width="100%" height="300" viewBox="0 0 300 300" className="drop-shadow-2xl w-full h-auto max-w-[300px] mx-auto">
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
                
                {/* Floating Code Elements */}
                <div className="hidden sm:block absolute -top-8 -left-16 bg-[#272822] text-[#A6E22E] px-3 py-2 rounded-lg text-sm font-mono border border-gray-600 shadow-lg">
                  robot.move()
                </div>
                <div className="hidden sm:block absolute top-16 -right-20 bg-[#272822] text-[#66D9EF] px-3 py-2 rounded-lg text-sm font-mono border border-gray-600 shadow-lg">
                  setPower(0.8)
                </div>
                <div className="hidden sm:block absolute bottom-8 -left-20 bg-[#272822] text-[#E6DB74] px-3 py-2 rounded-lg text-sm font-mono border border-gray-600 shadow-lg">
                  "autonomous"
                </div>
                <div className="hidden sm:block absolute bottom-16 -right-16 bg-[#272822] text-[#AE81FF] px-3 py-2 rounded-lg text-sm font-mono border border-gray-600 shadow-lg">
                  sleep(1000)
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Autonomous Movement</h3>
                <p className="text-muted-foreground">
                  Program your robot to navigate and complete tasks independently using sensors and timers.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sensor Integration</h3>
                <p className="text-muted-foreground">
                  Learn to use encoders, IMUs, and other sensors for precise robot control.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Build a Strong Foundation</h3>
                <p className="text-muted-foreground">
                  Develop a strong foundation of Java programming skills for robotics. Our curriculum prepares you to learn more advanced concepts on your own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to elevate your FTC team?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join students already learning with Code-A-Robot. Start your robotics programming journey today.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-medium text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Start Learning Now
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
