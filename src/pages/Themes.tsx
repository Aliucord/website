import { useState, useEffect } from "react";
import { fetchThemes } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const MaterialIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => (
  <span 
    className={`material-symbols-rounded ${className}`} 
    style={{ 
      fontSize: size, 
      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      userSelect: 'none'
    }}
  >
    {name}
  </span>
);

export default function Themes() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchThemes().then((data) => {
      setThemes(data);
      setLoading(false);
    });
  }, []);

  const filteredThemes = themes.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center py-24 px-4">
      <div className="container max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Themes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse Aliucord themes.
            <span className="block mt-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl text-primary font-medium">
              This page is <strong>view-only</strong>. To install themes, you must use 
              <strong> Aliucord</strong> to install with the <strong>#themes</strong> channel on our Discord server.
            </span>
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <MaterialIcon name="search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-12 h-14 rounded-full border-none shadow-none focus-visible:ring-0"
            style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--card-foreground))' }}
            placeholder="Search themes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-[2rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThemes.map((theme) => (
              <div key={theme.name} className="material-card group transition-all flex flex-col overflow-hidden">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 truncate">
                  {theme.name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40 gap-2">
                  <span className="text-xs font-bold text-primary truncate">
                    @{theme.author || "Unknown"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
