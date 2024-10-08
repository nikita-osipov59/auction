import { create } from "zustand";
import axios from "axios";

interface Artifact {
  list: [];
  map?: { [key: string]: [] };
}

interface State {
  artifact: {
    artifactNames: Artifact;
    artifactRarity: Artifact;
    artifactPattern: Artifact;
  };
  fetchArtifacts: () => Promise<void>;
}

export const useFormStore = create<State>((set) => ({
  artifact: {
    artifactNames: { list: [], map: {} },
    artifactRarity: { list: [] },
    artifactPattern: { list: [] },
  },
  fetchArtifacts: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_INIT, {
        headers: {
          accept: "application/json",
        },
      });
      set(() => ({
        artifact: response.data,
      }));
    } catch (error) {
      console.error("Error fetching artifacts:", error);
    }
  },
}));
