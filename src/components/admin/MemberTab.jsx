import React, { useState, useEffect } from "react";
import { Search, UserCircle, X } from "lucide-react";
import { getUserAll, updateUser, deleteUser } from "../../apis/user";

const MemberTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [editedMember, setEditedMember] = useState({
    email: "",
    userName: "",
    role: "USER",
  });

  const filteredMembers = members.filter(
    (member) =>
      (member.userName && member.userName.includes(searchTerm)) ||
      (member.email && member.email.includes(searchTerm))
  );

  const openEditModal = (member) => {
    setSelectedMember(member);
    setEditedMember({
      email: member.email,
      userName: member.userName,
      role: member.role,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await getUserAll();
        setMembers(data.userList);
      } catch (error) {
        console.error("회원 리스트를 불러오는데 실패했습니다:", err);
      }
    };

    getMembers();
  }, []);

  const handleEditSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      console.log(editedMember.userName);

      const updatedUser = await updateUser(
        selectedMember.userId,
        editedMember.userName,
        editedMember.role
      );

      setMembers((prev) =>
        prev.map((m) =>
          m.userId === selectedMember.userId
            ? { ...m, userName: editedMember.userName, role: editedMember.role }
            : m
        )
      );

      console.log("수정 성공:", updatedUser);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("회원 수정 실패:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteUser(selectedMember.userId);

      setMembers((prev) =>
        prev.filter((m) => m.userId !== selectedMember.userId)
      );

      console.log("삭제 성공:", result);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("회원 삭제 실패:", err);
    }
  };

  return (
    <div className="mt-2">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-600 focus:border-transparent"
          placeholder="이름 또는 이메일로 검색"
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
            key={member.userId}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-full p-2">
                  <UserCircle className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{member.userName}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
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
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                onClick={() => openEditModal(member)}
              >
                수정
              </button>
              <button
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                onClick={() => openDeleteModal(member)}
              >
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

      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">회원 정보 수정</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={editedMember.userName}
                    onChange={(e) =>
                      setEditedMember({
                        ...editedMember,
                        userName: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <div className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600">
                    {editedMember.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    권한
                  </label>
                  <select
                    value={editedMember.role}
                    onChange={(e) =>
                      setEditedMember({ ...editedMember, role: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="flex-1 py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-3 inline-flex mx-auto mb-4">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">회원 삭제</h3>
              <p className="text-gray-600">
                정말 삭제하시겠습니까?
                <br />
                <span className="font-medium">
                  {selectedMember.userName}
                </span>{" "}
                회원의 모든 정보가 삭제됩니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberTab;
