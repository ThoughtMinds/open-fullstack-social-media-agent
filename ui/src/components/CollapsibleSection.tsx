// components/CollapsibleSection.tsx
"use client";

import { ChevronDown } from "lucide-react";

type CollapsibleSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

const CollapsibleSection = ({ title, isOpen, onToggle, children }: CollapsibleSectionProps) => {
  return (
    <div className="border-t border-gray-100 py-2">
      <button
        className="flex justify-start gap-2 items-center w-full py-1"
        onClick={onToggle}
      >
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
        <span className="font-medium">{title}</span>
      </button>
      {isOpen && <div className="py-2 text-sm">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
