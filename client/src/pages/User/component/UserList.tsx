import { useEffect, useState, type FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead, 
  TableHeader,
  TableRow,
} from "../../../components/Table";
import UserService from "../../../services/UserService";
import Spinner from "../../../components/Spinner/Spinner";
import type { UserColumns } from "../../../interfaces/UserInterface";

interface UserListProps {
  onAddUser: () => void;
  onEditUser: (user: UserColumns) => void;
  onDeleteUser: (user: UserColumns) => void; 
  refreshKey: boolean;
}

const UserList: FC<UserListProps> = ({ onAddUser, onEditUser, onDeleteUser, refreshKey }) => {
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<UserColumns[]>([]);

  const handleLoadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await UserService.loadUsers();
      if (res.status === 200) {
        setUsers(res.data.users);
      } else {
        console.error("Unexpected status error occurred during loading users:", res.status);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    handleLoadUsers();
  }, [refreshKey]);

  if (loadingUsers) return <Spinner />;

const UserList = () => {
 
  const users = [
    {
      user_id: 1,
      first_name: "John",
      middle_name: "",
      last_name: "Doe",
      suffix_name: "",
      gender: "Male",
      address: "Roxas City",
    },
    {
      user_id: 2,
      first_name: "Justin",
      middle_name: "",
      last_name: "Compalacion",
      suffix_name: "",
      gender: "Male",
      address: "Roxas City",
    },
    {
      user_id: 3,
      first_name: "Jyrus",
      middle_name: "",
      last_name: "Joven",
      suffix_name: "",
      gender: "Male",
      address: "Roxas City",
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
    
      <div className="border-b border-gray-100 p-4 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition cursor-pointer"
        >
          Add User
        </button>
      </div>

      <div className="max-h-[calc(100vh-200px)] max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="sticky top-0 border-b border-gray-200 bg-blue-600 text-xs text-white">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-center font-medium">No.</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">First Name</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">Middle Name</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">Last Name</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">Suffix</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">Gender</TableCell>
              <TableCell isHeader className="px-5 py-3 text-start font-medium">Address</TableCell>
              <TableCell isHeader className="px-5 py-3 text-center font-medium">Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 text-sm text-gray-500">
            {users.map((user) => (
              <TableRow className="hover:bg-gray-100" key={user.user_id}>
  <TableCell className="px-4 py-3 text-start">
  {handleUserFullNameFormat(user)}
</TableCell>
<TableCell className="px-4 py-3 text-start">
  {user.gender.gender}
</TableCell>
<TableCell className="px-4 py-3 text-start">
  {user.birth_date}
</TableCell>
<TableCell className="px-4 py-3 text-start">
  {user.age}
</TableCell>
<TableCell className="px-4 py-3 text-center">
  <div className="flex gap-4">
    <button
      type="button"
      className="text-green-600 font-medium cursor-pointer hover:underline"
      onClick={() => onEditUser(user)} 
    >
      Edit
    </button>
    <button
      type="button"
      className="text-red-600 font-medium cursor-pointer hover:underline"
      onClick={() => onDeleteUser(user)} 
    >
      Delete
    </button>
  </div>
</TableCell>

export default UserList;
