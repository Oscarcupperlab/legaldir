import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { LawyerPage } from "@/pages/LawyerPage";
import { Compare } from "@/pages/Compare";
import { Community } from "@/pages/Community";
import { Guides } from "@/pages/Guides";
import { GuidePost } from "@/pages/GuidePost";
import { NotFound } from "@/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/directorio" element={<Explore />} />
              <Route path="/abogado/:slug" element={<LawyerPage />} />
              <Route path="/comparar" element={<Compare />} />
              <Route path="/comunidad" element={<Community />} />
              <Route path="/guias" element={<Guides />} />
              <Route path="/guias/:slug" element={<GuidePost />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
