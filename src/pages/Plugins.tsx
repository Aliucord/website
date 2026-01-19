import { useState, useEffect } from "react";
import { fetchPlugins } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Plugins() {
  const [plugins, setPlugins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPlugins().then((data) => {
      setPlugins(data);
      setLoading(false);
    });
  }, []);

  const filteredPlugins = plugins.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center py-24 px-4">
      <div className="container max-w-6xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Plugins
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse Aliucord plugins. 
            <span className="block mt-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl text-primary font-medium">
              This page is <strong>view-only</strong>. To get plugins, you must use  
              <strong>Aliucord</strong> to install with the <strong>#plugins-list</strong> channel or <strong>lumi</strong> bot on our Discord server.
            </span>
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            className="pl-12 h-14 rounded-2xl border-2 bg-card"
            placeholder="Search plugins..."
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
            {filteredPlugins.map((plugin) => (
              <Card key={plugin.name} className="bg-card border-2 border-border rounded-[2rem] hover:border-primary/40 transition-all group overflow-hidden">
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold mb-2 flex justify-between items-start">
                    {plugin.name}
                    <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-md">
                      {plugin.version}
                    </span>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {Array.isArray(plugin.authors) ? plugin.authors.map((author: any) => (
                      <span key={author.name || author} className="text-sm font-bold text-primary">
                        @{author.name || author}
                      </span>
                    )) : plugin.authors && (
                      <span className="text-sm font-bold text-primary">
                        @{plugin.authors}
                      </span>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
