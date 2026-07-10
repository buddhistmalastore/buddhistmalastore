import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] py-20">
      <Container>
        <h1 className="mb-6 text-5xl font-bold text-[#6F4E37]">
          Buddhist Mala Store Pro
        </h1>

        <p className="mb-10 max-w-2xl text-gray-700">
          Design System Test
        </p>

        <div className="flex gap-4">
          <Button>Primary Button</Button>

          <Button variant="secondary">
            Secondary Button
          </Button>
        </div>
      </Container>
    </main>
  );
}