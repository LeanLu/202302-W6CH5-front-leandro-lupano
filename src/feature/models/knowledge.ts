type HasId = {
  id: number;
};

export type ProtoKnowledgeStructure = {
  name: string;
};

export type KnowledgeStructure = HasId & ProtoKnowledgeStructure;
