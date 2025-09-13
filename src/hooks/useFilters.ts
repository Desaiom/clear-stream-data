import { useState, useCallback } from "react";
import { FilterState } from "@/components/FilterPanel";

const defaultFilters: FilterState = {
  dateRange: {
    from: undefined,
    to: undefined,
  },
  location: {
    state: "",
    district: "",
    village: "",
  },
  waterQuality: {
    phRange: [0, 14],
    turbidityRange: [0, 10],
    temperatureRange: [0, 50],
  },
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const applyFilters = useCallback((data: any[]) => {
    return data.filter((item) => {
      // Date filtering
      if (filters.dateRange.from && item.date) {
        const itemDate = new Date(item.date);
        if (itemDate < filters.dateRange.from) return false;
      }
      
      if (filters.dateRange.to && item.date) {
        const itemDate = new Date(item.date);
        if (itemDate > filters.dateRange.to) return false;
      }

      // Location filtering
      if (filters.location.state && item.location) {
        if (!item.location.toLowerCase().includes(filters.location.state.toLowerCase())) {
          return false;
        }
      }

      if (filters.location.district && item.location) {
        if (!item.location.toLowerCase().includes(filters.location.district.toLowerCase())) {
          return false;
        }
      }

      if (filters.location.village && item.location) {
        if (!item.location.toLowerCase().includes(filters.location.village.toLowerCase())) {
          return false;
        }
      }

      // Water quality parameter filtering
      if (item.ph !== undefined) {
        const ph = parseFloat(item.ph);
        if (ph < filters.waterQuality.phRange[0] || ph > filters.waterQuality.phRange[1]) {
          return false;
        }
      }

      if (item.turbidity !== undefined) {
        const turbidity = parseFloat(item.turbidity);
        if (turbidity < filters.waterQuality.turbidityRange[0] || turbidity > filters.waterQuality.turbidityRange[1]) {
          return false;
        }
      }

      if (item.temperature !== undefined) {
        const temperature = parseFloat(item.temperature);
        if (temperature < filters.waterQuality.temperatureRange[0] || temperature > filters.waterQuality.temperatureRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const hasActiveFilters = useCallback(() => {
    return (
      filters.dateRange.from !== undefined ||
      filters.dateRange.to !== undefined ||
      filters.location.state !== "" ||
      filters.location.district !== "" ||
      filters.location.village !== "" ||
      filters.waterQuality.phRange[0] !== 0 ||
      filters.waterQuality.phRange[1] !== 14 ||
      filters.waterQuality.turbidityRange[0] !== 0 ||
      filters.waterQuality.turbidityRange[1] !== 10 ||
      filters.waterQuality.temperatureRange[0] !== 0 ||
      filters.waterQuality.temperatureRange[1] !== 50
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    applyFilters,
    hasActiveFilters,
  };
};