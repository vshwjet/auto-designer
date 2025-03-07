export interface TagProperties {
  Size: "sm" | "md" | "lg";
  Color: "Primary" | "Error" | "Warning" | "Success" | "Gray" | "Light Gray" | "Yellow" | "Magenta" | "Teal" | "Cyan";
  Variant: "Subtle" | "Attentive" | "Outline";
  Type: "Pill" | "Round";
  text?: string;
} 