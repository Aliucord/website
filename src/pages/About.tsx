import React, { useEffect, useState } from "react";
import { LeadContributor } from "@/components/LeadContributor";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AliucordLogo } from "@/components/AliucordLogo";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface Contributor {
  username: string;
  avatarUrl?: string;
  commits: number;
  repositories?: string[];
}

type AboutScreenState = 
  | { type: 'Loading' }
  | { type: 'Failure' }
  | { type: 'Loaded', contributors: Contributor[] };

export default function About() {
  const [state, setState] = useState<AboutScreenState>({ type: 'Loading' });

  const fetchContributors = async () => {
    setState({ type: 'Loading' });
    
    try {
      const response = await fetch("https://api.rushii.dev/aliucord/contributors");
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setState({
            type: 'Loaded',
            contributors: data.map((c: any) => ({
              username: c.username || c.login || "Unknown",
              avatarUrl: c.avatarUrl || c.avatar_url,
              commits: c.commits || c.contributions || 0,
              repositories: (c.repositories || []).map((repo: any) => 
                typeof repo === 'string' ? repo : (repo.name || "Unknown")
              )
            }))
          });
          return;
        }
      }
      throw new Error("Failed to fetch");
    } catch (err) {
      console.error("API fetch failed:", err);
      
      // Secondary attempt with cors-anywhere proxy if direct fails
      try {
        const proxyUrl = "https://corsproxy.io/?";
        const targetUrl = "https://api.rushii.dev/aliucord/contributors";
        const proxyResponse = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (proxyResponse.ok) {
          const data = await proxyResponse.json();
          if (Array.isArray(data)) {
            setState({
              type: 'Loaded',
              contributors: data.map((c: any) => ({
                username: c.username || c.login || "Unknown",
                avatarUrl: c.avatarUrl || c.avatar_url,
                commits: c.commits || c.contributions || 0,
                repositories: (c.repositories || []).map((repo: any) => 
                  typeof repo === 'string' ? repo : (repo.name || "Unknown")
                )
              }))
            });
            return;
          }
        }
      } catch (proxyErr) {
        console.error("Proxy fetch failed:", proxyErr);
      }
      
      setState({ type: 'Failure' });
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-16">
        <AliucordLogo className="w-32 h-32 mb-6" animated />
        <h1 className="text-4xl font-bold mb-2">Aliucord</h1>
        <p className="text-muted-foreground text-lg mb-6">
          A mod for the Discord Android App
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/Aliucord/Aliucord" target="_blank" rel="noreferrer">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary/10 rounded-full">
              <FaGithub className="text-xl" />
              GitHub
            </Button>
          </a>
          <a href="https://discord.gg/EsNDvBaHVU" target="_blank" rel="noreferrer">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary/10 rounded-full">
              <FaDiscord className="text-xl" />
              Discord
            </Button>
          </a>
        </div>
      </div>

      <div className="space-y-12 overflow-hidden">
        <section className="w-full">
          <div className="relative flex items-center mb-8 w-full">
            <Separator className="absolute inset-0 my-auto opacity-10" />
            <div className="relative mx-auto bg-background px-4">
              <h2 className="text-xs font-medium whitespace-nowrap text-muted-foreground/60 uppercase tracking-wider">
                Lead
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 justify-items-center px-4 w-full">
            <LeadContributor name="Vendicated" roles="the ven" />
            <LeadContributor name="Juby210" roles="Fox" />
            <LeadContributor name="rushii" roles="explod" username="rushiiMachine" />
          </div>
        </section>

        <section className="w-full">
          <div className="relative flex items-center mb-8 w-full">
            <Separator className="absolute inset-0 my-auto opacity-10" />
            <div className="relative mx-auto bg-background px-4">
              <h2 className="text-xs font-medium whitespace-nowrap text-muted-foreground/60 uppercase tracking-wider">
                Contributors
              </h2>
            </div>
          </div>

          {state.type === 'Loading' ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : state.type === 'Failure' ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground mb-4">Failed to load contributors</p>
              <Button onClick={fetchContributors} variant="outline">Retry</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-8 px-4">
              {state.contributors.map((user: Contributor) => (
                <div key={user.username} className="flex items-start gap-4">
                  <Avatar className="size-16 shrink-0 border border-border/40">
                    <AvatarImage src={user.avatarUrl || `https://github.com/${user.username}.png`} />
                    <AvatarFallback className="bg-muted text-lg">{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xl font-semibold leading-tight">{user.username}</span>
                    <span className="text-muted-foreground text-sm mb-2">
                      {user.commits} contributions
                    </span>
                    {user.repositories && user.repositories.length > 0 && (
                      <p className="text-muted-foreground/70 text-sm leading-relaxed">
                        {user.repositories.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
