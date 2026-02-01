import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden flex flex-col items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 flex flex-col items-center gap-4">
          <div className="flex mb-4 gap-4">
            <h1 className="text-2xl font-bold">This page doesn't exist.</h1>
          </div>

          <Button onClick={() => window.history.back()} size="sm" variant="outline" className="text-lg h-16 px-10">
            <ArrowLeft/>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
