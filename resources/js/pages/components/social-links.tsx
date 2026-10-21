import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function SocialLinks() {
  return (
      <div className="flex items-center gap-4 text-muted-foreground">
        <a
            href="https://www.facebook.com/profile.php?id=100071965136525"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
      </div>
  );
}