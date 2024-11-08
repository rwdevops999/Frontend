import axios, { AxiosError } from "axios";
import { Tutorial } from "../entities/Tutorial";
import { useEffect, useState } from "react";

const useTutorials = (apiURL: string) => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchTutorials = async (url: string) => {
      setIsLoading(true);
      try {
        console.log("[USE TUTORIALS]: " + url);
        let { data } = await axios.get(url);
        if (data) {
          setTutorials(data);
        }
      } catch (error) {
        console.log("[USETUTORIALS] Error: " + error);
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred: " + JSON.stringify(error));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials(apiURL);
  }, [apiURL]);

  return { tutorials, isLoading, error };
};

export default useTutorials;
