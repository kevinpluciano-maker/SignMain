import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  CheckCircle, 
  AlertTriangle, 
  Ruler, 
  Drill, 
  Hammer,
  AlignCenter,
  Eye,
  Download,
  FileText
} from "lucide-react";

const InstallationGuide = () => {
  return (
    <>
      <SEO
        title="Installation Guide - Professional Sign Installation | Signassist"
        description="Complete installation guide for door signs, office signage, and architectural signs. Step-by-step instructions, tools needed, and professional tips for perfect results."
        canonical="/installation-guide"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Installation Guide
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Installation Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Step-by-step instructions for installing your signage properly. 
              Follow our professional guidelines for lasting, attractive results.
            </p>
          </div>

          {/* Tools & Materials */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5 text-primary" />
                <span>Tools & Materials Needed</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Tools</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <Drill className="h-4 w-4 text-primary" />
                      <span>Electric drill</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Hammer className="h-4 w-4 text-primary" />
                      <span>Screwdriver set</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlignCenter className="h-4 w-4 text-primary" />
                      <span>Spirit level</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Ruler className="h-4 w-4 text-primary" />
                      <span>Measuring tape</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Pencil for marking</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Hardware</h3>
                  <ul className="space-y-2">
                    <li>• Mounting screws (provided)</li>
                    <li>• Wall anchors (if needed)</li>
                    <li>• Appropriate drill bits</li>
                    <li>• Washers (if applicable)</li>
                    <li>• Double-sided tape (alternative)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Safety</h3>
                  <ul className="space-y-2">
                    <li>• Safety glasses</li>
                    <li>• Work gloves</li>
                    <li>• Dust mask</li>
                    <li>• Step ladder (if needed)</li>
                    <li>• Drop cloth</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Types */}
          <Tabs defaultValue="door-signs" className="mb-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="door-signs">Door Signs</TabsTrigger>
              <TabsTrigger value="wall-mounted">Wall Mounted</TabsTrigger>
              <TabsTrigger value="adhesive">Adhesive Mount</TabsTrigger>
              <TabsTrigger value="glass-doors">Glass Doors</TabsTrigger>
            </TabsList>

            <TabsContent value="door-signs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Door Sign Installation</CardTitle>
                  <p className="text-muted-foreground">
                    Standard installation for wooden, metal, and composite doors
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <h4 className="font-medium">Positioning</h4>
                          <p className="text-sm text-muted-foreground">
                            Position the sign 48-60 inches from the floor center. Use a level to ensure straight alignment.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <h4 className="font-medium">Mark Holes</h4>
                          <p className="text-sm text-muted-foreground">
                            Hold sign in place and mark screw hole locations with a pencil through the mounting holes.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <h4 className="font-medium">Drill Pilot Holes</h4>
                          <p className="text-sm text-muted-foreground">
                            Drill pilot holes slightly smaller than the screw diameter to prevent door splitting.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <h4 className="font-medium">Install Screws</h4>
                          <p className="text-sm text-muted-foreground">
                            Align the sign and install screws. Don't overtighten to avoid cracking the sign material.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</div>
                        <div>
                          <h4 className="font-medium">Final Check</h4>
                          <p className="text-sm text-muted-foreground">
                            Use level to verify the sign is straight. Check that all screws are secure but not over-tightened.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-700">Important Notes</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Check door thickness - some hollow doors may require special anchors</li>
                          <li>• Avoid drilling into door frame or hinges</li>
                          <li>• Consider door swing clearance when positioning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wall-mounted" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Wall Mounted Installation</CardTitle>
                  <p className="text-muted-foreground">
                    For drywall, concrete, brick, and other wall surfaces
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <h4 className="font-medium">Locate Studs</h4>
                          <p className="text-sm text-muted-foreground">
                            Use a stud finder to locate wall studs for secure mounting, especially for larger signs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <h4 className="font-medium">Height Positioning</h4>
                          <p className="text-sm text-muted-foreground">
                            Standard height is 48-60 inches from floor to sign center. ADA compliant: 48-60 inches to center.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <h4 className="font-medium">Choose Anchors</h4>
                          <p className="text-sm text-muted-foreground">
                            Select appropriate anchors: toggle bolts for hollow walls, masonry anchors for concrete/brick.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <h4 className="font-medium">Drill & Install</h4>
                          <p className="text-sm text-muted-foreground">
                            Drill holes according to anchor specifications. Install anchors and mount sign securely.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</div>
                        <div>
                          <h4 className="font-medium">Level & Secure</h4>
                          <p className="text-sm text-muted-foreground">
                            Use level throughout installation. Test mounting strength before considering complete.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Drywall</h4>
                      <p className="text-sm text-muted-foreground">
                        Use toggle bolts or molly bolts for hollow areas. Screw directly into studs when possible.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Concrete/Brick</h4>
                      <p className="text-sm text-muted-foreground">
                        Use masonry bits and concrete anchors. Pre-drill holes and use appropriate safety equipment.
                      </p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Metal Surfaces</h4>
                      <p className="text-sm text-muted-foreground">
                        Use self-tapping screws or magnetic mounting options for suitable sign materials.
                      </p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="adhesive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adhesive Mount Installation</CardTitle>
                  <p className="text-muted-foreground">
                    No-drill installation using high-strength adhesive mounting
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <h4 className="font-medium">Clean Surface</h4>
                          <p className="text-sm text-muted-foreground">
                            Clean the mounting surface with rubbing alcohol. Remove all dirt, grease, and moisture.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <h4 className="font-medium">Temperature Check</h4>
                          <p className="text-sm text-muted-foreground">
                            Ensure room temperature is 65-75°F for optimal adhesive bonding. Avoid cold or humid conditions.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <h4 className="font-medium">Apply Adhesive</h4>
                          <p className="text-sm text-muted-foreground">
                            Remove adhesive backing just before mounting. Apply even pressure across entire sign surface.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <h4 className="font-medium">Position & Press</h4>
                          <p className="text-sm text-muted-foreground">
                            Position carefully - adhesive bonds immediately. Press firmly for 30 seconds minimum.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</div>
                        <div>
                          <h4 className="font-medium">Cure Time</h4>
                          <p className="text-sm text-muted-foreground">
                            Allow 24-48 hours for full adhesive strength. Avoid stress on sign during cure period.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-success/10 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <h4 className="font-medium text-success-foreground">Best For</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Smooth, clean surfaces (glass, metal, painted walls)</li>
                          <li>• Rental properties or temporary installations</li>
                          <li>• Signs under 12 inches and weighing less than 2 lbs</li>
                          <li>• Indoor applications with stable temperatures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="glass-doors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Glass Door Installation</CardTitle>
                  <p className="text-muted-foreground">
                    Special considerations for glass surfaces and office doors
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
                        <div>
                          <h4 className="font-medium">Surface Preparation</h4>
                          <p className="text-sm text-muted-foreground">
                            Clean glass thoroughly with glass cleaner. Remove all fingerprints, dust, and residue.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
                        <div>
                          <h4 className="font-medium">Adhesive Choice</h4>
                          <p className="text-sm text-muted-foreground">
                            Use clear, removable adhesive designed for glass. Avoid permanent adhesives on rental properties.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
                        <div>
                          <h4 className="font-medium">Positioning</h4>
                          <p className="text-sm text-muted-foreground">
                            Consider door swing and visibility from both sides. Standard height applies (48-60 inches).
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
                        <div>
                          <h4 className="font-medium">Bubble-Free Application</h4>
                          <p className="text-sm text-muted-foreground">
                            Apply from center outward to prevent air bubbles. Use squeegee for large signs.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">5</div>
                        <div>
                          <h4 className="font-medium">Testing</h4>
                          <p className="text-sm text-muted-foreground">
                            Gently test corners after 15 minutes. Re-press if any lifting is detected.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-700">Glass Safety</h4>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          <li>• Never drill tempered glass - it will shatter</li>
                          <li>• Check if glass door has metal frame for screw mounting</li>
                          <li>• Consider double-sided signs for glass doors</li>
                          <li>• Use removable adhesive for easy future changes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Professional Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl">Professional Tips</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1" />
                  <p className="text-sm">Always test fit before drilling or applying adhesive</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1" />
                  <p className="text-sm">Use proper personal protective equipment</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1" />
                  <p className="text-sm">Keep installation hardware in labeled containers</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1" />
                  <p className="text-sm">Take photos during installation for future reference</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-success mt-1" />
                  <p className="text-sm">Double-check measurements before making holes</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl">Maintenance & Care</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <p className="text-sm">Clean signs regularly with mild soap and water</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <p className="text-sm">Check mounting screws every 6 months</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <p className="text-sm">Avoid harsh chemicals that may damage sign materials</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <p className="text-sm">Replace if cracks, fading, or damage occurs</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1"></div>
                  <p className="text-sm">Store extra mounting hardware for future use</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Resources */}
          <Card className="p-6 text-center">
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <p className="text-muted-foreground">
                Download our comprehensive installation resources or contact our support team
              </p>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Guide
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                ADA Compliance Guide
              </Button>
              <Button>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </main>

        <ImprovedFooter />
        <CurrencySwitcher />
      </div>
    </>
  );
};

export default InstallationGuide;