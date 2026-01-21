import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface LeadContributorProps {
  name: string;
  roles: string;
  username?: string;
}

export function LeadContributor({ name, roles, username = name }: LeadContributorProps) {
  return (
    <a 
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center gap-4 group transition-all hover:opacity-80 shrink-0"
    >
      <Avatar className="size-20 shrink-0 ring-offset-2 ring-offset-background transition-all group-hover:ring-2 group-hover:ring-primary/20">
        <AvatarImage src={`https://github.com/${username}.png`} alt={username} />
        <AvatarFallback className="bg-muted text-xl">{name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="text-center flex flex-col items-center">
        <h3 className="text-lg font-medium leading-tight text-foreground whitespace-nowrap">{name}</h3>
        <p className="text-sm text-muted-foreground/60 font-medium whitespace-nowrap">
          {roles}
        </p>
      </div>
    </a>
  );
}
