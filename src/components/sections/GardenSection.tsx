import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { notes } from "../../data/notes";
import { Modal } from "../ui";
import {
  statusColors,
  statusLabels,
  type Note,
  type NoteStatus,
} from "../../types/notes";

type NoteFilter = "todos" | NoteStatus;

export function GardenSection() {
  const [filter, setFilter] = useState<NoteFilter>("todos");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const filteredNotes = useMemo(() => {
    if (filter === "todos") return notes;
    return notes.filter((note) => note.status === filter);
  }, [filter]);
  return (
    <section className="space-y-10 page-transition">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          O Meu Jardim Digital
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
          Uma coleção aberta de pensamentos, problemas técnicos e notas de
          estudo.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <FilterButton
          isActive={filter === "todos"}
          label="Todos"
          onClick={() => setFilter("todos")}
        />
        <FilterButton
          isActive={filter === "semente"}
          label="🌱 Sementes (Rascunhos)"
          onClick={() => setFilter("semente")}
        />
        <FilterButton
          isActive={filter === "brotar"}
          label="🌿 Em Broto (Em progresso)"
          onClick={() => setFilter("brotar")}
        />
        <FilterButton
          isActive={filter === "perene"}
          label="🌳 Perene (Concluídas)"
          onClick={() => setFilter("perene")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <article
            key={note.id}
            className="p-6 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard hover:shadow-lg hover:shadow-indigo-500/5 hover:border-neutral-400
               dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
               <span
                 className={`px-2 py-1 rounded font-mono font-semibold ${statusColors[note.status]}`}
               >
                 {statusLabels[note.status]}
               </span>
               <span className="text-neutral-400">{note.date}</span>
              </div>

              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">
               {note.excerpt}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-neutral-400">
              <span>Leitura: {note.readTime}</span>
              <span className="text-accent flex items-center gap-1">
               Ler Nota <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <Modal
        isOpen={selectedNote !== null}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.title}
      >
        {selectedNote && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs">
              <span
               className={`px-2 py-1 rounded font-mono font-semibold ${statusColors[selectedNote.status]}`}
              >
               {statusLabels[selectedNote.status]}
              </span>
              <span className="text-neutral-400">{selectedNote.date}</span>
            </div>

            <div
              className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed space-y-4 border-t border-lightBorder dark:border-darkBorder pt-6"
              dangerouslySetInnerHTML={{ __html: selectedNote.content }}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}

interface FilterButtonProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

function FilterButton({ isActive, label, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
        isActive
          ? "border-accent bg-accent/10 text-accent"
          : "border-lightBorder dark:border-darkBorder hover:border-neutral-400 text-neutral-400"
      }`}
    >
      {label}
    </button>
  );
}
