import { useMemo } from "react";
import { useKnowledges } from "../../hooks/use.knowledges";
import { KnowledgeStructure } from "../../models/knowledge";
import { KnowledgeApiRepo } from "../../services/repository/knowledge.api.repo";
import "./knowledge.css";

type KnowledgeProps = {
  knowledge: KnowledgeStructure;
};

export function Knowledge({ knowledge }: KnowledgeProps) {
  const repo = useMemo(() => new KnowledgeApiRepo(), []);

  const { deleteKnowledge } = useKnowledges(repo);

  const handlerDeleteButton = (id: KnowledgeStructure["id"]) => {
    deleteKnowledge(id);
  };

  return (
    <li className="knowledge">
      <p className="knowledge__name">Knowledge: {knowledge.name}</p>
      <p className="knowledge__id">ID Number: {knowledge.id}</p>
      <div className="knowledge__buttons">
        <button className="knowledge__edit">Edit ✏</button>
        <button
          className="knowledge__delete"
          onClick={() => handlerDeleteButton(knowledge.id)}
        >
          Delete 🗑
        </button>
      </div>
    </li>
  );
}
