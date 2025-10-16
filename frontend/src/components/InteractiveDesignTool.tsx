import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Type, 
  Palette, 
  Maximize2, 
  Download, 
  Eye,
  RotateCw
} from "lucide-react";

interface DesignToolProps {
  productName: string;
  basePrice: number;
}

const InteractiveDesignTool = ({ productName, basePrice }: DesignToolProps) => {
  const [customText, setCustomText] = useState("101");
  const [textBelow, setTextBelow] = useState("CONFERENCE");
  const [fontStyle, setFontStyle] = useState("helvetica");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [brailleOption, setBrailleOption] = useState("yes");
  const [size, setSize] = useState("6x6");
  const [mounting, setMounting] = useState("tape");
  
  const fonts = [
    { value: "helvetica", label: "Helvetica (ADA Approved)" },
    { value: "arial", label: "Arial" },
    { value: "franklin", label: "Franklin Gothic" }
  ];

  const sizes = [
    { value: "6x6", label: '6" x 6"', price: 0 },
    { value: "8x8", label: '8" x 8"', price: 15 },
    { value: "9x9", label: '9" x 9"', price: 25 },
    { value: "custom", label: "Custom Size", price: 35 }
  ];

  const presetColors = [
    { bg: "#FFFFFF", text: "#000000", name: "Black on White" },
    { bg: "#000000", text: "#FFFFFF", name: "White on Black" },
    { bg: "#003366", text: "#FFFFFF", name: "White on Navy" },
    { bg: "#8B4513", text: "#F5DEB3", name: "Tan on Brown" },
    { bg: "#2F4F4F", text: "#F5F5DC", name: "Beige on Gray" }
  ];

  const calculatePrice = () => {
    let price = basePrice;
    const selectedSize = sizes.find(s => s.value === size);
    if (selectedSize) price += selectedSize.price;
    if (brailleOption === "yes") price += 12;
    if (mounting === "screws") price += 5;
    return price;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Design Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Live Preview</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            {/* Sign Preview */}
            <div className="relative aspect-square border-4 border-gray-200 rounded-lg overflow-hidden shadow-2xl">
              <div 
                className="w-full h-full flex flex-col items-center justify-center p-8"
                style={{ backgroundColor }}
              >
                {/* Main Text */}
                <div 
                  className="text-center mb-4"
                  style={{ 
                    color: textColor,
                    fontFamily: fontStyle === "helvetica" ? "Helvetica, Arial, sans-serif" : fontStyle === "arial" ? "Arial, sans-serif" : "Franklin Gothic, sans-serif",
                    fontSize: size === "6x6" ? "4rem" : size === "8x8" ? "5rem" : "6rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05em"
                  }}
                >
                  {customText || "101"}
                </div>

                {/* Text Below */}
                {textBelow && (
                  <div 
                    className="text-center mb-4"
                    style={{ 
                      color: textColor,
                      fontFamily: fontStyle === "helvetica" ? "Helvetica, Arial, sans-serif" : fontStyle === "arial" ? "Arial, sans-serif" : "Franklin Gothic, sans-serif",
                      fontSize: size === "6x6" ? "1.2rem" : size === "8x8" ? "1.5rem" : "1.8rem",
                      fontWeight: "600",
                      letterSpacing: "0.1em"
                    }}
                  >
                    {textBelow}
                  </div>
                )}

                {/* Braille Simulation */}
                {brailleOption === "yes" && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-current opacity-50" style={{ color: textColor }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ADA Compliant Badge */}
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ADA ✓
                  </div>
                </div>
              </div>
            </div>

            {/* Size Reference */}
            <div className="text-center text-sm text-gray-500">
              Actual Size: {sizes.find(s => s.value === size)?.label}
            </div>
          </div>

          {/* Design Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">
                  <Type className="h-4 w-4 mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="options">
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Options
                </TabsTrigger>
              </TabsList>

              {/* Text Tab */}
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="mainText">Main Text (Room Number)</Label>
                  <Input
                    id="mainText"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                    placeholder="101"
                    maxLength={5}
                    className="text-2xl font-bold text-center"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 5 characters</p>
                </div>

                <div>
                  <Label htmlFor="textBelow">Text Below (Room Name)</Label>
                  <Input
                    id="textBelow"
                    value={textBelow}
                    onChange={(e) => setTextBelow(e.target.value.toUpperCase())}
                    placeholder="CONFERENCE"
                    maxLength={20}
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional, max 20 characters</p>
                </div>

                <div>
                  <Label>Font Style</Label>
                  <Select value={fontStyle} onValueChange={setFontStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map(font => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-4">
                <div>
                  <Label>Color Presets (ADA Compliant)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {presetColors.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setBackgroundColor(preset.bg);
                          setTextColor(preset.text);
                        }}
                        className="flex items-center gap-2 p-3 border-2 rounded-lg hover:border-cyan-500 transition-colors"
                      >
                        <div className="flex">
                          <div 
                            className="w-8 h-8 rounded-l border"
                            style={{ backgroundColor: preset.bg }}
                          />
                          <div 
                            className="w-8 h-8 rounded-r border"
                            style={{ backgroundColor: preset.text }}
                          />
                        </div>
                        <span className="text-sm">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    <strong>ADA Requirement:</strong> Ensure 70% color contrast for compliance
                  </p>
                </div>
              </TabsContent>

              {/* Options Tab */}
              <TabsContent value="options" className="space-y-4">
                <div>
                  <Label>Sign Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map(s => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label} {s.price > 0 && `(+$${s.price})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Braille</Label>
                  <Select value={brailleOption} onValueChange={setBrailleOption}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Include Braille (+$12)</SelectItem>
                      <SelectItem value="no">No Braille</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Required for permanent room identification
                  </p>
                </div>

                <div>
                  <Label>Mounting</Label>
                  <Select value={mounting} onValueChange={setMounting}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tape">VHB Tape (Included)</SelectItem>
                      <SelectItem value="screws">Screws (+$5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            {/* Price Summary */}
            <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Base Price:</span>
                  <span className="font-semibold">${basePrice}</span>
                </div>
                {size !== "6x6" && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Size Upgrade:</span>
                    <span className="font-semibold">+${sizes.find(s => s.value === size)?.price}</span>
                  </div>
                )}
                {brailleOption === "yes" && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Braille:</span>
                    <span className="font-semibold">+$12</span>
                  </div>
                )}
                {mounting === "screws" && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">Screw Mounting:</span>
                    <span className="font-semibold">+$5</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total Price:</span>
                    <span className="text-2xl font-bold text-cyan-600">${calculatePrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                Save Design
              </Button>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveDesignTool;
