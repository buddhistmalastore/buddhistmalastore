import EntryBackground from "@/components/entry/EntryBackground";
import EntryContent from "@/components/entry/EntryContent";

export default function EntryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <EntryBackground />
      <EntryContent />
    </main>
  );
}