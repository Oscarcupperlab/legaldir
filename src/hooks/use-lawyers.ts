import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Lawyer, SuccessCase } from "@/types/lawyer";

export function useLawyers() {
  return useQuery<Lawyer[]>({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("city", "Madrid")
        .order("featured", { ascending: false })
        .order("rating", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lawyer[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useLawyer(slug: string) {
  return useQuery<Lawyer>({
    queryKey: ["lawyer", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyers")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data as Lawyer;
    },
    enabled: !!slug,
  });
}

export function useSuccessCases(lawyerId: string | undefined) {
  return useQuery<SuccessCase[]>({
    queryKey: ["success-cases", lawyerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("success_cases")
        .select("*")
        .eq("lawyer_id", lawyerId!)
        .order("year", { ascending: false });
      if (error) throw error;
      return (data ?? []) as SuccessCase[];
    },
    enabled: !!lawyerId,
  });
}

export function useReviews(lawyerId: string | undefined) {
  return useQuery({
    queryKey: ["reviews", lawyerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("lawyer_id", lawyerId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!lawyerId,
  });
}

export function useAddReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (review: {
      lawyer_id: string;
      author_name: string;
      rating: number;
      comment: string;
    }) => {
      const { error } = await supabase.from("reviews").insert(review);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["reviews", vars.lawyer_id] });
    },
  });
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

import React from "react";
