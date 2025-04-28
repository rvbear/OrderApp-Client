import React, { useState } from "react";
import { Search, UserCircle, MoreVertical } from "lucide-react";

const members = [
  {
    id: 1,
    email: "hong@mail.com",
    password: "****",
    name: "홍길동",
    role: "USER",
    joinDate: "2023-10-10",
  },
  {
    id: 2,
    email: "lee@mail.com",
    password: "******",
    name: "이순신",
    role: "ADMIN",
    joinDate: "2023-10-10",
  },
  {
    id: 3,
    email: "hana@mail.com",
    password: "****",
    name: "김정민",
    role: "USER",
    joinDate: "2023-10-10",
  },
];

const MemberTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.includes(searchTerm) || member.userId.includes(searchTerm)
  );

  return (
    <div className="mt-2">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-600 focus:border-transparent"
          placeholder="이름 또는 아이디로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">회원 목록</h2>
        <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          총 {filteredMembers.length}명
        </span>
      </div>

      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <UserCircle className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
              </div>
              <div className="dropdown relative">
                <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold">권한</span>
                <span
                  className={`font-medium ${
                    member.role === "ADMIN" ? "text-red-600" : "text-blue-600"
                  }`}
                >
                  {member.role}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 font-bold">가입일</span>
                <span>{member.joinDate}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium transition-colors">
                수정
              </button>
              <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-md text-sm font-medium transition-colors">
                삭제
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberTab;
