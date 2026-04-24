import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./components/Table";

const UserList = () => {
  // Consolidated user data
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
                <TableCell className="px-4 py-3 text-center">{user.user_id}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.first_name}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.middle_name || "-"}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.last_name}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.suffix_name || "-"}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.gender}</TableCell>
                <TableCell className="px-4 py-3 text-start">{user.address}</TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-4">
                    <button type="button" className="text-green-600 font-medium hover:underline cursor-pointer">
                      Edit
                    </button>
                    <button type="button" className="text-red-600 font-medium hover:underline cursor-pointer">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
