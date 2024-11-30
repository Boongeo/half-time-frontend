import { forwardRef } from "react";
import clsx from "clsx";
import { TabProps } from "@/types/components/commonProps";

const Tab = forwardRef<HTMLDivElement, TabProps>(
    ({ label, value, selected, onTabSelect, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                onClick={() => onTabSelect(value)} // 클릭 시 탭 변경
                className={clsx(
                    "cursor-pointer text-lg tracking-wider pb-2",
                    selected
                        ? "text-themeColor border-b-4 border-themeColor"
                        : "text-gray-600 hover:text-themeColor",
                    className
                )}
                {...props}
            >
                {label}
            </div>
        );
    }
);

Tab.displayName = "Tab";

export default Tab;
