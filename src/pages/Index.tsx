import { Leaf, Sun, TreePine, Waves, ArrowRight, Globe, Sparkles, LogOut } from "lucide-react";
import Hyperspeed from "@/components/Hyperspeed/Hyperspeed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const levels = [
    {
      title: "Climate Action",
      description: "Take urgent action to combat climate change and its impacts through sustainable choices.",
      icon: Sun,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Life on Land",
      description: "Protect, restore and promote sustainable use of terrestrial ecosystems.",
      icon: TreePine,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Life Underwater",
      description: "Conserve and sustainably use the oceans, seas and marine resources.",
      icon: Waves,
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="font-display text-2xl font-bold text-gradient">Releaf</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#levels" className="text-muted-foreground hover:text-foreground transition-colors">Levels</a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-muted-foreground">
                  Welcome, <span className="font-semibold text-foreground">{user?.username}</span>
                </div>
                <Button onClick={logout} variant="outline" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="text-white">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button asChild variant="outline" className="text-white">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}

            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <a href="https://www.roblox.com/games/139467356463044/three-R#game-age-recommendation-details-container" target="_blank" rel="noopener noreferrer">Play Now</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Hyperspeed />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-10" />
        
        <div className="relative z-20 container mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Sustainability Gaming Experience</span>
            </div>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up delay-100">
            <span className="text-gradient">Releaf</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up delay-200">
            Embark on an epic journey to save our planet through three immersive levels of sustainable action
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg glow">
              <a href="https://www.roblox.com/games/139467356463044/three-R#game-age-recommendation-details-container" target="_blank" rel="noopener noreferrer">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-border hover:bg-muted px-8 py-6 text-lg">
              <a href="https://ai.studio/apps/drive/10fTEg1ReODmIY2X0BCyE2Aa8nXhKGZ0H" target="_blank" rel="noopener noreferrer">View App</a>
            </Button>

            {/* Learn More removed as per request */}
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Gaming for a <span className="text-primary">Greener</span> Future
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Releaf transforms sustainability education into an engaging gaming experience. 
                Navigate through three unique worlds representing the UN Sustainable Development Goals, 
                making choices that impact virtual ecosystems while learning real-world environmental practices.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">10,000+</span> players making a difference
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl p-8 animate-float">
                <Globe className="w-32 h-32 mx-auto text-primary mb-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-climate">3</p>
                    <p className="text-sm text-muted-foreground">Levels</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-land">50+</p>
                    <p className="text-sm text-muted-foreground">Challenges</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-ocean">∞</p>
                    <p className="text-sm text-muted-foreground">Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section id="levels" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Three Worlds, <span className="text-gradient">One Mission</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each level presents unique challenges aligned with UN Sustainable Development Goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div
                key={level.title}
                className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${level.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <level.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{level.title}</h3>
                <p className="text-muted-foreground mb-6">{level.description}</p>
                <Button variant="ghost" className="group-hover:text-primary transition-colors p-0">
                  Explore Level <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="glass rounded-3xl p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  Why Play <span className="text-primary">Releaf</span>?
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "Learn Sustainability", desc: "Gain practical knowledge about environmental conservation" },
                    { title: "Track Your Impact", desc: "See how your in-game choices translate to real-world actions" },
                    { title: "Join the Community", desc: "Connect with like-minded players passionate about change" },
                    { title: "Earn Rewards", desc: "Unlock achievements and badges as you progress" },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <Leaf className="w-48 h-48 text-primary/50 animate-pulse-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Ready to Make a <span className="text-gradient">Difference</span>?
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-8">
            Join thousands of players in the journey towards a sustainable future
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-xl glow">
            <a href="https://www.roblox.com/games/139467356463044/three-R#game-age-recommendation-details-container" target="_blank" rel="noopener noreferrer">
              Play Releaf Now
              <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold">Releaf</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Releaf. Gaming for sustainability.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
