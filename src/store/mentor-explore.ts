import {MentorExploreState} from "@/types/featureProps";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import {FilterKey} from "@/types/category";

const initialState = {
    searchTerm: '',
    filters: {
        techStack: [],
        experience: [],
        rating: []
    },
    priceRange: [0, 100000] as [number, number]
};

export const useMentorExploreStore = create<MentorExploreState>()(
    persist(
        (set) => ({
            ...initialState,

            setSearchTerm: (searchTerm: string) =>
                set({ searchTerm }),

            setFilter: (key: FilterKey, values: string[]) =>
                set((state) => ({
                    filters: {
                        ...state.filters,
                        [key]: values
                    }
                })),

            setPriceRange: (priceRange: [number, number]) =>
                set({ priceRange }),

            clearFilters: () =>
                set(initialState)
        }),
        {
            name: 'mentor-filter-storage',
            partialize: (state) => ({
                searchTerm: state.searchTerm,
                filters: state.filters,
                priceRange: state.priceRange
            })
        }
    )
);