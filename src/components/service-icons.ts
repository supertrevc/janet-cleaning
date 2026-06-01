import {
  House,
  Sparkles,
  Truck,
  Building2,
  Refrigerator,
  Flame,
  AppWindow,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSlug, AddOnKey } from "@/lib/business";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  recurring: House,
  deep: Sparkles,
  moveInOut: Truck,
  office: Building2,
};

export const addOnIcons: Record<AddOnKey, LucideIcon> = {
  fridge: Refrigerator,
  oven: Flame,
  windows: AppWindow,
  laundry: WashingMachine,
};
