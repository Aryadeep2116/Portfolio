import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { setPageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  useEffect(() => {
    setPageMeta({
      title: "Page not found — Alex Morgan",
      description: "The page you're looking for doesn't exist.",
    });
  }, []);

  return (
    <section className="flex min-h-[80vh] items-center pt-16" aria-labelledby="notfound-heading">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-24 text-center">
          <p className="num animate-drift text-[0.8125rem] font-medium text-signal">ERROR 404</p>
          <h1 id="notfound-heading" className="text-h2 text-fg">
            You took a wrong turn.
          </h1>
          <p className="text-lead text-fg-2">
            The page you're looking for doesn't exist — but the work you need might. Head back and
            take a look around.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button to="/" size="lg">
              <ArrowLeft size={16} aria-hidden />
              Back home
            </Button>
            <Button to="/work" variant="secondary" size="lg">
              View work
              <ArrowRight size={16} aria-hidden />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
