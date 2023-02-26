import { useMemo, useEffect } from "react";
import { useKnowledges } from "../../hooks/use.knowledges";
import { KnowledgeApiRepo } from "../../services/repository/knowledge.api.repo";
import { Knowledge } from "../knowledge/knowledge";
import "./knowledge.list.css";

export function KnowledgesList() {
  const repo = useMemo(() => new KnowledgeApiRepo(), []);

  const { knowledges, deleteKnowledge, loadKnowledges } = useKnowledges(repo);

  useEffect(() => {
    loadKnowledges();
  }, [loadKnowledges]);

  const handleDelete = async (id: number) => {
    await deleteKnowledge(id);
    await loadKnowledges();
  };

  return (
    <section className="knowledges-list">
      <div className="knowledges-list__title">
        <h1>Knowledges List</h1>
      </div>

      <ul className="knowledges-list__items">
        {knowledges.map((item) => (
          <Knowledge
            key={item.id}
            knowledge={item}
            onDelete={handleDelete}
          ></Knowledge>
        ))}
      </ul>
    </section>
  );
}
