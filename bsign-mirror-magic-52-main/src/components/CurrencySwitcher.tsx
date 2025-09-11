import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/contexts/CurrencyContext";

const CurrencySwitcher = () => {
  const { selectedCurrency, setCurrency } = useCurrency();

  const currencies = [
    {
      code: "USD",
      symbol: "$",
      flagImage: "/lovable-uploads/905c84e9-b0ba-4001-8d34-5abed67388b1.png",
      name: "US Dollar"
    },
    {
      code: "CAD", 
      symbol: "C$",
      flagImage: "/lovable-uploads/8eaab32d-d040-4d38-8f64-7cad3050e5a5.png",
      name: "Canadian Dollar"
    }
  ];

  const currentCurrency = currencies.find(c => c.code === selectedCurrency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline" 
          size="sm"
          className="bg-background border shadow-sm hover:shadow-md transition-all duration-200"
        >
          <img 
            src={currentCurrency?.flagImage} 
            alt={`${currentCurrency?.name} flag`}
            className="w-4 h-3 mr-2 object-cover rounded-sm"
          />
          <span className="hidden sm:inline">{selectedCurrency}</span>
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border shadow-lg z-[100]"
      >
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setCurrency(currency.code)}
            className="flex items-center space-x-3 cursor-pointer hover:bg-muted"
          >
            <img 
              src={currency.flagImage} 
              alt={`${currency.name} flag`}
              className="w-6 h-4 object-cover rounded-sm"
            />
            <div className="flex flex-col">
              <span className="font-medium">{currency.code}</span>
              <span className="text-xs text-muted-foreground">{currency.name}</span>
            </div>
            {selectedCurrency === currency.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;