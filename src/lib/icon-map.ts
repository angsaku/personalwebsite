import {
  Coffee, Music, Video, Plane, Dumbbell, Code, UtensilsCrossed,
  Camera, BookOpen, Heart, Star, Globe, Gamepad2, Bike, Mountain,
  Film, Guitar, Palette, Pen, Headphones, Sun, Sunset, Flower,
} from "lucide-react";
import type React from "react";

// Generic icon type that covers both Lucide icons and custom SVG icons
export type IconComponent = React.FC<{ size?: number; className?: string; strokeWidth?: number }>;

import { Shuttlecock, BadmintonRacket } from "./custom-icons";

export const ICON_MAP: Record<string, IconComponent> = {
  Coffee, Music, Video, Plane, Dumbbell, Code, UtensilsCrossed,
  Camera, BookOpen, Heart, Star, Globe, Gamepad2, Bike, Mountain,
  Film, Guitar, Palette, Pen, Headphones, Sun, Sunset, Flower,
  Shuttlecock,
  BadmintonRacket,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);
