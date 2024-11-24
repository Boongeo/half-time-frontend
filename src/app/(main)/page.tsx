'use client';

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Category } from "@/config/category";
import {SearchInput} from "@/components/common/SearchInput";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<"mentor" | "mentee">("mentee");

  return (
      <div className="flex flex-col items-center px-4 md:px-10 mt-20">
        <div className="flex gap-8 w-full max-w-4xl justify-center">
            {/* 멘티 탭 */}
            <div
                onClick={() => setSelectedTab("mentee")}
                className={`cursor-pointer text-lg tracking-wider font-medium pb-2 ${
                    selectedTab === "mentee"
                        ? "text-themeColor border-b-4 border-themeColor"
                        : "text-gray-600 hover:text-themeColor"
                }`}
            >
                Mentee
            </div>

            {/* 멘토 탭 */}
            <div
              onClick={() => setSelectedTab("mentor")}
              className={`cursor-pointer text-lg tracking-wider pb-2 ${
                  selectedTab === "mentor"
                      ? "text-themeColor border-b-4 border-themeColor"
                      : "text-gray-600 hover:text-themeColor"
              }`}
            >
                Mentor
            </div>


        </div>

        <div className="w-full max-w-4xl mt-8">
          {selectedTab === "mentor" && (
              <div className="flex flex-col items-center px-4 md:px-10">
                {/* 멘토 관련 컴포넌트 */}
                <h2 className="text-4xl font-semibold text-gray-700 tracking-wider mt-10">WE VALUE YOUR TIME</h2>
                <p className="text-xl text-gray-600 mt-4">
                  개발자들의 성장을 위한 맞춤형 멘토·멘티 매칭 플랫폼
                </p>
                  <Button
                      type="submit"
                      className="w-[240px] mt-8"
                      size="lg"
                      fullWidth={false}
                  >
                      Become a Mentor
                  </Button>
              </div>
          )}

          {selectedTab === "mentee" && (
              <div className="flex flex-col items-center px-4 md:px-10">
                {/* 멘티 관련 컴포넌트 */}
                <h2 className="text-4xl font-semibold text-gray-700 tracking-wider mt-10">TIME TO LEVEL UP</h2>
                <p className="text-xl text-gray-600 mt-4 mb-8">
                    개발자들의 성장을 위한 맞춤형 멘토·멘티 매칭 플랫폼
                </p>
                  <SearchInput
                      placeholder="What Do You Want To Level Up?"
                      options={Category}
                      onOptionSelect={(option) => console.log(option)}
                      className="w-[300px] rounded-lg"
                  />
              </div>
          )}
        </div>
      </div>
  );
}
