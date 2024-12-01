import { forwardRef } from "react";
import Tab from "./Tab";
import { TabsProps } from "@/types/components/commonProps";

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
    ({ tabs, selectedTab, onTabSelect }, ref) => {
        return (
            <div ref={ref} className="flex gap-8 w-full max-w-4xl justify-start">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        selected={selectedTab === tab.value}
                        onTabSelect={onTabSelect}
                    />
                ))}
            </div>
        );
    }
);

Tabs.displayName = "Tabs";

export default Tabs;
