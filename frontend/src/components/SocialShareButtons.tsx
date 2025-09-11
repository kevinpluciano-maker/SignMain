import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin, Instagram, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  compact?: boolean;
}

export const SocialShareButtons = ({ 
  url = window.location.href, 
  title = document.title,
  description = "Check out this amazing product!",
  image,
  compact = false
}: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: image 
      ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(image)}&description=${encodedDescription}`
      : `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      "share",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  };

  // Compact version for product cards
  if (compact) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Share this product</DialogTitle>
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => openShareWindow(shareLinks.facebook)}
                className="hover:bg-blue-50"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => openShareWindow(shareLinks.twitter)}
                className="hover:bg-sky-50"
              >
                <Twitter className="h-4 w-4 text-sky-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => openShareWindow(shareLinks.linkedin)}
                className="hover:bg-blue-50"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={url}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className={copied ? "bg-green-50 border-green-200" : ""}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Full version for product pages
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Share2 className="h-5 w-5" />
        Share this product
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </Button>
        
        <Button
          variant="outline"
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="flex items-center gap-2 hover:bg-sky-50 hover:border-sky-200"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
          Twitter
        </Button>
        
        <Button
          variant="outline"
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
        >
          <Linkedin className="h-4 w-4 text-blue-700" />
          LinkedIn
        </Button>
        
        <Button
          variant="outline"
          onClick={() => openShareWindow(shareLinks.pinterest)}
          className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200"
        >
          <Instagram className="h-4 w-4 text-red-500" />
          Pinterest
        </Button>
      </div>

      <div className="flex space-x-2">
        <Input
          value={url}
          readOnly
          className="flex-1"
          placeholder="Product URL"
        />
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className={`flex items-center gap-2 min-w-[100px] ${
            copied ? "bg-green-50 border-green-200 text-green-700" : ""
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
};