import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Product } from "../types/product";

const PAGE_SIZE = 6;

async function fetchProducts({ pageParam = 0 }: { pageParam?: number }): Promise<Product[]> {
    // fakestoreapi pagination واقعی ندارد → کل را می‌گیریم و صفحه‌بندی می‌کنیم
    const res = await api.get<Product[]>("/products");

    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return res.data.slice(start, end);
}

export function useProducts() {
    return useInfiniteQuery<Product[], Error, Product[], ["products"], number>({
        queryKey: ["products"],
        queryFn: ({ pageParam = 0 }) => fetchProducts({ pageParam }),
        getNextPageParam: (lastPage, pages) =>
            lastPage.length === 0 ? undefined : pages.length,
        refetchOnWindowFocus: false,
        retry: 1,
        initialPageParam: 0,
    });
}
