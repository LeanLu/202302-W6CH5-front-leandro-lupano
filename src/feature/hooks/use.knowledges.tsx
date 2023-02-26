import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/store/store";
import {
  KnowledgeStructure,
  ProtoKnowledgeStructure,
} from "../models/knowledge";
import * as ac from "../reducer/knowledges.actions.creator";
import { KnowledgeApiRepo } from "../services/knowledge.api.repo";

export function useKnowledges(repo: KnowledgeApiRepo) {
  const knowledges = useSelector((state: RootState) => state.knowledge);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadKnowledges = async () => {
      try {
        const data = await repo.loadKnowledges();
        dispatch(ac.loadCreator(data));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    loadKnowledges();
  }, [dispatch, repo]);

  const addKnowledge = async (knowledge: ProtoKnowledgeStructure) => {
    try {
      const finalKnowledge = await repo.createKnowledge(knowledge);
      dispatch(ac.addCreator(finalKnowledge));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const updateKnowledge = async (knowledge: Partial<KnowledgeStructure>) => {
    if (knowledge.id === undefined)
      throw new Error("The id number is required");
    try {
      const finalKnowledge = await repo.updateKnowledge(knowledge);
      dispatch(ac.updateCreator(finalKnowledge));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const deleteKnowledge = async (id: KnowledgeStructure["id"]) => {
    try {
      repo.deleteKnowledge(id);
      dispatch(ac.deleteCreator(id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    knowledges,
    addKnowledge,
    updateKnowledge,
    deleteKnowledge,
  };
}
