import { createContext, useState } from "react";

type PageNumberContextType = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
};

const PageNumberContext = createContext({} as PageNumberContextType);

function PageNumberProvider({ children }: { children: React.ReactNode }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <PageNumberContext.Provider value={{ pageNumber, setPageNumber }}>
      {children}
    </PageNumberContext.Provider>
  );
}

export { PageNumberContext, PageNumberProvider };
